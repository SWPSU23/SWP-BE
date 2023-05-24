const pool = require('../services/queryHelper');
const queryModal = require('../queries/queryModal');


const getProductDetail = async (id) => {
    const query = queryModal.getProductDetail(id);
    pool.getProductDetail(id, query);
};
module.exports = { getProductDetail };