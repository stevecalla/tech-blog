const withAuth = (req, res, next) => {

  // console.log(req, req.session, req.session.loggedIn);

  console.log(req.session, req.session.loggedIn);
  console.log('hello middleware')
  
  // TODO: If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  }
  // TODO: If the user is logged in, allow them to view the paintings
  else {
    next();
  }
};

module.exports = withAuth;
