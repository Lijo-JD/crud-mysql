var dataRouter = require('express').Router()
var bodyparser = require('body-parser')
var con = require('./db')


dataRouter.use(bodyparser.json())

dataRouter.get("/data", (req, res) => {
    con.query("select * from data_table",
        function(err, result, fields) {
            if (err) {
                console.log(" something wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
})

dataRouter.get("/data/:id", (req, res) => {
    con.query("select * from data_table where id = ?", [req.params.id],
        function(err, result, fields) {
            if (err) {
                console.log(" something wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
})

dataRouter.post("/data", (req, res) => {
    params = req.body
    con.beginTransaction()
    con.query("insert into data_table ( fname, lname, email, phone) values ( ?, ?, ?, ?) ", [params.fname, params.lname, params.email, params.phone],
        function(err, result, fields) {
            if (err) {
                console.log(" something wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
    con.commit()
})

dataRouter.put("/data/:id", (req, res) => {
    params = req.body
    userid = parseInt(req.params.id)
    con.beginTransaction()
    con.query("update data_table set fname = ? , lname = ?, email = ? , phone = ? where id = ? ", [params.fname, params.lname, params.email, params.phone, userid],
        function(err, result, fields) {
            if (err) {
                console.log(" something wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
    con.commit()
})

dataRouter.delete("/data/:id", (req, res) => {
    con.query("delete from data_table where id = ?", [req.params.id],
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
})

module.exports = dataRouter
