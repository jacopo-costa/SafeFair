const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { nome, email, password, password2, posizione } = req.body;
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
        const exist = User.getUser({ email });
        if(!exist){
            errors.push({ msg: 'Utente già presente' });
            res.render('register', {
                errors,
                nome,
                email,
                password,
                password2,
                posizione
            });
        }
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email già registrata' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

module.exports = router;