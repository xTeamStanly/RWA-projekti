export function randomFromArray(array: any[]) : any {
    if(!array) { return null; }

    if(array.length) {
        return array[Math.floor(Math.random() * array.length)];
    }

    return null;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function randomNumberRange(min: number, max: number) : number {
    if(typeof(min) !== 'number' || typeof(max) !== 'number') { return 0; }

    min = Math.ceil(min);
    max = Math.floor(max);

    if(min > max) { [max, min] = [min, max]; } // swap

    return ~~Math.floor(Math.random() * (max - min) + min); // x = [min .... max)
}

export function clearElement(element: HTMLElement) {
    if(element) { element.innerHTML = ""; }
}

// WARN ! unsafe functions !
export function clamp(value: number, max: number) { return (value > max) ? max : value; }
export function map_range(input: number, min_original: number, max_original: number, min_scaled: number, max_scaled: number) {
    return min_scaled + (max_scaled - min_scaled) * (input - min_original) / (max_original - min_original);
}