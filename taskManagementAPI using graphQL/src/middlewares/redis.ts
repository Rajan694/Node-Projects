// import { createClient, RedisClientType } from 'redis';
// import dotenv from 'dotenv';

// dotenv.config();

// export let redisClient: RedisClientType | undefined;

// async function initializeRedisClient() {
//   const redisURL = process.env.REDIS_URI || 'redis://localhost:6379';

//   if (!redisClient) {
//     console.log(`Initializing Redis client with URL: ${redisURL}`);
//     const client = createClient({
//       url: redisURL,
//       socket: {
//         connectTimeout: 5000, // 5 seconds timeout
//       }
//     });

//     client.on('error', (err) => {
//       console.error('Redis Client Error:', err);
//     });

//     try {
//       await client.connect();
//       redisClient = client as RedisClientType;
//       console.log('Connected to Redis successfully!');
//     } catch (error) {
//       console.error('Could not connect to Redis:', error);
//       redisClient = undefined;
//     }
//   }
// }

// export { initializeRedisClient };
