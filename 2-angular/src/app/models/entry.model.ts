export interface Entry {
    id: string;

    title: string;
    content: string;
    date: Date;

    color: string; // hex color
    keywords: string[];
    comment: string;
}

export const defaultEntry: Entry = {
    id: 'my_unique_string_example',

    title: 'Default Entry Default Entry 1233 Default Entry Default Entry 1233',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date(0), // Jan 01 1970

    color: '#5C5CFF', // todo create custom color pallete
    keywords: [ 'Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4', 'Keyword 5' ],
    comment: 'Default Comment'
}