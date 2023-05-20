function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
}

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

module.exports = {
    hasUser,
    isGuest
}