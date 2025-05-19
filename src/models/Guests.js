class Guests {
	static #dbClient;

	static init(prismaClient) {
		Guests.#dbClient = prismaClient;
	}

	static async existsInDB(id) {
		let guest = await Guests.getOne(id);
		return guest !== null;
	}

	static async getAll() {
		let guests = await Guests.#dbClient.guest.findMany();
		return guests;
	}

	static async getOne(id) {
		let guest = await Guests.#dbClient.guest.findFirst({
			where: {
				ID: id
			}
		});
		return guest;
	}

	static async create(guestData) {
		await Guests.#dbClient.guest.create({
			data: guestData
		});
	}

	static async deleteOne(id) {
		await Guests.#dbClient.guest.delete({
			where: {
				ID: id
			}
		});
	}

	static async update(id, guestData) {
		await Guests.#dbClient.guest.update({
			where: {
				ID: id
			},
			data: guestData
		});
	}
}

export default Guests;