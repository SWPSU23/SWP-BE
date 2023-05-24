const redis = require('redis');

// Function to perform Redis operations
function performRedisOperations() {
    const redisClient = redis.createClient({
        url: 'redis://tuankiet2s.onthewifi.com:6379',
        database: 0,

    });

    // Perform Redis operations here
    redisClient.connect();
    redisClient.on('connect', () => {
        console.log('Redis client connected');
    });
    redisClient.on('error', (err) => {

        console.log('Something went wrong ' + err);
});
redisClient.set('my test key', 'my test value', redis.print);
redisClient.get('my test key', (error, result) => {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});
// Close the Redis client connection
redisClient.quit();
}

// Example usage
performRedisOperations();