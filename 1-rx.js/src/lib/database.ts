import { from, Observable } from "rxjs";
import { Component, ComponentDetail } from "../model/Component";
import { Software } from "../model/Software";
import { notifyUser } from "./notify";

const DATABASE_URL: string = 'http://localhost:3000';

export function findComponentBuilder(componentDetail: ComponentDetail) : (componentName: string) => Observable<Component[]> {
    return (componentName: string) => {
        return from(
            fetch(`${DATABASE_URL}/${componentDetail.urlName}/?model=${componentName}`)
            .then((result: Response) => {
                if(result.ok) { return result.json(); }
                throw new Error(componentDetail.errorMessage);
            })
            .catch((err: any) => {
                notifyUser('Error', err.message, 'error');
                console.log(err);
            })
        );
    }
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