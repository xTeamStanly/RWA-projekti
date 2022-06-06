import { randomFromArray } from "../lib/util";

const titleEmojis: string[] = [ '😀', '🧰', '🔥', '😎', '⭐', '🌟', '✨', '🔧' ];
export function generateTitle() : string {
    return `${randomFromArray(titleEmojis)} Configuration Performance Calculator ${randomFromArray(titleEmojis)}`
}

export const componentNames: string[] = [ 'Processor', 'Graphics Card', 'Random Access Memory', 'Storage', 'Motherboard' ];