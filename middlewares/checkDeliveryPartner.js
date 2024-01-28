
const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, ADMIN_NOT_FOUND_ERR } = require("../errors")
const { verifyJwtToken } = require("../utils/token.util")

const DeliveryPartner = require("../models/deliveryPartner.model")

module.exports = async (req, res, next) => {
    try {
        // check for auth header from client 
        const header = req.headers.authorization
        
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

        const deliverPartnerId = verifyJwtToken(token,next)

        if (!deliverPartnerId ) {
            next({ status: 403, message: JWT_DECODE_ERR })
            return
        }

        const deliveryPartner = await DeliveryPartner.findOne({_id:deliverPartnerId});

        if (!deliveryPartner) {
            next({status: 404, message: ADMIN_NOT_FOUND_ERR })
            return
        }

        res.locals.user = deliveryPartner;

        next()
    } catch (err) {
        next(err)
    }
}
