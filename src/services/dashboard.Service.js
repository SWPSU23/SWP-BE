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
    const last_seven_days_revenue = await calculateLastSevenDaysRevenue()
}
const calculateLastSevenDaysRevenue = async () => {
    // get current date
    const currentDate = time.getNowDate()
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(time.timeStampToDate(currentDate), 6)
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    global.logger.info(JSON.stringify(orders))
}
module.exports = {
    readDashboard,
}
