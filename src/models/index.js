import Guests from "./Guests.js";
import Visits from "./Visits.js";

const models = {
	Guests,
	Visits
};

export { models as models };
export function init(prismaClient) {
	for (let name in models) {
		let model = models[name];
		model.init(prismaClient);
	}
}
