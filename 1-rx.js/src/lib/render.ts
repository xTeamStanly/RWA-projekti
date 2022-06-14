export function generateElements(
    labels: HTMLLabelElement[],
    labelNames: string[],

    inputs: HTMLInputElement[],
    results: HTMLDivElement[]
) : void {
    for(let i = 0; i < 5; i++) {
        labels[i] = document.createElement('label');
        labels[i].innerText = labelNames[i];

        inputs[i] = document.createElement('input');
        inputs[i].setAttribute('placeholder', '🔎 Search');
    }

    results[0] = document.createElement('div');
    results[0].id = 'resultsDiv';
}

export function renderContainer(
    container: HTMLDivElement,

    labels: HTMLLabelElement[],
    inputs: HTMLInputElement[],

    results: HTMLDivElement[]

) : void {
    for(let i = 0; i < 5; i++) {
        container.appendChild(labels[i]);
        container.appendChild(inputs[i]);
        container.appendChild(document.createElement('br'));
    }

    container.appendChild(document.createElement('br'));
    container.appendChild(results[0]);
}

var scrollToElement = require('scroll-to-element');

export function renderBenchmarkResult(
    container: HTMLDivElement,

    configMetrics: number,
    softwareMetrics: number,

    softwareName: string,

    finalMetrics: string,
    borderColor: string
) : void {
    let miniResultDiv: HTMLDivElement = document.createElement('div');
    miniResultDiv.className = 'miniDiv';

    let miniDivTitle: HTMLDivElement = document.createElement('div');
    miniDivTitle.className = 'miniDivTitle'

    let miniDivContent: HTMLDivElement = document.createElement('div');
    miniDivContent.className = 'miniDivContent';


    miniDivTitle.innerText = softwareName;
    miniDivContent.innerText = `${finalMetrics}\n(${configMetrics}/${softwareMetrics})`;

    miniResultDiv.appendChild(miniDivTitle);
    miniResultDiv.appendChild(miniDivContent);


    miniResultDiv.style.border = `3px solid ${borderColor}`;
    miniResultDiv.style.backgroundColor = borderColor;

    container.appendChild(miniResultDiv);


    scrollToElement(miniResultDiv, {
        offset: 0,
        duration: 250
    });
}