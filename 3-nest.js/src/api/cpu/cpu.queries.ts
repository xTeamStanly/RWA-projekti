const getAllCPUTitlesQuery: string = `SELECT cpu.id, CONCAT(cpu.manufacturer, ' ', cpu.model) as name FROM cpu;`;

export {
    getAllCPUTitlesQuery
}