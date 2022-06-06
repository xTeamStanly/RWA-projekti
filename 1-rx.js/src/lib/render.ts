export function generateElements(
    labels: HTMLLabelElement[],
    labelNames: string[],

    inputs: HTMLInputElement[]
) : void {
    for(let i = 0; i < 5; i++) {
        labels[i] = document.createElement('label');
        labels[i].innerText = labelNames[i];

        inputs[i] = document.createElement('input');
        inputs[i].setAttribute('placeholder', '🔎 Search');
    }
}

export function renderContainer(
    container: HTMLDivElement,

    labels: HTMLLabelElement[],
    inputs: HTMLInputElement[]

) : void {
    for(let i = 0; i < 5; i++) {
        container.appendChild(labels[i]);
        container.appendChild(inputs[i]);
        container.appendChild(document.createElement('br'));
    }
}