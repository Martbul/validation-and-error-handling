const express = require('express')

const app = express()
const PORT = 5050

const {isNameValid, isPasswordValid} = require('./utils/validator')
const {isPasswordValidLength} = require('./middalwares/middaware')
const isStrongPassword = require('validator/lib/isStrongPassword')
const {body,validationResult} = require('express-validator')




app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send(`
    <form method="POST">
 <label for="name">Name</label>
 <input type="name" name="name" id="name"/>

 <label for="password">Password</label>
 <input type="password" name="password" id="password"/>

 <input type="submit" name="value"/>
</form>

    `)
})

 
const bodyValidatePassword = body('password').isLength({min:4, max:15}).withMessage('invalid password from express-validator')

app.post('/',bodyValidatePassword,(req,res)=>{
    const {name, password} = req.body
    console.log(name,password);

    const errors = validationResult(req)
    console.log(errors);




    if(!isNameValid(name)){
        res.status(404).send('invalid name!!!')
        return;
    }
    
    // if(!isPasswordValid(password)){
    //     res.status(404).send('invalid password');
    //     return;
    // }

    // if(!isStrongPassword(password)){
    //     res.status(404).send('week password')
    //     return;
    // }

    if(errors.length > 0){
        res.send('error msg: nz neshto se schupi')
        return;
    }
    res.send('ok')
})
app.listen(PORT,()=> console.log(`server is listening on port: ${PORT}`))