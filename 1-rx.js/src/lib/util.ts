export function randomFromArray(array: any[]) : any {
    if(!array) { return null; }

    if(array.length) {
        return array[Math.floor(Math.random() * array.length)];
    }

    return null;
}

export function clamp(value: number, max: number) { return (value > max) ? max : value; }