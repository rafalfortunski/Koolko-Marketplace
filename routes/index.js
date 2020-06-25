const express = require("express");
const router = express.Router();
const passport = require("passport");
const local = require("passport-local");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
let User = require("../models/user");
let Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const { checkUser } = require("../config/checkUser");

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

// Integrates the body of "home.hbs" inside the defaultLayout "main.hbs"
// Get home page
/* router.get('/', (req, res, next) => {
    if(req.isAuthenticated()) {
        res.render('home', {title: 'Koolko - Strona główna'});
    }
    else {res.render('home', {title: 'Koolko - Strona główna'});}
    // Integrates the body of "home.hbs" inside the defaultLayout "main.hbs"

});
 */
// Try to handle user data from other function
router.get("/", (req, res) => {
  res.render("home", { title: "Koolko - Strona główna" });
});

router.get("/sell", (req, res) => {
  res.render("seller-landing-page", { title: "Zacznij sprzedawać" });
});

router.get("/start-selling", ensureAuthenticated, (req, res) => {
  res.render("seller-new", { title: "" });
});

// router.post('/start-selling', ensureAuthenticated, (req, res, next) => {
//     const { seller_name } = req.body;
//     const newSeller = new Seller({
//     seller_name: seller_name
//     });
//     User.findOneAndUpdate(
//         {'_id' : req.user.id},
//         {
//           $set: { 'seller': newSeller }
//         },
//         {'new': true}
//       )
//       //.then(user => User.populate(user.seller))
//       .then(user => res.send(user))      // also populated
//       .catch(err => console.error(err))
//     res.redirect('/');
// });

router.post("/start-selling", ensureAuthenticated, (req, res, next) => {
  User.findOneAndUpdate("_id", req.user._id, function (err, user) {
    if (err) next(err);
    else {
      Seller.findOne({}).then((seller) => {
        if (seller) {
          errors.push({ msg: "Podany sprzedawca już istnieje" });
          res.render("/start-selling", {
            errors,
            seller_name,
            company_name,
            street,
            postal_code,
            city,
            country,
          });
        } else {
          const newSeller = new Seller({
            seller_name: req.body.seller_name,
            company_name: req.body.company_name,
            street: req.body.street,
            postal_code: req.body.postal_code,
            city: req.body.city,
            country: req.body.country,
            _user: user.id
          });
          newSeller.save();
          console.log(this.user);
          return newSeller;
        }
      });
    }
  });
});

// Register Page
router.get("/register", forwardAuthenticated, csrfProtection, (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

// Register handle
router.post("/register", (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  //Check required fields
  if (!email || !password || !password2) {
    errors.push({ msg: "Uzupełnij wszystkie pola." });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Hasła różnią się od siebie." });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Hasło musi mieć conajmniej 6 znaków." });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      password,
      password2,
    });
  } else {
    // User validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Konto na podany email jest już zarejestrowane." });
        res.render("register", {
          errors,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          email,
          password,
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then((user) => {
                res.redirect("login");
              })
              .catch((err) => console.log());
          })
        );
      }
    });
  }
});

router.get("/login", forwardAuthenticated, (req, res, next) => {
  res.render("login");
});

// Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success-msg", "Zostałeś wylogowany");
  res.redirect("/");
});

module.exports = router;
