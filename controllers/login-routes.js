const router = require('express').Router();
const { User } = require('../models');
const { withAuth } = require('../utils/auth')

// POST /user/login
router.post('/login', (req, res) => {
  // expects {"email": "email@email.com", "password": "asdf"}
  User.findOne({ where: { email: req.body.email } })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: 'There is no user with that email' });
        return;
      }

      const validPassword = dbUser.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password' });
      }

      req.session.save(() => {
        req.session.user_id = dbUser.id;
        req.session.email = dbUser.email;
        req.session.is_admin = dbUser.is_admin;
        req.session.loggedIn = true;

        res.json({ user: dbUser, message: 'You are now logged in!' });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /user/login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login-view');
});

// POST /user/logout
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//sign up page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  res.render('signup')
})

module.exports = router;
