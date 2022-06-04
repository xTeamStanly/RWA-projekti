const getAllMotherboardTitlesQuery: string = `SELECT motherboard.id, CONCAT(motherboard.manufacturer, ' ', motherboard.model) as name FROM motherboard;`;

export {
    getAllMotherboardTitlesQuery
}