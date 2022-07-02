import { ComponentDetail } from "../model/Component";

export const componentDetails: ComponentDetail[] = [
    {
        notificationMessage: 'CPU Found',
        urlName: 'cpu',
        errorMessage: 'Processor not found!'
    },
    {
        notificationMessage: 'GPU Found',
        urlName: 'gpu',
        errorMessage: 'Graphics Card not found!'
    },
    {
        notificationMessage: 'RAM Found',
        urlName: 'ram',
        errorMessage: 'Random Access Memory not found!'
    },
    {
        notificationMessage: 'Storage Found',
        urlName: 'storage',
        errorMessage: 'Storage not found!'
    },
    {
        notificationMessage: 'Motherboard Found',
        urlName: 'motherboard',
        errorMessage: 'Motherboard not found!'
    }
];