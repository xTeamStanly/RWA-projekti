const getAllGPUTitlesQuery: string = `SELECT gpu.id, CONCAT(gpu.manufacturer, ' ', gpu.model) as name from gpu`;

export {
    getAllGPUTitlesQuery
}