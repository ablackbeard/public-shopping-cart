const { PrismaClient } = require("./generated/prisma");
const express = require("express");
const http = require("http");
const cors = require("cors");

const endpoints = require("./src/endpoints");
const models = require("./src/models");
const config = require("./src/config.js");
const prisma = new PrismaClient();

async function main() {
	//prisma.guest.create
	/*let count = await prisma.guest.count({
		where: {
			BNMID: "123456"
		}
	});*/
	//console.log(prisma)
	/*let item = await prisma.item.create({
		data: {
			UPC: "123212321232",
			Name: "Orange",
			Quantity: 55
		}
	});
	console.log(item);*/
	/*let report = await prisma.report.create({
		data: {
			Data: ["123212321232", "123456789098"]
		}
	})
	console.log(report)*/
	/*const user = await prisma.user.create({
		data: {
		  name: 'Test2',
		  email: 'test2@prisma.io',
		},
	  })
	  console.log(user)*/

	let app = await buildApp();

	models.init(prisma);
	for (let endpoint in endpoints) {
		let setEndpoint = endpoints[endpoint];
		setEndpoint(app, models.models);
	}

	let server = http.createServer(app);
	console.log("Port:", config.SERVER_PORT)
	server.listen(config.SERVER_PORT);

	//let r = await models.models.Guests.getAll();
	//console.log(r);

	// npx prisma init --datasource-provider sqlite --output ../generated/prisma
	// npx prisma generate
	// npx prisma migrate dev --name init
}

async function buildApp() {
	const app = express();
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	/*app.use((err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		logger.error(__filename, err);

		res.status(err.status || 500).json({
			message: err.message,
			errors: err.errors,
		});
	});*/

	return app;
}

main().then(async () => {
	await prisma.$disconnect();
}).catch(async (e) => {
	console.error(e)
	await prisma.$disconnect();
	process.exit(1);
});