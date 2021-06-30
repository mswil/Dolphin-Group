const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login")
  } else {
    next()
  }
};

const withAdmin = (req, res, next) => {
  if (!req.session.is_admin) {
    res.redirect('/')
  }
  else {
    next()
  }
}

module.exports = { withAuth, withAdmin }