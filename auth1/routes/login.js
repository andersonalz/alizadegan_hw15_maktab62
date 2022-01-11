const { reduceRight } = require('async');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const DbSchema = require('../module/module')
const config = require('../config/config')

router.get('/', function (req, res) {
    res.render('login' , {msg : null})
})

router.post('/', async function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.render("login", { msg: "fill Complate" })
    }

    try {
        const user = await DbSchema.findOne({ username: req.body.username.trim(), password: req.body.password }) 
        if (!user) {
            res.render("login", { msg: "username or password is incorrect" })
        }
        console.log(user);
    } catch (error) {
        return res.render('login', { msg: "username or password is wrong" })
    }
    res.redirect(`/profile/${req.body.username}`)
})

module.exports = router