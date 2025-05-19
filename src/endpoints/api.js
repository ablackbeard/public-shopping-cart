const { API_VERSION } = require("../config.js");

module.exports = (app) => {
	console.log(app)
	app.get("/version", async (request, response) => {
		response.status(200).send(API_VERSION);
	});
}