const router = require('express').Router();

router.get('/', (req, res) => {
    const user = req.cookies.token;

    res.render('home', {
        title: "Home page",
        user
    });
});

module.exports = router;