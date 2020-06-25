module.exports = {
    checkUser: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.email = req.user
            console.log(email)
        }
    return next()
}}