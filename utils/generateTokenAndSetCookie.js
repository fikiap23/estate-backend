import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, 'jwtSecret', {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    httpOnly: true, // more secure
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: 'none',
    secure: true,
  })

  return token
}

export default generateTokenAndSetCookie
