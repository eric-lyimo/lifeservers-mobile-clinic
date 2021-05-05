const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
try {
  const token = req.session.token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
  if (!user) {
    throw new Error()
  }
  req.session.user = user
  next()
} catch (e) {
  res.status(401).send(e)
  }
}
module.exports = auth