import axios from "axios";

const TOKEN = "cflip21r01qqm9m4guv0cflip21r01qqm9m4guvg";

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
})