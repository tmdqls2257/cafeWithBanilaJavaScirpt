export default class PubSub {
  constructor() {
    this.events = {}
  }

  // subscibe 메서드
  subscribe(event, callback) {
    let self = this

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = []
    }

    return self.events[event].push(callback)
  }

  // publish 메서드
  publish(event, data = {}) {
    let self = this

    if (!self.events.hasOwnProperty(event)) {
      return []
    }

    return self.events[event].map(callback => callback(data))
  }
}
