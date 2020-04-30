var API_KEY = 1234

var express = require('express')
var router = express.Router()
var moment = require('moment')

//GET
router.get('/', function (req, res, next) {
    res.send('Hello World')
})

//=====================================
// User Table
// GET / POST
//=====================================
router.get('/user', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid 
        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT userPhone, name, address, fbid from User where fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Não possui registros" }))
                        }
                    }
                })
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "FBID não encontrado na requisição" }))
        }
    } else {
        res.send(JSON.stringify({success: false, message: "Token API errado"}))
    }
})

router.post('/user', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var user_phone = req.body.userPhone
        var user_name = req.body.userName
        var user_address = req.body.userAddress

        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('insert into User (FBID, UserPhone, Name, Address) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE Name=?, Address=?', [fbid, user_phone, user_name, user_address, user_name, user_address], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Sucesso" }))
                        } 
                    }
                })
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "FBID não encontrado na requisição" }))
        }
    } else {
        res.send(JSON.stringify({ success: false, message: "Token API errado" }))
    }
})

//=====================================
// User Table
// GET / POST
//=====================================
router.get('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid
        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('SELECT fbid, foodId, restaurantId, restaurantName, foodName, foodImage, price FROM Favorite where fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        } else {
                            res.send(JSON.stringify({ success: false, message: "Não possui registros" }))
                        }
                    }
                })
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "FBID não encontrado na requisição" }))
        }
    } else {
        res.send(JSON.stringify({ success: false, message: "Token API errado" }))
    }
})

router.post('/favorite', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var restaurant_name = req.body.restaurantName
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.price



        if (fbid != null) {
            req.getConnection(function (error, conn) {
                conn.query('insert into Favorite (FBID, FoodId, RestaurantId, RestaurantName, FoodName, FoodImage, Price) VALUES (?,?,?,?,?,?,?)',
                    [fbid, food_id, restaurant_id, restaurant_name, food_name, food_image, price], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    } else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Sucesso" }))
                        }
                    }
                })
            })
        } else {
            res.send(JSON.stringify({ success: false, message: "FBID não encontrado na requisição" }))
        }
    } else {
        res.send(JSON.stringify({ success: false, message: "Token API errado" }))
    }
})

module.exports = router