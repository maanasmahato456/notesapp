const express = require('express');
const { Auth } = require('../models/authmodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { fetchuser } = require('../fetchuser/fetchuser');
const jwt_secret = 'AFORAPPLEBFORBALL';

const router = express.Router();

// this route adds new users.
router.post('/adduser', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        success = false;
        return res.status(401).send({ success, error: 'credentials not filled!' })
    }

    try {
        const userExist = await Auth.findOne({ email });
        if (userExist) {
            success = false;
            return res.status(401).send({ success, error: 'User already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const user = new Auth({
            name: name,
            email: email,
            password: secPass
        })

        await user.save();
        success = true;
        res.json({ success, user });

    } catch (error) {
        console.log(error.message, "add user router error!");
    }
})

// this route lets a user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        success = false;
        return res.status(401).send({ success, error: 'credentials not filled!' })
    }

    try {
        const user = await Auth.findOne({ email });
        if (!user) {
            success = false;
            return res.status(401).send({ success, error: "user doesn't exist!" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(401).send({ success, error: "password not matched!" });
        }

        let data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authtoken = await jwt.sign(data, jwt_secret);
        res.status(201).send({ success, authtoken });


    } catch (error) {
        console.log(error, "login route error1");
    }

});

// get user data
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await Auth.findById(userID).select("-password");
        success = true;
        res.status(201).send({ success, user });
    } catch (error) {
        console.log(error, 'get user error!');
    }
})


module.exports = { routes: router };