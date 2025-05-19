import axios, {isCancel, AxiosError} from "axios";

export async function getAllGuests() {
	return await axios.get("http://localhost:10350/guests");
}