import { from, Observable, retry } from "rxjs";
import { CPU } from "../model/CPU";
import { GPU } from "../model/GPU";
import { Motherboard } from "../model/Motherboard";
import { RAM } from "../model/RAM";
import { Software } from "../model/Software";
import { Storage } from "../model/Storage";
import { notifyUser } from "./notify";

const DATABASE_URL: string = 'http://localhost:3000';

export function findCpu(cpuName: string) : Observable<CPU[]> {
    return from(
        fetch(`${DATABASE_URL}/cpu/?model=${cpuName}`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Processor not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}

export function findGpu(gpuName: string) : Observable<GPU[]> {
    return from(
        fetch(`${DATABASE_URL}/gpu/?model=${gpuName}`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Graphics Card not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}

export function findRam(ramName: string) : Observable<RAM[]> {
    return from(
        fetch(`${DATABASE_URL}/ram/?model=${ramName}`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Random Access Memory not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}

export function findStorage(storageName: string) : Observable<Storage[]> {
    return from(
        fetch(`${DATABASE_URL}/storage/?model=${storageName}`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Storage not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}

export function findMotherboard(motherboardName: string) : Observable<Motherboard[]> {
    return from(
        fetch(`${DATABASE_URL}/motherboard/?model=${motherboardName}`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Motherboard not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}

export function allSoftware() : Observable<Software[]> {
    return from(
        fetch(`${DATABASE_URL}/software`)
        .then((result: Response) => {
            if(result.ok) { return result.json(); }
            throw new Error('Software not found!');
        })
        .catch((err: any) => {
            notifyUser('Error', err.message, 'error');
            console.log(err);
        })
    );
}