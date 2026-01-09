# 🪟 Sliding Window Rate Limiting

Sliding Window Rate Limiting is the most accurate algorithm used to control
the number of requests a client can make within a moving time window.

---

## ❓ What is Sliding Window?

Instead of dividing time into fixed blocks, sliding window calculates
the number of requests made in the last N seconds from the current time.

This avoids the boundary problem present in fixed window rate limiting.

---

## 🧠 How It Works

For every incoming request:

1. Get the current timestamp
2. Calculate window start time (currentTime - windowSize)
3. Remove old requests outside the window
4. Count remaining requests
5. If count exceeds limit → block request
6. Otherwise, add current request timestamp
7. Set TTL to auto-expire inactive keys

---

## 🔑 Redis Data Structure

Sliding window uses **Redis Sorted Sets (ZSET)**.

- Score → Request timestamp
- Value → Unique request identifier

---

## 🧪 Redis Commands Used

- ZADD → Add request
- ZREMRANGEBYSCORE → Remove old requests
- ZCARD → Count requests
- EXPIRE → Auto cleanup

---

## ✅ Advantages

- No boundary issue
- Highly accurate
- Fair request distribution

---

## ❌ Disadvantages

- Uses more memory
- Slightly complex to implement
- Needs Redis or in-memory store

---

## 🚀 Use Cases

- Authentication APIs
- OTP verification
- Payment gateways
- High-security services

---

## 🧠 Summary

Sliding Window Rate Limiting tracks actual request timestamps within a
moving time window to ensure accurate and fair rate limiting.

====================================================

Sliding Window Rate Limiting – Deep Dive
4
1️⃣ Sliding Window ka Real Meaning

Sliding Window ka matlab hai:
“Har request ke time par pichhle N seconds/minutes me hui actual requests ko count karna.”

Window fixed blocks me divide nahi hoti

Window current time ke saath slide hoti rehti hai

Isi wajah se ye sabse accurate rate limiting hai

2️⃣ Problem Jo Sliding Window Solve Karta Hai
❌ Fixed Window ka Issue (Boundary Problem)
Limit: 5 req / 60 sec

12:00:59 → 5 requests
12:01:00 → window reset
12:01:01 → 5 requests


👉 Total = 10 requests in 2 sec 😬
👉 Server abuse ho sakta hai

✅ Sliding Window ka Solution
Now = 12:01:01
Window = last 60 sec → 12:00:01 to 12:01:01


👉 Actual last 60 sec ke requests count honge
👉 Boundary trick fail ❌

3️⃣ Sliding Window Internals (VERY IMPORTANT)

Sliding Window counter par nahi,
timestamps par kaam karta hai.

Stored Data:

Har request ka timestamp

Redis me Sorted Set (ZSET)

4️⃣ Redis Sorted Set (ZSET) ka Role
ZSET structure:
ZSET key
  score  → timestamp
  value  → unique request id


Example:

score = 1710000000
value = "1710000000-0.234"

ZSET kyu use hota hai?

✔️ Sorted by time
✔️ Old requests ko easily delete kar sakte hain
✔️ Count fast hota hai

5️⃣ Sliding Window Algorithm (Exact Steps)

Assume:

Window Size = 60 seconds
Max Requests = 5

🔁 Har incoming request par:
Step 1: Current Time Nikalo
now = current unix timestamp (seconds)

Step 2: Window Start Calculate Karo
windowStart = now - 60

Step 3: Old Requests Remove Karo
Remove all requests with timestamp < windowStart


Redis:

ZREMRANGEBYSCORE key 0 windowStart

Step 4: Current Window Count Nikalo
ZCARD key

Step 5: Limit Check
if count >= max → BLOCK (429)

Step 6: Current Request Add Karo
ZADD key score value

Step 7: TTL Lagao
EXPIRE key windowSize


👉 Inactive users ka data auto delete

6️⃣ Request Lifecycle (Mentally Visualize Karo)
Request Aayi
   ↓
Current time nikla
   ↓
Old timestamps delete
   ↓
Remaining timestamps count
   ↓
Limit exceeded?
   ├─ Yes → 429 Error
   └─ No  → Add request → Allow

7️⃣ Node.js + Redis Implementation (Clean & Correct)
const redis = require("../config/redis");

const WINDOW_SIZE = 60;      // seconds
const MAX_REQUESTS = 5;

const slidingWindowLimiter = async (req, res, next) => {
  try {
    const key = `rate:sliding:${req.ip}`;
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - WINDOW_SIZE;

    // 1️⃣ Remove old requests
    await redis.zRemRangeByScore(key, 0, windowStart);

    // 2️⃣ Count current window requests
    const requestCount = await redis.zCard(key);

    if (requestCount >= MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests, please try later",
      });
    }

    // 3️⃣ Add current request
    await redis.zAdd(key, [
      {
        score: now,
        value: `${now}-${Math.random()}`,
      },
    ]);

    // 4️⃣ Set TTL
    await redis.expire(key, WINDOW_SIZE);

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = slidingWindowLimiter;

8️⃣ Why value must be unique?
value: `${now}-${Math.random()}`


👉 Same second me multiple requests aa sakti hain
👉 ZSET me duplicate values allowed nahi
👉 Isliye unique value zaroori hai

9️⃣ Performance Analysis
⏱️ Time Complexity

ZADD, ZREM, ZCARD → O(log N)

N = requests in window

💾 Memory

Sirf last window ke requests store hote hain

TTL ke wajah se auto cleanup

10️⃣ Pros & Cons (Interview Ready)
✅ Pros

✔️ Most accurate
✔️ Fair rate limiting
✔️ No boundary issue

❌ Cons

❌ Redis memory use
❌ Slightly complex
❌ Very high traffic me optimization chahiye

11️⃣ When to Use Sliding Window?

Use karo jab:

🔐 Login / OTP APIs

💳 Payments

🏦 Banking systems

🌍 Public APIs (security critical)