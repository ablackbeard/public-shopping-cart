class Visits {
	static #dbClient;

	static init(prismaClient) {
		Visits.#dbClient = prismaClient;
	}

	static async existsInDB(id) {
		let visit = await Visits.getOne(id);
		return visit !== null;
	}

	static async getAll() {
		let visits = await Visits.#dbClient.visit.findMany();
		return visits;
	}

	static async getOne(id) {
		let visit = await Visits.#dbClient.visit.findFirst({
			where: {
				BNMID: id
			}
		});
		return visit;
	}

	static async create(visitData) {
		await Visits.#dbClient.visit.create({
			data: visitData
		});
	}

	static async deleteOne(id) {
		await Visits.#dbClient.visit.delete({
			where: {
				BNMID: id
			}
		});
	}

	static async update(id, visitData) {
		await Visits.#dbClient.visit.update({
			where: {
				BNMID: id
			},
			data: visitData
		});
	}
}

export default Visits;