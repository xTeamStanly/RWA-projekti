export interface Entry {
    id: string;

    title: string;
    content: string;
    date: string;

    color: string; // hex color
    keywords: string[];
    comment: string;
}

export const defaultEntry: Entry = {
    id: '',

    title: '',
    content: '',
    date: new Date(0).toLocaleDateString('sr-RS'), // Jan 01 1970

    color: '#5C5CFF',
    keywords: [],
    comment: ''
}

export const emptyEntry: Entry = {
    id: '',

    title: '',
    content: '',
    date: new Date().toLocaleDateString('sr-RS'),

    color: '#5C5CFF',
    keywords: [],
    comment: ''
};