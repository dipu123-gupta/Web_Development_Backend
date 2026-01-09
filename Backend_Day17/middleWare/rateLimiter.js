const client = require("../config/redis.js");

const windowSize = 3600; // 60 min
const maxRequest = 60;

const rateLimiter = async (req, res, next) => {
  try {
    const key = `rate-limit:${req.ip}`;
    const currentTime = Math.floor(Date.now() / 1000);
    const windowStart = currentTime - windowSize;

    // 1️⃣ Purane requests hatao
    await client.zRemRangeByScore(key, 0, windowStart);

    // 2️⃣ Current request count nikalo
    const numberOfRequests = await client.zCard(key);
    console.log(numberOfRequests);
    

    if (numberOfRequests >= maxRequest) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    // 3️⃣ New request add karo
    await client.zAdd(key, [
      {
        score: currentTime,
        value: `${currentTime}-${Math.random()}`,
      },
    ]);

    // 4️⃣ TTL set karo
    await client.expire(key, windowSize);

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = rateLimiter;
