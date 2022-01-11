const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const config = require ('./config/config')
const path = require ('path')
const register = require ('./routes/register')
const login = require ('./routes/login')
const profile = require ('./routes/profile')
const port = 5000

mongoose.connect(config.db)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')



app.use(express.json())
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extended: false}))

app.use('/register', register)
app.use('/login' , login)
app.use('/profile', profile)

app.get('/',function(req,res){
    res.send(true)
})



app.listen(port , ()=>{console.log('listening on port' , `${port}`)})