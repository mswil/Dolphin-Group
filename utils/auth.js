const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.status(401).json({ message: 'User not logged in' });
    res.redirect('/user/login');
  } else {
    next();
  }
};

const withAuthApi = (req, res, next) => {
  console.log(req.session.user_id)
  if (!req.session.user_id) {
    res.status(401).json({ message: 'User not logged in' });
  } else {
    next();
  }
};

const withAdmin = (req, res, next) => {
  if (!req.session.is_admin) {
    res.status(401).json({ message: `User doesn't have permission` });
    res.redirect('/');
  } else {
    next();
  }
};

const withAdminApi = (req, res, next) => {
  if (!req.session.is_admin) {
    res.status(401).json({ message: `User doesn't have permission` });
  } else {
    next();
  }
};

module.exports = { withAuth, withAdmin, withAuthApi, withAdminApi };
