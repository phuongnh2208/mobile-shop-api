const { createClient } = require("redis");

const client = createClient({
    username: 'default',
    password: 'tz6AHcnJZzhKp3BVoAJrQ7WUm468QqDy',
    socket: {
        host: 'redis-12020.crce220.us-east-1-4.ec2.cloud.redislabs.com',
        port: 12020
    }
});

client
.on('error', err => console.log('Redis Client Error', err))
.on ("connect", ()=> console.log("Redis connected"));

client.connect();
module.exports = client;

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar
