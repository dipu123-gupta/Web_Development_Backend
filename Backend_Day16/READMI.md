# 🔐 Rate Limiting Algorithms

This repository explains and demonstrates three common rate limiting algorithms
used in backend systems to control API traffic.

---

## ❓ What is Rate Limiting?

Rate limiting restricts how many requests a user, IP, or API key can make within
a certain time window to protect servers from abuse.

---

## 1️⃣ Token Bucket Algorithm

### Concept
- A bucket holds tokens
- Each request consumes one token
- Tokens refill at a fixed rate
- If no token → request rejected

### Advantages
- Allows burst traffic
- Smooth request handling
- Widely used in production APIs

### Disadvantages
- Slightly complex
- Needs Redis or in-memory store

### Use Cases
- Payment APIs
- Login & OTP endpoints
- Public APIs

---

## 2️⃣ Fixed Window Algorithm

### Concept
- Time divided into fixed windows
- Requests counted per window
- Counter resets after window ends

### Advantages
- Very easy to implement
- Low memory usage

### Disadvantages
- Boundary problem
- Burst traffic allowed

### Use Cases
- Small applications
- Admin dashboards

---

## 3️⃣ Sliding Window Algorithm

### Concept
- Window slides continuously
- Tracks request timestamps
- Counts requests in last N seconds

### Advantages
- Highly accurate
- No boundary issue
- Fair usage

### Disadvantages
- High memory usage
- Complex logic

### Use Cases
- Banking systems
- Authentication services
- High security APIs

---

## 🔥 Comparison

| Algorithm | Accuracy | Burst Control | Complexity |
|---------|---------|---------------|------------|
| Token Bucket | High | Yes | Medium |
| Fixed Window | Low | No | Easy |
| Sliding Window | Very High | Controlled | Hard |

---

## 🚀 Recommendation

- Beginners → Fixed Window
- Production APIs → Token Bucket
- Security-critical systems → Sliding Window
