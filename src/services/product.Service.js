const time = require('../utilities/timeHelper');
const pool = require('../services/query.Service');
const queries = require('../queries/queryModal');

// auto update status product unavailable
const updateStatusProductUnavailable = async () => {
    try {
        // pool.getPool();
        // get list product where status = available
        const list_products = await pool
            .getData(
                queries.Schedule.getListProduct,
                []
            );
        list_products.map(async (item) => {
            if (time.getNowDate() >= time.timeStampToDate(item.expired_at)) {
                // update status product unavailable
                await pool
                    .setData(
                        queries.Product.updateProductByID,
                        [
                            { status: 'unavailable' },
                            item.id
                        ]
                    );
            }
        });
        global.logger.info(`Service - Scan update status product unavailable success`);
        return list_products;
    } catch (error) {
        global.logger.error(`Service - Error update status product unavailable: ${error}`);
        throw error;
    }
}

module.exports = {
    updateStatusProductUnavailable
}