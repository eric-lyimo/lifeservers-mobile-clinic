var express = require('express');
const blogController = require('../controllers/blog');
const blog = require('../src/models/blog');
var router = express.Router();
var multer=require('multer')
var Path=require('path')
var auth=require('../src/auth/auth')

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime().toString()+'-'+file.fieldname+Path.extname(file.originalname))
    }
})

const upload = multer({
    limits: {
        fileSize: 6000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }  
        cb(undefined, true)
    }
})

router.use(express.json());
router.use(express.urlencoded());

router.get('',blogController.blogs)
router.get('/add-blog',auth,blogController.addBlog)
router.get('/plaza',auth,blogController.plaza)
router.get('/login',blogController.login)
router.get('/blog-details',blogController.blog_details)
router.get('/logout',blogController.logout)

router.post('/add-blog',auth,upload.single('blog_img'),blogController.add_blog)
router.post('/login',blogController.logging)
router.post('/post-message',blogController.postMssg)
router.post('/comments',blogController.comments)
module.exports = router;
