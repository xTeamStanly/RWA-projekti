export function randomFromArray(array: any[]) : any {
    if(!array) { return null; }

    if(array.length) {
        return array[Math.floor(Math.random() * array.length)];
    }

    return null;
}

// WARN ! unsafe functions !
export function clamp(value: number, max: number) { return (value > max) ? max : value; }
export function map_range(input: number, min_original: number, max_original: number, min_scaled: number, max_scaled: number) {
    return min_scaled + (max_scaled - min_scaled) * (input - min_original) / (max_original - min_original);
}