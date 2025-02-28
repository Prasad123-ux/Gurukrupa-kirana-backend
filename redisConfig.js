// const redis = require("redis");

// // Create Redis client
// const client = redis.createClient({
//     url: "redis://localhost:6379", // Ensure Redis is running at this address
// });

// // Connect to Redis
// client.connect()
//     .then(() => console.log("🔵 Redis connected successfully"))
//     .catch(err => console.error("❌ Redis connection error:", err));

// // Handle Redis errors
// client.on("error", (err) => {
//     console.error("❌ Redis Error:", err);
// });

// // Export client for use in other files
// module.exports = client;
   

const Redis = require("ioredis");
require("dotenv").config();

// Use the Upstash Redis URL from environment variables
const client = new Redis(process.env.REDIS_URL, {
    tls: { rejectUnauthorized: false } // Required for Upstash TLS connections
});

client.on("connect", () => {
    console.log("🔵 Connected to Upstash Redis successfully!");
});

client.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

module.exports = client;
