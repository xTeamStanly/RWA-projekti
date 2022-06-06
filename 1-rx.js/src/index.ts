import { fromEvent, Observable } from "rxjs";
import Swal from "sweetalert2";
import { componentNames, generateTitle } from "./common/common";
import { notifyUser } from "./lib/notify";
import { createComponentObservable } from "./lib/observables";
import { generateElements, renderContainer } from "./lib/render";
var scrollToElement = require('scroll-to-element');

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
    const results: HTMLDivElement[] = []; // todo div sa rezultatima sastavljene konfiguracije, scrollto ide tu


    generateElements(labels, componentNames, inputs);
    renderContainer(finalDiv, labels, inputs);
    createComponentObservable(inputs);

    // todo
    // scrollToElement(inputs[4], {
    //     offset: 0,
    //     duration: 250
    // });
}

main();