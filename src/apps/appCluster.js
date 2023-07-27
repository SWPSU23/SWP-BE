const cluster = require('cluster')
const os = require('os')
cluster.schedulingPolicy = cluster.SCHED_RR // round robin scheduling
cluster.setupPrimary({
    exec: 'src/apps/appWorker.js',
})
if (cluster.isPrimary) {
    global.logger.info(
        `server is running on ${global.config.isDev ? 'Development' : 'Production'
        } mode`
    )
    global.logger.info(`Primary ${process.pid} is running`)
    const numWorkers = global.config.isDev ? 1 : os.availableParallelism()
    global.logger.info(`Master cluster setting up ${numWorkers} workers...`)
    // handle scheduler job
    let isScheduleRunning = true
    for (let i = 0; i < numWorkers; i++) {
        // run scheduler job on first worker
        cluster.fork({ runSchedule: isScheduleRunning })
        isScheduleRunning = false
    }
    cluster.on('online', (worker) => {
        // global.logger.info(`Worker ${worker.process.pid} is online`)
    })
    cluster.on('exit', (worker, code, signal) => {
        global.logger.info(
            `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
            // print error message
        )
        // delay 5s to restart
        setTimeout(() => {
            worker = cluster.fork()
        }, 5000)
    })
}
