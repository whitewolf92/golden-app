import axios from "axios"; // use later

const API_BASE_URL = "/";

const superagent = axios.create({
	baseURL: API_BASE_URL,
	timeout: 20000
});

const Golden = {
	getData: () => superagent.get(`data/data.json`)
};

const apiAgent = {
	Golden
};

export default apiAgent;
