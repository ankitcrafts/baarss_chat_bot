import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
    password: process.env.REDIS_PASSWORD
});

// On Redis Connect
redisClient.on('connect', () => {
    console.log("Redis Connected");    
});

// On Redis Error
redisClient.on('error', (error) => {
    console.error("Redis Error:", error);
});

export default redisClient;