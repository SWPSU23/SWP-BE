const time = require('../utilities/timeHelper')
const query = require('../services/query.Service')
const updateDashboard = async () => {
    // calculate revenue of 7days before include current day
    const last_seven_days_revenue = await calculateLastSevenDaysRevenue()
    // calculate top 3 best selling product of 7days before
    const top_three_best_selling_product_data =
        await calculateTopThreeBestSellingProductData()
    // calculate orders of 7days before
    const order_last_seven_days_data = await calculateOrderLastSevenDaysData()
    // calculate Top 10 best selling products of 7days before
    const weekly_best_selling_product_data =
        await calculateTenBestSellingProduct()
    // calculate today data
    const today_data = await calculateTodayData()
    const data = {
        last_seven_days_revenue: last_seven_days_revenue,
        top_three_best_selling_product_data:
            top_three_best_selling_product_data,
        order_last_seven_days_data: order_last_seven_days_data,
        weekly_best_selling_product_data: weekly_best_selling_product_data,
        today_data: today_data,
    }
    return data
}
const calculateTodayData = async () => {
    const today_data = []
    const currentDate = time.getNowDate()
    const yesterday = time.getBeforeDate(currentDate, 1)
    // get all order from yesterday to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${yesterday} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate today revenue
    const today_revenue = await calculateRevenueOfDay(currentDate, orders)
    // calculate yesterday revenue
    const yesterday_revenue = await calculateRevenueOfDay(yesterday, orders)
    // count total order of today
    const today_total_order = await calculateTotalOrderOfDay(
        currentDate,
        orders
    )
    // count total order of yesterday
    const yesterday_total_order = await calculateTotalOrderOfDay(
        yesterday,
        orders
    )
    // count total order of this month
    const this_month_total_order = await calculateTotalOrderOfMonth(
        time.getNowMonth()
    )
    // count total order of last month
    const last_month_total_order = await calculateTotalOrderOfMonth(
        time.getBeforeMonth(time.getNowMonth(), 1)
    )
    // count total product sold of today
    const today_total_product_sold = await calculateTotalProductSoldOfDay(
        currentDate
    )
    // count total product sold of yesterday
    const yesterday_total_product_sold = await calculateTotalProductSoldOfDay(
        yesterday
    )
    today_data.push({
        stats_title: "TODAY'S REVENUE",
        stats_value: today_revenue,
        past_value: yesterday_revenue,
    })
    today_data.push({
        stats_title: "TODAY'S ORDER",
        stats_value: today_total_order,
        past_value: yesterday_total_order,
    })
    today_data.push({
        stats_title: "TODAY'S ORDER THIS MONTH",
        stats_value: this_month_total_order,
        past_value: last_month_total_order,
    })
    today_data.push({
        stats_title: "TODAY'S PRODUCT SOLD",
        stats_value: today_total_product_sold,
        past_value: yesterday_total_product_sold,
    })
    return today_data
}
const calculateTotalProductSoldOfDay = async (day) => {
    // get all order from first day of month to last day of month
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${day} 00:00:00' AND '${day} 23:59:59'`,
        []
    )
    let total_product_sold = 0
    for (let i = 0; i < orders.length; i++) {
        const order_products = await query.getData(
            `SELECT * FROM \`OrderProduct\` WHERE \`order_id\` = ?`,
            [orders[i].id]
        )
        for (let j = 0; j < order_products.length; j++) {
            total_product_sold += order_products[j].quantity
        }
    }
    return total_product_sold
}
const calculateTotalOrderOfMonth = async (month) => {
    // get first day of month by replace day with 1
    const first_day_of_month = time.replaceDay(month, 1)
    // get last day of month by get first day of next month and subtract 1 day
    const last_day_of_month = time.getBeforeDate(
        time.replaceDay(time.getAfterMonth(month, 1), 1),
        1
    )
    // get all order from first day of month to last day of month
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${first_day_of_month} 00:00:00' AND '${last_day_of_month} 23:59:59'`,
        []
    )
    let total_order = 0
    for (let i = 0; i < orders.length; i++) {
        total_order++
    }
    return total_order
}

const calculateLastSevenDaysRevenue = async () => {
    // get current date
    const currentDate = time.getNowDate()
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6)
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate revenue of each day
    const last_seven_days_revenue = []
    for (let i = 0; i < 7; i++) {
        const day = time.getBeforeDate(currentDate, 6 - i)
        const revenue = await calculateRevenueOfDay(day, orders)
        last_seven_days_revenue.push({
            id: i + 1,
            day: day,
            revenue: revenue,
        })
    }
    return last_seven_days_revenue
}

const calculateRevenueOfDay = async (day, orders) => {
    let revenue = 0
    for (let i = 0; i < orders.length; i++) {
        if (time.timeStampToDate(orders[i].create_at) === day) {
            revenue += orders[i].total_price
        }
    }
    return revenue
}

const calculateBestSellingProduct = async () => {
    // get current date
    const currentDate = time.getNowDate()
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6)
    // get all order from 6 days before to current date
    const list_order = await query.getData(
        `SELECT OP.product_id, OP.total FROM \`Order\` o` +
            ` JOIN \`OrderProduct\` OP ON o.id = OP.order_id` +
            ` WHERE o.\`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate total sold of each product
    const list_product = []
    for (let i = 0; i < list_order.length; i++) {
        const product_id = list_order[i].product_id
        const total_sold = list_order[i].total
        let isExist = false
        for (let j = 0; j < list_product.length; j++) {
            if (list_product[j].product_id === product_id) {
                list_product[j].total_sold += total_sold
                isExist = true
                break
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
        return b.total_sold - a.total_sold
    })
    return list_product
}

const calculateTopThreeBestSellingProductData = async () => {
    const list_product = await calculateBestSellingProduct()
    const top_three_best_selling_product_data = []
    const total_revenue = await getTotalRevenueOfWeek()
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
            break
        }
    }
    return top_three_best_selling_product_data
}

const calculateOrderLastSevenDaysData = async () => {
    // get current date
    const currentDate = time.getNowDate()
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6)
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate total order of each day
    const order_last_seven_days_data = []
    for (let i = 0; i < 7; i++) {
        const day = time.getBeforeDate(currentDate, 6 - i)
        const total_order = await calculateTotalOrderOfDay(day, orders)
        order_last_seven_days_data.push({
            id: i + 1,
            title: day,
            total_order: total_order,
        })
    }
    return order_last_seven_days_data
}

const calculateTotalOrderOfDay = async (day, orders) => {
    let total_order = 0
    for (let i = 0; i < orders.length; i++) {
        if (time.timeStampToDate(orders[i].create_at) === day) {
            total_order++
        }
    }
    return total_order
}

const calculateTenBestSellingProduct = async () => {
    const list_product = await calculateBestSellingProduct()
    const top_ten_best_selling_product_data = []
    const total_revenue = await getTotalRevenueOfWeek()
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
            break
        }
    }
    return top_ten_best_selling_product_data
}

const getTotalRevenueOfWeek = async () => {
    // get current date
    const currentDate = time.getNowDate()
    // get 6 days before
    const sixDaysBefore = time.getBeforeDate(currentDate, 6)
    // get all order from 6 days before to current date
    const orders = await query.getData(
        `SELECT * FROM \`Order\` WHERE \`create_at\` BETWEEN '${sixDaysBefore} 00:00:00' AND '${currentDate} 23:59:59'`,
        []
    )
    // calculate total order of each day
    let total_revenue = 0
    for (let i = 0; i < orders.length; i++) {
        total_revenue += orders[i].total_price
    }

    return total_revenue
}
const saveDashboard = async (data) => {
    // init redis client
    console.log(data)
    const redis = require('redis')
    const redisClient = redis.createClient({
        url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
        password: global.config.redis.password,
        database: global.config.redis.notificationDB,
    })
    redisClient.connect()
    // save data to redis
    await redisClient.set('dashboard', JSON.stringify(data))
    // set expire time for key to 1 day
    await redisClient.expire('dashboard', 86400)
    // close redis client
    redisClient.quit()
}
const getDashboardData = async () => {
    // init redis client
    const redis = require('redis')
    const redisClient = redis.createClient({
        url: `redis://${global.config.redis.host}:${global.config.redis.port}`,
        password: global.config.redis.password,
        database: global.config.redis.notificationDB,
    })
    redisClient.connect()
    // get data from redis
    const data = await redisClient.get('dashboard')
    // close redis client
    redisClient.quit()
    return JSON.parse(data)
}

module.exports = {
    getDashboardData,
    updateDashboard,
    saveDashboard,
}
