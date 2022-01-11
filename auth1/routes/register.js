const { reduceRight } = require('async');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const DbSchema = require('../module/module')
const config = require('../config/config')
const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


router.get('/', function (req, res) {
    res.render('authentication', { msg: null })
})

router.post('/', async function (req, res) {

    if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname) {
        // return res.status(406).json({ msg: "bad request" })
        return res.render('authentication', { msg: "fill all filed" })
    }

    if (!pass.test(req.body.password)) {
        console.log(req.body.password)
        return res.render('authentication', { msg: "The password has Aa and more than 8 characters" })
    }

    if (req.body.username.length < 2) {
        return res.render('authentication', { msg: "firstname and lastname more than 2 characters" })
    }

    if ((req.body.firstname.length || req.body.lastname.length) > 30) {
        return res.render('authentication', { msg: "firstname and lastname less than 30 characters" })
    }

    if ((req.body.firstname.length || req.body.lastname.length) < 2) {
        return res.render('authentication', { msg: "firstname and lastname more than 2 characters" })
    }
    let massage = ""


    try {
        massage = "find one"
        let user = await DbSchema.findOne({ username: req.body.username.trim() })
        if (user) {
            return res.render('authentication', { msg: "username already use2" })
        }
        massage = "create"
         user = await DbSchema.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            password: req.body.password
        })
        console.log(user)
    } catch (err) {
        console.log(err);
        return res.render('authentication', { msg: `error in  ${massage}` })
    }



    // try {
        
    // } catch (err) {
    //     console.log(err);
    //     return res.render('authentication', { msg: "username already use" })
    // }

    res.render("login")

})

module.exports = router