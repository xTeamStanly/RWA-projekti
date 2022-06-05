const getAllConfigurationPrices: string = `
    SELECT
        configuration.id,
        configuration.name,
        (cpu.price + gpu.price + motherboard.price + ram.price + storage.price) AS price
    FROM
        configuration
    INNER JOIN cpu ON cpu.id = "cpuId"
    INNER JOIN gpu ON gpu.id = "gpuId"
    INNER JOIN motherboard ON motherboard.id = "motherboardId"
    INNER JOIN ram ON ram.id = "ramId"
    INNER JOIN storage ON storage.id = "storageId";`;

const getAllUserPurchases: string = `
    SELECT
	    "purchase"."id",
	    "configurationId",
	    (SELECT "name" FROM "configuration" WHERE "configurationId" = "configuration"."id") as "name",
	    (
		    SELECT (cpu.price + gpu.price + motherboard.price + ram.price + storage.price) AS price
    	    FROM configuration
    	    INNER JOIN cpu ON cpu.id = "cpuId"
    	    INNER JOIN gpu ON gpu.id = "gpuId"
    	    INNER JOIN motherboard ON motherboard.id = "motherboardId"
    	    INNER JOIN ram ON ram.id = "ramId"
    	    INNER JOIN storage ON storage.id = "storageId"
    		WHERE configuration.id = "configurationId"
	    ) as "price"
    FROM "purchase"
    WHERE "purchase"."userId" = $1;`
export {
    getAllConfigurationPrices,
    getAllUserPurchases
}