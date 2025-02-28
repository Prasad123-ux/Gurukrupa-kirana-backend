// const redis = require("redis");

// Create Redis client
const client = redis.createClient({
    url: "redis://localhost:6379", // Ensure Redis is running at this address
});

// Connect to Redis
client.connect()
    .then(() => console.log("🔵 Redis connected successfully"))
    .catch(err => console.error("❌ Redis connection error:", err));

// Handle Redis errors
client.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

// Export client for use in other files
module.exports = client;
