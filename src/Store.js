export class Store {
    constructor() {
        this.state = ({})
    }

    logState () {
        console.log(this.state)
    }

    getState () {
        return this.state
    }

    updateState (obj) {
        this.state = [{
            ...this.state,
            obj
        }]
    }
}