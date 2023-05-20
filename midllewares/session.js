const { verifyToken } = require("../services/authServise");

module.exports = ()=>  (req, res, next) => {
    const token =  req.cookies.token;
  
    //console.log('session token '+ token);
    
    if (token) {
        try {
            const userData =  verifyToken(token);
          // console.log('userdata '+ userData);

            req.user = userData;
           // console.log('req.user '+req.user);

            res.locals.user = userData.email;
            //console.log('res '+userData.username);

        } catch (err) {
            res.clearCookie("token");
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}