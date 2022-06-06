import { clamp, map_range } from "../lib/util";
import { CPU } from "./CPU";
import { GPU } from "./GPU";
import { Motherboard } from "./Motherboard";
import { RAM } from "./RAM";
import { Storage } from "./Storage";

// CPU - cores (25%, clamp 10), frequency (15%, clamp 3.7)
// GPU - vram (25%, clamp 20)
// RAM - capacity (15%, clamp 32), frequency (15%, clamp 3400)
// STORAGE - capacity (5%, clamp 2)
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
        const cpuMetrics: number = ~~clamp(map_range(this.cpu.cores, 0, 10, 0, 250) + map_range(this.cpu.frequency, 0, 3.7, 0, 67), 400);
        const gpuMetrics: number = ~~clamp(map_range(this.gpu.vram, 0, 20, 0, 250), 250);
        const ramMetrics: number = ~~clamp(map_range(this.ram.capacity, 0, 32, 0, 67) + map_range(this.ram.frequency, 0, 3400, 0, 67), 300);
        const storageMetrics: number = ~~clamp(map_range(this.storage.capacity, 0, 2, 0, 50), 50);
        const finalMetrics: number = ~~clamp(cpuMetrics + gpuMetrics + ramMetrics + storageMetrics, 1000);
        return finalMetrics;
    }
}