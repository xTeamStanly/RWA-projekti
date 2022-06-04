const getAllRAMTitlesQuery: string = `SELECT ram.id, CONCAT(ram.manufacturer, ' ', ram.model) as name FROM ram;`;

export {
    getAllRAMTitlesQuery
}