const rateLimit = require("express-rate-limit")
// This will limit each IP to make maximum 100 reqs per windowMs in every 15 mins
const limiter = rateLimit({
   windowMs: 15* 60*1000,
   max: 100
})

module.exports = limiter;