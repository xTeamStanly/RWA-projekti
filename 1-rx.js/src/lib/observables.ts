import { combineLatest, debounceTime, filter, fromEvent, map, Observable, switchMap } from "rxjs";
import Swal from "sweetalert2";
import { componentNames } from "../common/common";
import { componentDetails } from "../common/componentDetails";
import { Benchmark } from "../model/Benchmark";
import { Component, ComponentDetail } from "../model/Component";
import { Configuration } from "../model/Configuration";

import { CPU } from "../model/CPU";
import { GPU } from "../model/GPU";
import { Motherboard } from "../model/Motherboard";
import { RAM } from "../model/RAM";
import { Software } from "../model/Software";
import { Storage } from "../model/Storage";
import { allSoftware, findComponentBuilder } from "./database";
import { notifyUser } from "./notify";
import { clearElement } from "./util";

export function createComponentInputObservable<T extends Component>(input: HTMLInputElement, findFunction: Function, componentIndex: number) : Observable<T> {
    if(!input || !findFunction) { return null; }
    if(typeof(componentIndex) !== 'number' || componentIndex > 4 || componentIndex < 0) { return null; }
    componentIndex = ~~componentIndex;

    return fromEvent(input, 'input')
        .pipe(
            debounceTime(300),
            map((event: InputEvent) => (event.target as HTMLInputElement).value),
            filter((componentName: string) => componentName.trim().length >= 3),
            switchMap((componentName: string) => findFunction(componentName)),
            map((componentArray: Component[]) => componentArray[0] ?? notifyUser('Error', `${componentNames[componentIndex]} not found!`, 'error')) // json server response map
        ) as Observable<T>;
}

export function createComponentObservable(
    inputs: HTMLInputElement[]
) {

    const componentObservables: Array<Observable<Component>> = [];
    for(let i = 0; i < 5; i++) {
        const componentDetail: ComponentDetail = componentDetails[i];
        const notiticationMessage: string = componentDetail.notificationMessage;

        componentObservables[i] = createComponentInputObservable<Component>(inputs[i], findComponentBuilder(componentDetail), i);
        componentObservables[i].subscribe((component: Component) => {
            notifyUser(notiticationMessage, component.model, 'success');
            console.log(component);
        });
    }

    combineLatest(componentObservables).subscribe(([cpu, gpu, ram, storage, motherboard] : [CPU, GPU, RAM, Storage, Motherboard]) => {
        if(cpu && gpu && ram && storage && motherboard) {

            const configuration: Configuration = new Configuration(cpu, gpu, ram, motherboard, storage);
            console.log(configuration, configuration.getPerforamanceMetric());

            const fetchedSoftwares: Observable<Software[]> = allSoftware();
            let benchmark: Benchmark = new Benchmark(configuration, fetchedSoftwares);

            const resultsDiv: HTMLDivElement = document.querySelector('#resultsDiv');
            if(resultsDiv) { clearElement(resultsDiv); }

            benchmark.startAllBenchmarks();
        } else {
            Swal.fire({
                title: 'Warning',
                text: 'Incomplete configuration',
                icon: 'warning',
                toast: true,
                showConfirmButton: false,
                timer: 1000,
                position: 'bottom'
            });
        }
    });
}