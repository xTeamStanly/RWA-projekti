import { ComponentDetail } from "../model/Component";

export const componentDetails: Map<number, ComponentDetail> = new Map<number, ComponentDetail>([
    [0, {
        notificationMessage: 'CPU Found',
        urlName: 'cpu',
        errorMessage: 'Processor not found!'
    }],

    [1, {
        notificationMessage: 'GPU Found',
        urlName: 'gpu',
        errorMessage: 'Graphics Card not found!'
    }],

    [2, {
        notificationMessage: 'RAM Found',
        urlName: 'ram',
        errorMessage: 'Random Access Memory not found!'
    }],

    [3, {
        notificationMessage: 'Storage Found',
        urlName: 'storage',
        errorMessage: 'Storage not found!'
    }],

    [4, {
        notificationMessage: 'Motherboard Found',
        urlName: 'motherboard',
        errorMessage: 'Motherboard not found!'
    }],
]);