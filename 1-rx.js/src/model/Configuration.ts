import { clamp, map_range } from "../lib/util";
import { CPU } from "./CPU";
import { GPU } from "./GPU";
import { Motherboard } from "./Motherboard";
import { RAM } from "./RAM";
import { Storage } from "./Storage";

// CPU - cores (25%, clamp 10), frequency (15%, clamp 3.7)
// GPU - vram (25%, clamp 20)
// RAM - capacity (15%, clamp 32), frequency (15%, clamp 3400)
// STORAGE - capacity (5%, clamp 2048)
// MOTHERBOARD - X
// MAX SCORE 1000

export class Configuration {
    private cpu: CPU;
    private gpu: GPU;
    private ram: RAM;
    private motherboard: Motherboard;
    private storage: Storage;

    constructor(cpu: CPU, gpu: GPU, ram: RAM, motherboard: Motherboard, storage: Storage) {
        if(!cpu || !gpu || !ram || !motherboard || !storage) { throw new Error('Invalid configuration!'); }
        this.cpu = cpu;
        this.gpu = gpu;
        this.ram = ram;
        this.motherboard = motherboard;
        this.storage = storage;
    }

    public getPerforamanceMetric() : number {
        const cores: number = ~~map_range(clamp(this.cpu.cores, 10), 0, 10, 0, 250);
        const frequencyCpu: number = ~~map_range(clamp(this.cpu.frequency, 3.7), 0, 3.7, 0, 150);

        const vram: number = ~~map_range(clamp(this.gpu.vram, 12), 0, 12, 0, 250);

        const frequencyRam: number = ~~map_range(clamp(this.ram.frequency, 3400), 0, 3400, 0, 150);
        const capacityRam: number = ~~map_range(clamp(this.ram.capacity, 32), 0, 32, 0, 150);

        const capacityStorage: number = ~~map_range(clamp(this.storage.capacity, 2048), 0, 2048, 0, 50);

        const finalMetrics: number = ~~clamp(cores + frequencyCpu + vram + frequencyRam + capacityRam + capacityStorage, 1000);
        return finalMetrics;
    }
}