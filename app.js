const express = require('express')
const ejs = require('ejs')
const multer = require('multer')
const path = require('path')

const app = express()
const port = process.env.port || 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myuploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

const upload = multer({ 
    storage: storage,
    
}).single('profilepic')

app.set('view engine','ejs');

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index',{
        name: req.filename,
    });
})

app.post('/upload',(req,res)=>{
    upload(req, res, (error)=>{
        if(error){
            res.render('index')
        }else{
            res.render('index', {
                message: 'Successfully uploaded',
                filename: `myuploads/${req.file.filename}`,
            })
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})