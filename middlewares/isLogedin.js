module.exports = (req, res, next) => {
  if(!req.user){
    return res.status(401).send({err: "Please Login To Access This Route"});
  }
  next();
}