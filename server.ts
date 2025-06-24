import jsonServer from 'json-server';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const dbPath = resolve(__dirname, 'server', 'db.json');
const router = jsonServer.router(dbPath);

// CORS middleware первым
server.use((req, res, next) => {

	res.header({
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': 'http://localhost:5173',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Expose-Headers': 'X-Total-Count'
	});
	if (res.locals && res.locals.data) {
		console.log('Setting X-Total-Count:', res.locals.data.length);
		res.set('X-Total-Count', res.locals.data.length.toString());
	}
	if (req.method === 'OPTIONS') {
		res.set('Access-Control-Max-Age', '3600');
		res.sendStatus(204);
	} else {
		next();
	}
});

// Остальные middlewares
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

// Middleware для X-Total-Count после router
server.use((req, res, next) => {
	if (res.locals && res.locals.data) {
		// Добавляем проверку типа данных
		if (Array.isArray(res.locals.data)) {
			res.set('X-Total-Count', res.locals.data.length.toString());
		} else {
			res.set('X-Total-Count', Object.keys(res.locals.data).length.toString());
		}
	}
	next();
});

// Rewriter должен идти после всех middlewares
server.use(jsonServer.rewriter({
	'/api/*': '/$1',
	'/api': '/$1'
}));

const port = process.env.PORT || 3001;
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
