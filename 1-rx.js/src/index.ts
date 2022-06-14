import { fromEvent, Observable } from "rxjs";
import Swal from "sweetalert2";
import { componentNames, generateTitle } from "./common/common";
import { notifyUser } from "./lib/notify";
import { createComponentObservable } from "./lib/observables";
import { generateElements, renderContainer } from "./lib/render";


function main() {
    const finalDiv: HTMLDivElement = document.createElement('div');
    finalDiv.className = 'container';
    document.body.append(finalDiv);

    // title
    const titleDiv: HTMLDivElement = document.createElement('div');
    titleDiv.innerText = generateTitle();
    setInterval(() => { titleDiv.innerText = generateTitle(); }, 2000);
    titleDiv.className = 'titleDiv';
    finalDiv.appendChild(titleDiv);


    // elements
    const labels: HTMLLabelElement[] = [];
    const inputs: HTMLInputElement[] = [];
    let results: HTMLDivElement[] = []; // samo jedan clan u n todo div sa rezultatima sastavljene konfiguracije, scrollto ide tu

    generateElements(labels, componentNames, inputs, results);
    renderContainer(finalDiv, labels, inputs, results);
    createComponentObservable(inputs);

    // inputs[0].value = 'Ryzen 7 3700X';
    // inputs[1].value = 'Radeon RX 5600XT';
    // inputs[2].value = 'HyperX Fury';
    // inputs[3].value = 'Gold 2';
    // inputs[4].value = 'Z390';
}

main();