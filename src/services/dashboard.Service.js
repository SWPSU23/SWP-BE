const time = require('../utilities/timeHelper')
const query = require('../services/query.Service')
const dashboardSchema = {
    //revenue of 7days before
    last_seven_days_revenue: [
        {
            id: 1,
            day: '07/22', //fortmat: mm/dd
            revenue: 7888,
        },
        {
            id: 2,
            day: '07/23',
            revenue: 54999,
        },
        {
            id: 3,
            day: '07/24',
            revenue: 25699,
        },
        {
            id: 4,
            day: '07/25',
            revenue: 56599,
        },
        {
            id: 5,
            day: '07/26',
            revenue: 7877,
        },
        {
            id: 6,
            day: '07/27',
            revenue: 9588,
        },
        {
            id: 7,
            day: '07/28',
            revenue: 79998,
        },
    ],
    // top 3 best selling product of 7days before
    top_three_best_selling_product_data: [
        {
            id: 1,
            product: 'pepsi', //name of product
            sold: 7888,
        },
        {
            id: 2,
            product: 'coca',
            sold: 5008,
        },
        {
            id: 3,
            product: '7-up',
            sold: 2000,
        },
        {
            id: 4,
            product: 'other', //all remain products except top 3
            sold: 500, //all product sold except top 3
        },
    ],
    //orders of 7days before
    order_last_seven_days_data: [
        {
            id: 1,
            title: '07/22', //fortmat: mm/dd
            total_order: 1000, //total number of order in this date
        },
        {
            id: 2,
            title: '07/23',
            total_order: 1500,
        },
        {
            id: 3,
            title: '07/24',
            total_order: 900,
        },
        {
            id: 4,
            title: '07/25',
            total_order: 2000,
        },
        {
            id: 5,
            title: '07/26',
            total_order: 1500,
        },
        {
            id: 6,
            title: '07/27',
            total_order: 3000,
        },
        {
            id: 7,
            title: '07/28',
            total_order: 3500,
        },
    ],
    //Top 10 best selling products of 7days before
    weekly_best_selling_product_data: [
        {
            id: 1,
            total_sold: 5000, //total product sold in 7 day
            percent: 50, //=total product sold in 7days / total all product sold in 7days
            product: 'pepsi', //product name
        },
        {
            id: 2,
            total_sold: 3500,
            percent: 30,
            product: 'coca',
        },
        {
            id: 3,
            total_sold: 3000,
            percent: 10,
            product: '7-up',
        },
        {
            id: 4,
            total_sold: 2500,
            percent: 5,
            product: 'snack',
        },
        {
            id: 5,
            total_sold: 1000,
            percent: 3,
            product: 'sting',
        },
        {
            id: 6,
            total_sold: 500,
            percent: 2,
            product: 'red bull',
        },
        {
            id: 7,
            total_sold: 500,
            percent: 2,
            product: 'red bull',
        },
        {
            id: 8,
            total_sold: 500,
            percent: 2,
            product: 'red bull',
        },
        {
            id: 9,
            total_sold: 500,
            percent: 2,
            product: 'red bull',
        },
        {
            id: 10,
            total_sold: 500,
            percent: 2,
            product: 'red bull',
        },
    ],
    today_data: [
        {
            //eslint-disable-next-line no-useless-escape
            stats_title: "TODAY'S REVENUE",
            stats_value: 20450, //Today revenue
            past_value: 15000, //yesterday revenue
        },
        {
            //eslint-disable-next-line no-useless-escape
            stats_title: "TODAY'S ORDER",
            stats_value: 200, //total number of today order
            past_value: 1000, //total number of yesterday order
        },
        {
            //eslint-disable-next-line no-useless-escape
            stats_title: "TODAY'S ORDER THIS MONTH",
            stats_value: 2000, //total number of this month order
            past_value: 3000, //total number of last month order
        },
        {
            stats_title: "TODAY'S PRODUCT SOLD",
            stats_value: 150, // total number of product sold today
            past_value: 200, //total number of product sold yesterday
        },
    ],
}
const readDashboard = async () => {
    // calculate revenue of 7days before include current day
    const last_seven_days_revenue = await calculateLastSevenDaysRevenue();
    // calculate top 3 best selling product of 7days before
    const top_three_best_selling_product_data = await calculateTopThreeBestSellingProductData();
    // calculate orders of 7days before
    const order_last_seven_days_data = await calculateOrderLastSevenDaysData();
    // calculate Top 10 best selling products of 7days before
    const weekly_best_selling_product_data = await calculateTenBestSellingProduct();
    // calculate today data
    const data = {
        last_seven_days_revenue: last_seven_days_revenue,
        top_three_best_selling_product_data: top_three_best_selling_product_data,
        order_last_seven_days_data: order_last_seven_days_data,
        weekly_best_selling_product_data: weekly_best_selling_product_data,
        today_data: 'kiệt làm cái này'
    }
    return data;
}

