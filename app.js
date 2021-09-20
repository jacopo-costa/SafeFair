// Imports
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./db");

// Errors visualizer
app.use(function (err, req, res, next) {
  console.log(err);
});

// EJS
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Express body parser
app.use(express.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/fiera", require("./routes/fiera"));
app.use("/user", require("./routes/user"));
app.use("/dashboard", require("./routes/dashboard"));

// Handler contatti
app.get("/contatti", (req,res) => {
  res.render("contatti");
})

// Porta
const port = process.env.PORT || 3000;

// Ascolta sulla porta
app.listen(port, console.info(`Ascolto su porta ${port}`));
