import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3001/";

const getSuperheroData = async (name) => {
    try {
        const response = await axios.get(`/superhero/${name}`);
        const superheroData = response.data;
        return superheroData;
    } catch (error) {
        console.error(error);
    }
};

export default getSuperheroData;