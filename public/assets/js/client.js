
var socket=io()

//elements
let $smslocation=document.querySelector('#sms')

//templates
let incomingMsg=document.querySelector('#incomingMsg').innerHTML
let outGoingMsg=document.querySelector('#outGoingMsg').innerHTML

socket.on('messages',(msg)=>{
   const html=Mustache.render(incomingMsg,{ msg})
   $smslocation.insertAdjacentHTML('beforeend',html)
})


document.querySelector('#send').addEventListener("click",(e)=>{
   e.preventDefault()
   const message=document.querySelector("#message").value
    if(message !=''){
         const html=Mustache.render(outGoingMsg,{message})
         $smslocation.insertAdjacentHTML('beforeend',html)
    
   socket.emit('sendMsg',message)
   document.querySelector('#message').value=''
    }

})   