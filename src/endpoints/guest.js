module.exports = (app, models) => {
	const Guests = models.Guests;

	app.get("/guests/:id", async (request, response) => {
		let id = request.params.id;
		let guest = await Guests.getOne(id);
		if (guest !== null) {
			response.status(200).json(guest);
		} else {
			response.status(200).send("Guest not found");
		}
		console.log("GET", guest, id);
	});

	app.post("/guests", async (request, response) => {
		let guestData = request.body;
		let guest = await Guests.create(guestData);
		console.log("Create", guest)
		let resourceUri = `${request.originalUri}/${guest.BNMID}`;
		response.status(201).location(resourceUri).json(guest);
	});

	app.delete("/guests/:id", async (request, response) => {
		let guestId = request.params.id;
		let deleted = await Guests.deleteOne(guestId);
		console.log(deleted)
	});

	app.get("/guests", async (request, response) => {
		let guests = await Guests.getAll();
		response.status(200).json(guests);
	});

	app.put("/guests/:id", async (request, response) => {
		let id = request.params.id;
		let guestData = request.body;
		if (await Guests.existsInDB(id)) {
			let guest = await Guests.update(id, guestData);
			console.log("Updated", guest);
		} else {
			console.log("Guest doesn't exist", id, guestData);
		}
	});
}

/*
{
	BNMID: "123456",
	Resident: false,
	GradYear: 2020,
	Grad: "U",
	YearIssued: 2020
}
*/