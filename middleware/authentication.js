import  jwt  from "jsonwebtoken"
export const authentication = (req,res,next)=>{
const {token} = req.cookies;
try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.id = decoded
    next();
} catch (error) {
   return res.redirect("/sign_in")
}
}