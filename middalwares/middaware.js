exports.isPasswordValidLength = (req,res,next)=>{
    if(!req.body.password || req.body.password.length < 5){

        res.status(401).send('invalid password from middleware')
        return
        next()
    }
}