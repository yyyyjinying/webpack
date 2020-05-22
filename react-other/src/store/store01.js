/* eslint-disable no-unused-vars */
import {observable} from 'mobx';

class Store01 {
    @observable todo = [{
        name: "zhaojinying"
    }];
}

export default new Store01();