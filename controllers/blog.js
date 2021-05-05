var blog=require('../src/models/blog')
var User=require('../src/models/users')
var sharp=require('sharp')
var comment=require('../src/models/comments')
const comments = require('../src/models/comments')
const doctors = require('../src/models/doctor')

exports.blogs=(req,res)=>{
  blog.find((err,data)=>{
    if(err) return next(err)
  }).then((data)=>{
    blogList=data
    doctors.find((err,doc)=>{
      res.render('index',{
        blogList,
        doc
      })
    })
  }) 
}

exports.blog_details=(req,res)=>{
  blog.find({},null,{limit:5,sort:{date:-1}},(err,data)=>{
  if(err){ return next(err)} 
  }).then((data)=>{
    blogs=data
    comments.find({blog:req.query.id},null,{limit:10,sort:{date:-1}},(err,docs)=>{
      if(err){return next(err)}
    }).then((docs)=>{
    coment=docs
    var _Id=req.query.id
    blog.findById(_Id).populate('author').exec((err,blog)=>{
      res.render('blog-details',{
        coment,
        blogs,
        data: blog,
        comentLength:coment.length
      })
    })
  })
  })
}

exports.addBlog=(req,res)=>{
  res.render('admin/add-blog')
}
exports.login=(req,res)=>{
  res.render('admin/login')
}

exports.plaza=(req,res)=>{
  user=req.session.user
  console.log(user)
  res.render('index2',{user})
}

exports.logging=async(req,res)=>{
  try {
    let user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generateAuthToken()
    req.session.token=token
    if (user.role != 'admin'){
      return res.redirect('/plaza')
    }
    else if (user.role = 'admin'){
     return res.redirect('/admin')
   }
  } catch (e) {
    console.log(e)
  }
}
exports.postMssg=(req,res)=>{
  console.log(req.body)
}
exports.logout=async(req,res)=>{
  req.session.token=''
  req.session.destroy((err)=>{
    if(!err){
      res.redirect('/login')
    }
  })
}

exports.add_blog=async(req,res)=>{
  const buffer=await sharp(req.file.buffer).resize({width:1200,height:800}).png().toBuffer()
  const thumb=new Buffer.from(buffer).toString('base64')
    let data=new blog({
      title:req.body.title,
      blog_img:thumb,
      description:req.body.description,
      blog_category:req.body.blog_category,
      blog_tags:req.body.blog_tags,
      author:req.session.user._id,
      date:req.body.date,
    })
    data.save()
    res.redirect('')
}

exports.comments=async(req,res)=>{
   id=req.body.blog
  let newComment=new comment({
    name:req.body.name,
    comments:req.body.comments,
    blog:req.body.blog
  })
  newComment.save((e,doc)=>{
    if(e){
      res.send(e)
    }
    res.redirect('/blog-details?id='+id)
  })
}