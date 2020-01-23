import axios from "axios";
import "./mock.js";
const mockUrl = 'https://easy-mock.com';

export function home() {
    return axios({
        method: "get",
        url: `${process.env.ROOT_URL}/home/list`
    })
}
export function mockTest() {

    
    return axios({
        method: "get",
        url: `${mockUrl}/mock/5e28fc699ac87461cb753414/example/mock`
    })
}