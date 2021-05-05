var jwt=require('jsonwebtoken')
let generateAuthToken=async function(id) {
    let token=jwt.sign({_id:id.toString()},'lifeseversmobileclinic')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
module.exports=generateAuthToken