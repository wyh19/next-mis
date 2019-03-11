import { observable, action } from 'mobx'

class AuthStore {
    @observable userInfo: object

    constructor() {
        this.userInfo = {}
    }

    @action login = () => {

    }
}

const authStore = new AuthStore()
export { authStore }