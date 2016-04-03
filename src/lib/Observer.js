'use strict'

export default class Observer {
  constructor() { 
    this.handlers = []
  }

  subscribe(notifName, handler) {
    this.handlers.push({
      notifName, 
      handler
    })
  }

  on(notifName, handler) {
    this.subscribe(notifName, handler)
  }

  unsubscribe(notifName) {
    this.handlers = this.handlers.filter((item)=> {
      if (item.notifName !== notifName) {
        return item
      }
    })
  }

  off(notifName) {
    this.unsubscribe(notifName) 
  }

  fire(notifName, vo, thisObj) {
    let scope = thisObj || window
    this.handlers.forEach((item)=> {
      if (item.notifName == notifName)
        item.handler.call(scope, vo)
    })
  }
  
}