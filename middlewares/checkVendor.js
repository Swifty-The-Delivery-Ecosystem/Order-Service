const Vendor = require("../models/vendor.model")

const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR, VENDOR_NOT_PERMITTED } = require("../errors")
const { verifyJwtToken } = require("../utils/token.util")



module.exports = async (req, res, next) => {
    try {
        // check for auth header from client 
        const header = req.headers.authorization
        console.log(header);
        if (!header) {
            next({ status: 403, message: AUTH_HEADER_MISSING_ERR })
            return
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]

        if (!token) {
            next({ status: 403, message: AUTH_TOKEN_MISSING_ERR })
            return
        }

        const vendorId = verifyJwtToken(token,next)

        if (!vendorId) {
            next({ status: 403, message: JWT_DECODE_ERR })
            return
        }

        const vendor = await Vendor.findById(vendorId)

        if (!vendor) {
            next({status: 404, message: USER_NOT_FOUND_ERR })
            return
        }

        if (vendor.status != 'active') {
            next({status: 404, message: VENDOR_NOT_PERMITTED })
            return
        }

        res.locals.user = vendor;

        next()
    } catch (err) {
        next(err)
    }
}
