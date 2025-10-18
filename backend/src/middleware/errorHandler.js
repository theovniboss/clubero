


const errorHandler = (err, req, res, next) => {
	try {
		const isProd = process.env.NODE_ENV === 'production';
		const status = err.status || err.statusCode || 500;
		const code = err.code || 'internal_error';
		const message = err.publicMessage || err.message || 'Internal Server Error';
		const details = isProd ? undefined : (err.stack || err.details || null);

		
		// log (pode enviar para logger central)
		console.error(err);

		res.status(status).json({
			error: code,
			message,
			...(details ? { details } : {}),
			path: req.originalUrl,
			timestamp: new Date().toISOString(),
		});
	} catch {
		next(err);
	}
};

export default errorHandler;
