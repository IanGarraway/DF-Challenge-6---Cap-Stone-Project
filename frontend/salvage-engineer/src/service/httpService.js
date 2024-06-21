import axios from 'axios'

const httpService = {
    post: (url, data, config) => axios.post(url, data, config),
    postNew: (url, data, config) => axios.post(url, data),
    get: (url, config) => axios.get(url, config),
    patch: (url, data, config) => axios.patch(url, data, config)    
};

export default httpService;