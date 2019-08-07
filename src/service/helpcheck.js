const Express = require("express");
const mongoose = require('mongoose');
const app = Express();

app.get('/healtcheck', (re, res) => {
    if (process.env.STATUS === 'UNAVAILABLE'){
    res.status(500).json({
        ok: false,
        message: process.env.STATUS
    })
    }else{
        res.json({
            ok: true,
            message: process.env.STATUS
        })
    }
});


module.exports = app;