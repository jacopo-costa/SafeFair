const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load User model
const User = require('../models/user');
const userSchema = require('../models/userSchema');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard', (req, res) => res.send('Hello'));

// Register
router.post('/register', (req, res) => {

    var { nome, email, password, password2, posizione } = req.body;
    let errors = [];

    if (!nome || !email || !password || !password2 || !posizione) {
        errors.push({ msg: 'Per favore riempire tutti i campi (tag facoltativo)' })
    }

    if (password != password2) {
        errors.push({ msg: 'Le password sono diverse' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'La password deve essere di almeno 6 caratteri' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            nome,
            email,
            password,
            password2,
            posizione
        });
    } else {
        User.checkExist(email)
            .then(function () {

                var form = req.body;
                var tags = Object.keys(form).filter(key => form[key] === 'on' && key !== 'tipo').toString();
                var tipo;
                if (form.tipo === 'on') { tipo = 'SELLER' } else { tipo = 'GUEST' };

                const schema = new userSchema(req.body.nome, req.body.email, req.body.password, req.body.posizione, tipo, tags)
                User.saveUser(schema)
                    .then(function () {
                        req.flash('success_msg', 'Sei iscritto, ora puoi effettuare il login')
                        res.redirect('login');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            })

            .catch(function (errormsg) {

                errors.push({ msg: errormsg });
                res.render('register', {
                    errors,
                    nome,
                    email,
                    password,
                    password2,
                    posizione
                })

            });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logout completato');
    res.redirect('/users/login');
});

module.exports = router;