import jwt from "jsonwebtoken";

export default class LoginValidator{

    static verifyToken = (req, res, next) => {        
        
        let token = req.cookies.token;        

        if (!token) {
            return res.status(401).send({ message: 'Unauthorised' });
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorised' });
            }
            req.username = decoded.username;
            req.userId = decoded.id;
            req.admin = decoded.admin;            
        })
        next();
    }

    static isAdmin = (req, res, next) => {
        if (!(req.admin)) {
            return res.status(401).send({ message: "Unauthorised" });
        }
        next();
    }
}