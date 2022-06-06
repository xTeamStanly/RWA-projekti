import { clamp } from "../lib/util";
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
        const cpuMetrics: number = ~~clamp(clamp(this.cpu.cores, 10) * 25 + clamp(this.cpu.frequency, 3.7) * 19, 400);
        const gpuMetrics: number = ~~clamp(clamp(this.gpu.vram, 20) * 13, 250);
        const ramMetrics: number = ~~clamp(clamp(this.ram.capacity, 32) * 2.1 + clamp(this.ram.frequency, 3400) * 0.02, 300);
        const storageMetrics: number = ~~clamp(clamp(this.storage.capacity, 2) * 25 ,50);

        const finalMetrics: number = ~~clamp(cpuMetrics + gpuMetrics + ramMetrics + storageMetrics, 1000);
        return finalMetrics;
    }
}