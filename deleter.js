const myfunc2 = (mytemp, fetchstr, doer) => {
  const delay = 6000
  let ids = []
  mytemp.forEach(a => {
    ids = ids.concat(a.map(x => {
      return { id: x[0].id, channel_id: x[0].channel_id }
    }))
  })
  // eslint-disable-next-line no-eval
  const ary = ids.map(id => () => eval(fetchstr.replace('DUMMYMSG', id.id).replace('DUMMYCHAN', id.channel_id)))
  // eslint-disable-next-line no-var
  for (var i = 0; i < ary.length; i++) {
    setTimeout(ary[i], i * delay)
  }
  setTimeout(() => doer(), i * delay)
}

// eslint-disable-next-line no-unused-vars
const buildlist = (getlist, myfunc2, fetchstr) => {
  const doer = () => {
    // eslint-disable-next-line no-eval
    eval(getlist).then((data) => data.json().then(j => {
      if (j.messages && j.messages.length > 0) {
        myfunc2([j.messages], fetchstr, doer)
      } else {
        console.log('no more messages')
      }
    }
    ))
  }
  doer()
}
