// import PubSub from '../lib/pubsub.js'

export default class Store {
  constructor() {
    let self = this

    self.actions = {}
    self.mutations = {}
    self.state = {}
  }

  dispatch(actionKey, payload) {
    let self = this

    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`)
      return false
    }

    console.groupCollapsed(`ACTION: ${actionKey}`)

    self.status = 'action'
    self.actions[actionKey](self, payload)
    console.log(self.actions[actionKey])
    console.groupEnd()

    return true
  }

  //   useselector(actionKey){

  //   }
}
