import { combineLatest, debounceTime, filter, fromEvent, map, Observable, switchMap } from "rxjs";
import Swal from "sweetalert2";
import { componentNames } from "../common/common";
import { Component } from "../model/Component";
import { CPU } from "../model/CPU";
import { GPU } from "../model/GPU";
import { Motherboard } from "../model/Motherboard";
import { RAM } from "../model/RAM";
import { Storage } from "../model/Storage";
import { findCpu, findGpu, findMotherboard, findRam, findStorage } from "./database";
import { notifyUser } from "./notify";

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
    const cpuObservable: Observable<CPU> = createComponentInputObservable<CPU>(inputs[0], findCpu, 0);
    cpuObservable.subscribe((cpu: CPU) => {
        console.log(cpu);
    });

    const gpuObservable: Observable<GPU> = createComponentInputObservable<GPU>(inputs[1], findGpu, 1);
    gpuObservable.subscribe((gpu: GPU) => {
        console.log(gpu);
    });

    const ramObservable: Observable<RAM> = createComponentInputObservable<RAM>(inputs[2], findRam, 2);
    ramObservable.subscribe((ram: RAM) => {
        console.log(ram);
    });

    const storageObservable: Observable<Storage> = createComponentInputObservable<Storage>(inputs[3], findStorage, 3);
    storageObservable.subscribe((storage: Storage) => {
        console.log(storage);
    })

    const motherboardObservable: Observable<Motherboard> = createComponentInputObservable<Motherboard>(inputs[4], findMotherboard, 4);
    motherboardObservable.subscribe((motherboard: Motherboard) => {
        console.log(motherboard);
    });

    combineLatest([ cpuObservable, gpuObservable, ramObservable, storageObservable, motherboardObservable ]).subscribe(([cpu, gpu, ram, storage, motherboard]) => {
        if(cpu && gpu && ram && storage && motherboard) {
            // todo const configuration = new Configuration
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