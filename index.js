var express = require('express');
const { body, param, query } = require('express-validator')
const productController = require('../Controllers/productController')
var router = express.Router();

/* GET home page. */


router.route('/products/:id?')
  .get(productController.GetAllTodo)
  .post([
    // body('id').isInt({min:1}).withMessage('id should be integer'),
    body('name').isAlpha().withMessage('name should be string')
      .isLength({ max: 10 }).withMessage('name should be less than 10 characters'),
    body('description').isAlpha().withMessage('description should be string')
      .isLength({ max: 100 }).withMessage('description should be less than 100 characters'),
    body('category').isAlpha().withMessage('category should be string')
      .isLength({ max: 10 }).withMessage('category should be less than 10 characters'),
    body('price').isInt().withMessage('price should be integer'),
    body('size').isArray().withMessage('Size is Required')

    // body('email').isEmail().withMessage('should be email address'),
    // body('age').optional().withMessage('age should be optional').isInt()

  ], productController.AddTodo)
  .put([
    // body('id').isInt({min:1}).withMessage('id should be integer'),
    body('name').isAlpha().withMessage('name should be string')
      .isLength({ max: 10 }).withMessage('name should be less than 10 characters'),
    body('description').isAlpha().withMessage('description should be string')
      .isLength({ max: 100 }).withMessage('description should be less than 100 characters'),
    body('category').isAlpha().withMessage('category should be string')
      .isLength({ max: 10 }).withMessage('category should be less than 10 characters'),
    body('price').isInt({ min: 1 }).withMessage('price should be integer')
  ], productController.UpdateTodo)

  .delete(productController.DeleteTodo)
router.route('/addproduct')



























// router.get('/todo',async function(req, res, next) {
//   let todo = await Todo.find()
//   res.render('index', { todo });
//   // res.send('okkkk')
// })
// router.get("/todo/:id",(req, res)=>{
//   const id = req.params.id;
//   Todo.find({_id:id}).then((data)=>{
//     res.json(data);
//     Archive.insertMany(data)
//   })
// })
// router.post('/todo',(req,res,next)=>{
//   let todo = new Todo({
//     name: req.body.name
//   })
//   todo.save().then((data) =>{
//     res.status(200).json({message:'added',data})
//     // res.redirect('/todo')
//     console.log('created')
//   }).catch((error) => {
//     next(error)
//   })
// })
// router.put("/todo/:id",(req,res)=>{

//   Todo.findOneAndUpdate({_id:req.params.id},req.body)
//   .then((data) => {
//     res.redirect("/todo")
//   }).catch((error) => {
//     res.send(error)
//   })
// })
// router.delete("/todo/:id", (req, res) => {
//   console.log("delete...............")
//   // let  productId = 'ObjectId("'+req.params.id+'")';
//   Todo.findOneAndDelete({ _id: req.params.id })
//     .then((data) => {
//       console.log(data)
//       res.redirect("/todo");
//     })
//     .catch((err) => {
//       res.send(err);
//     });
//   }
// )

// router.get('/archive',async function(req, res, next) {

//   Archive.findOne().then((data) => {
//     res.json(data);
//   }).catch((err) => {console.log(err)});
// })

// router.post('/archive',(req,res,next)=>{
//   let archive = new Archive({
//     name: req.body.name
//   })
//   archive.save().then((data) =>{
//     res.status(200).json({message:'added',data})
//     // res.redirect('/todo')
//     console.log('created')
//   }).catch((error) => {
//     next(error)
//   })
// })





module.exports = router;
