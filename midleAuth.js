const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const token = request.cookies.jwt;
    let decode
    try {
        if (token) {
            decode = jwt.verify(token, process.env.SECRT_KEY)
            request.role = decode.role
            next()
        } else {
            response.redirect('/login')
        }
    }
    catch {

        next(new Error('Not Authorized'))
    }

}