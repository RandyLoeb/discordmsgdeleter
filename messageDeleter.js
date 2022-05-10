class MessageDeleter {
  _deleteFetchString = ''
  _getListFetchString = ''
  _delay = 0
  _keepGoing = true
  _pending = []
  constructor (deleteFetchString, getListFetchString, delay = 6000) {
    this._deleteFetchString = deleteFetchString
    this._getListFetchString = getListFetchString
    this._delay = delay
  }

  doer = () => {
	  if (this._keepGoing) {
      // eslint-disable-next-line no-eval
      eval(this._getListFetchString).then((data) => data.json().then(j => {
        if (j.messages && j.messages.length > 0) {
          this.doDeletes([j.messages])
        } else {
          console.log('no more messages')
        }
      }))
    } else {
      console.log('no more fetching')
    }
  }

  doDeletes = (msgArys) => {
    let ids = []
    msgArys.forEach(a => {
      ids = ids.concat(a.map(x => {
        return { id: x[0].id, channel_id: x[0].channel_id }
      }))
    })
    // eslint-disable-next-line no-eval
    const ary = ids.map(id => () => eval(this._deleteFetchString.replace('DUMMYMSG', id.id).replace('DUMMYCHAN', id.channel_id)))
    this._pending = []
    for (var i = 0; i < ary.length; i++) {
      this._pending.push(setTimeout(ary[i], i * this._delay))
    }
    this._pending.push(setTimeout(() => this.doer(), i * this._delay))
  }

  start = () => {
	  this._keepGoing=true
    this.doer()
  }

  changeDelay = (delay) {
	  this._delay = delay
  }

  stop = () => {
    this._keepGoing = false
    this._pending.forEach(handle=>{
      clearTimeout(handle)
    })
  }
}
