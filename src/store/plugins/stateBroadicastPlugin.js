import { PERSISTED_STATE_KEY } from './persistedStatePlugin'

let channel
let stateBroadcastChannel = () => {}

/* 
  This plugin synchronizes the pingStore between the browser tabs

  As window.BroadcastChannel is not compatible with some older browsers, it's
  only enabled when this feature exists.
*/

if (window.BroadcastChannel) {
  channel = new BroadcastChannel('sitewatcher')

  stateBroadcastChannel = store => {
    channel.onmessage = message => {
      if (message.data === 'PING_HISTORY_UPDATED') {
        const json = localStorage.getItem(PERSISTED_STATE_KEY)

        if (json) {
          const data = JSON.parse(json)

          if (data.pingHistory) {
            store.state.pingHistory = data.pingHistory
          }
        }
      }
    }

    store.subscribe(mutation => {
      if (
        mutation.type === 'SET_PING_RESULT' ||
        mutation.type === 'RESET_PING_HISTORY'
      ) {
        channel.postMessage('PING_HISTORY_UPDATED')
      }
    })
  }
}

export default stateBroadcastChannel
