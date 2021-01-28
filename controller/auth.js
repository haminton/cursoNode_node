'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    });

    user.save((err) => {
        if(err) return res.state(500).send({ messae: `Error creando el usuario ${err}`});
        
        return res.state(200).send({ token: service.createToken(user) });
    })
}

function signIn(req, res) {
    
}

module.exports = {
    signUp,
    signIn
}