const getAllStorageTitlesQuery: string = `SELECT storage.id, CONCAT(storage.manufacturer, ' ', storage.model) as name FROM storage;`;

export {
    getAllStorageTitlesQuery
}