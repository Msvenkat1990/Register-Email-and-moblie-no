const userDB = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorHandling = require("../middleware/errorHandling");
const viewData = async (req, res) => {
  const userData = await userDB.find();
  res.json(userData);
};
const register = async (req, res, next) => {
  try{
    const hashPassword = await bcrypt.hash(req.body.password, 7);
    const userValue = new userDB({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      mobileNo: req.body.mobileNo,
    });
    const existEmail = await userDB.findOne({ email: req.body.email });
    if (existEmail) return next(errorHandling("401", "Email already register"));
    // status(500).json({ message: "Email already register" });
    const existMobile = await userDB.findOne({ mobileNo: req.body.mobileNo });
    if (existMobile)
      return next(errorHandling("401", "Mobile number already register"));
    // res.status(500).json({ message: "Mobile number already register" });
    const dataSave = await userValue.save();
    res.json(dataSave);
  }
  catch(error){
    next(error);
  }
};
const logIn = async (req, res, next) => {
  try{
    const loginEmail = await userDB.findOne({ email: req.body.email });
    if (!loginEmail) return next(errorHandling("409", "Email not registered"));
    // res.status(404).json({ message:"Email not registered" });
    const loginPassword = await bcrypt.compare(
      req.body.password,
      loginEmail.password
    );
    if (!loginPassword)
      return next(errorHandling("409", "Password did not match"));
  
    // res.status(404).json({message:"Password did not match"});
  
    res.json({message:'Login Successfully'})
  
    //payload function in genrate token
    const token = jwt.sign({ id: loginEmail._id }, process.env.TOKENKEY);
    res.json(token);
  }
 catch(error){
  next(error);
 }
};

module.exports = { register, logIn, viewData };
