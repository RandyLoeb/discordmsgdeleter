var myfunc2 = (mytemp,fetchstr,doer) => {
	let delay=6000
    let ids=[]
	mytemp.forEach(a=>{
		ids=ids.concat(a.map(x=>{
			return {"id": x[0].id, "channel_id": x[0].channel_id}
		}))
	})
	let ary = ids.map(id=>()=>eval(fetchstr.replace("DUMMYMSG",id.id).replace("DUMMYCHAN",id.channel_id)))
	for (var i=0; i<ary.length; i++) {
		setTimeout(ary[i], i * delay)
	}
	setTimeout(()=>doer(), i*delay)
	
}

var buildlist = (getlist, myfunc2,fetchstr) => {
	var doer = () => {
		eval(getlist).then((data)=>data.json().then(j=>{
			if (j.messages && j.messages.length>0) {
				myfunc2([j.messages],fetchstr,doer)
			} else { 
				console.log('no more messages')
				
			} 
		}
	))
	}
	doer()
}