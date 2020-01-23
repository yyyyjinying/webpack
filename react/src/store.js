import axios from "axios";

export function home() {
    return axios({
        method: "get",
        url: `${process.env.ROOT_URL}/home/list`
    })
}