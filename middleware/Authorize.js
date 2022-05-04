const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ;
/** 
* @param {*} req 
* @param {*} res 
* @param {*} next 
*/

let isAdmin = async (req, res, next) => {
    let tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    let decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    if(decoded.data.idCustomer){
        return res.status(403).send({
            message: 'only admin can access',
          });
    }
    else{
        next();
    }
}
module.exports = {
    isAdmin: isAdmin,
  };