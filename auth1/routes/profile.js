const express = require('express');
const { remove } = require('../module/module');
const router = express.Router()

router.get('/:username',async function (req, res) {
    try {
        const user = await DbSchema.findOne({ username: req.params.username })
        if (!user) {
            return res.redirect('/login')
        }
        res.render("profile", { user })
        console.log(user);
    } catch (error) {
        return res.render('login', { msg: "something went wrong" })
    }

})

// router.get('/logout', function(req, res){
//     if(req.session.user && req.cookies.user_sid){
//         res.clearCookie('user_sid')
//         res.redirect('/')
//     }else{
//       res.redirect('/login')  
//     }  
// })

// router.post('/', function(req, res){


/////////////////////////////////remove/////////////////////////////////////////////////
router.delete('/delete/:username', async (req, res) => {
    try {
        await DbSchema.findOneAndDelete({username:req.params.username})
        return res.redirect("/login")
    } catch (error) {
        if (error) {
            return console.log('sory problem on deletin your user name:' + error)
        }
    }

})






module.exports = router