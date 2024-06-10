require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);






const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname, 'Images'))
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })






//PORT
let port = process.env.PORT
mongoose.connect(process.env.DB)
  .then(() => {
    app.listen(port, () => {
      console.log(`I am Listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.log('DB Problem ' + error)
  })



//WE USE THIS MIDDLEWARE TO ALLOW ANY ONE TO REQUEST OUR END POINTS AND DEFINE METHODS  
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', "*");
  response.header('Access-Control-Allow-Method', "GET,POST,DELETE,PUT,OPTIONS");
  response.header('Access-Control-Allow-Headers', "Content-type,Authorization");
  next()
})


//-------
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(multer({ storage, fileFilter }).single('image'))
app.use('/Images', express.static(path.join(__dirname, 'Images')))
app.use(express.static(path.join(__dirname, 'public')));
//-------
const productController = require('./Controllers/productController')
app.post("/addproduct", upload.single('image'), (['name', 'description', 'category', 'price', 'sizeOptionOne', 'sizeOptionTwo', 'sizeOptionThree'], productController.AddTodo), (req, res) => {
})



// .post([
//   body('name').isString().withMessage('name should be string'),
//   body('description').isString().withMessage('description should be string'),
//   body('category').isString().withMessage('category should be string')
//     .isLength({ max: 10 }).withMessage('category should be less than 10 characters'),
//   body('price').isInt({ min: 1 }).withMessage('price should be integer'),
//   body('sizeOptionOne').isString().withMessage('sizeOption1 Required'),
//   body('sizeOptionTwo').isString().withMessage('sizeOption3 Required'),
//   body('sizeOptionThree').isString().withMessage('sizeOption3 Required')
// ])











const product = require('./routes/productRoute')
const contact = require('./routes/contactRouter')
const cartorder = require('./routes/cartRouter')
const signrouter = require('./routes/signRouter')
const loginrouter = require('./routes/loginRouter')
// Routes
app.use(product)
app.use(contact)
app.use(cartorder)
app.use(signrouter)
app.use(loginrouter)
//-------
// app.use(indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
