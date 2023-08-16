import rateLimit from 'express-rate-limit';

export default rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})