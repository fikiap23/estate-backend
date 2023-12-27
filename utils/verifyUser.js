// import jwt from 'jsonwebtoken'
// import { errorHandler } from './error.js'

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token
//   console.log(token)

//   if (!token) return next(errorHandler(401, 'Unauthorized'))

//   jwt.verify(token, 'jwtSecret', (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'))

//     req.user = user
//     next()
//   })
// }
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    console.log(token)

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId).select('-password')

    req.user = user

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log('Error in verifyToken: ', err.message)
  }
}

export default verifyToken