const calculateLastSevenDaysRevenue = async () => {
    // get current date
    const currentDate = time.getNowDate();
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6);
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate revenue of each day
    const last_seven_days_revenue = [];
    for (let i = 0; i < 7; i++) {
        const day = time.getBeforeDate(currentDate, 6 - i);
        const revenue = calculateRevenueOfDay(day, orders);
        last_seven_days_revenue.push({
            id: i + 1,
            day: day,
            revenue: revenue,
        })
    }
    return last_seven_days_revenue;
}

const calculateRevenueOfDay = (day, orders) => {
    let revenue = 0;
    for (let i = 0; i < orders.length; i++) {
        if (time.timeStampToDate(orders[i].create_at) === day) {
            revenue += orders[i].total_price;
        }
    }
    return revenue;
}

const calculateBestSellingProduct = async () => {
    // get current date
    const currentDate = time.getNowDate();
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6);
    // get all order from 6 days before to current date
    const list_order = await query.getData(
        `SELECT OP.product_id, OP.total FROM \`Order\` o` +
        ` JOIN \`OrderProduct\` OP ON o.id = OP.order_id` +
        ` WHERE o.\`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    );
    // calculate total sold of each product
    const list_product = [];
    for (let i = 0; i < list_order.length; i++) {
        const product_id = list_order[i].product_id;
        const total_sold = list_order[i].total;
        let isExist = false;
        for (let j = 0; j < list_product.length; j++) {
            if (list_product[j].product_id === product_id) {
                list_product[j].total_sold += total_sold;
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            list_product.push({
                product_id: product_id,
                total_sold: total_sold,
            })
        }
    }
    // sort list product by total sold
    list_product.sort((a, b) => {
        return b.total_sold - a.total_sold;
    })
    return list_product;
}

const calculateTopThreeBestSellingProductData = async () => {
    const list_product = await calculateBestSellingProduct();
    const top_three_best_selling_product_data = [];
    const total_revenue = await getTotalRevenueOfWeek();
    for (let i = 0; i < 3; i++) {
        if (i < list_product.length) {
            const product = await query.getData(
                `SELECT * FROM \`Product\` WHERE \`id\` = ?`,
                [list_product[i].product_id]
            )
            top_three_best_selling_product_data.push({
                id: i + 1,
                product: product[0].name,
                sold: list_product[i].total_sold,
                percent: (list_product[i].total_sold / total_revenue) * 100,
            })
        } else {
            break;
        }
    }
    return top_three_best_selling_product_data;
}

const calculateOrderLastSevenDaysData = async () => {
    // get current date
    const currentDate = time.getNowDate();
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6);
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate total order of each day
    const order_last_seven_days_data = [];
    for (let i = 0; i < 7; i++) {
        const day = time.getBeforeDate(currentDate, 6 - i);
        const total_order = calculateTotalOrderOfDay(day, orders);
        order_last_seven_days_data.push({
            id: i + 1,
            title: day,
            total_order: total_order,
        })
    }
    return order_last_seven_days_data;
}

const calculateTotalOrderOfDay = (day, orders) => {
    let total_order = 0;
    for (let i = 0; i < orders.length; i++) {
        if (time.timeStampToDate(orders[i].create_at) === day) {
            total_order++;
        }
    }
    return total_order;
}

const calculateTenBestSellingProduct = async () => {
    const list_product = await calculateBestSellingProduct();
    const top_ten_best_selling_product_data = [];
    const total_revenue = await getTotalRevenueOfWeek();
    for (let i = 0; i < 10; i++) {
        if (i < list_product.length) {
            const product = await query.getData(
                `SELECT * FROM \`Product\` WHERE \`id\` = ?`,
                [list_product[i].product_id]
            )
            top_ten_best_selling_product_data.push({
                id: i + 1,
                product: product[0].name,
                sold: list_product[i].total_sold,
                percent: (list_product[i].total_sold / total_revenue) * 100,
            })
        } else {
            break;
        }
    }
    return top_ten_best_selling_product_data;

}

const getTotalRevenueOfWeek = async () => {
    // get current date
    const currentDate = time.getNowDate();
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6);
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate total order of each day
    let total_revenue = 0;
    for (let i = 0; i < orders.length; i++) {
        total_revenue += orders[i].total_price;
    }

    return total_revenue;
}

module.exports = {
    readDashboard,
}
