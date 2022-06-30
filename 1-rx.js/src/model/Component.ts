export interface Component {
    id: number,
    manufacturer: string,
    model: string,
    price: number
};

export interface ComponentDetail {
    notificationMessage: string,
    urlName: string,
    errorMessage: string
};