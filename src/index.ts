import express from 'express';
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const redisHost = process.env.REDIS_HOST;

const redisPort = process.env.REDIS_PORT || '6379';

if (!redisHost) {
  throw new Error("REDIS_HOST environment variable is not defined");
}

if (isNaN(Number(redisPort))) {
  throw new Error("REDIS_PORT must be a valid number");
}

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`
})

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  await redisClient.connect();

  app.get('/', async (req, res) => {
    const visits = await redisClient.incr('counter');

    res.json({
      message: 'Hello dari Docker Multi-Container dengan Redis!',
      visits
    });
  });

  app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
  });
}

connectRedis()