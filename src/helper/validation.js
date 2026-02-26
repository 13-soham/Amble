const validator = require("validator");

const validateSignup = (req) => {
    let { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) throw new Error("Enter the valid firstname or lastname");
    else if (!validator.isEmail(email)) throw new Error("Enter the valid Email");
    else if (!validator.isStrongPassword(password)) throw new Error("Provide a strong password");

}

const validateUpdate = (req)=>{
    const allowUpdates = ["age", "gender", "interest", "about", "photoUrl"];
    const isUpdateAllow = Object.keys(req.body).every((key) => allowUpdates.includes(key));     // .every() returns true and false
    
    if(req.body?.interest.length > 7) throw new Error("interest cannot have more than 7");
    if(!isUpdateAllow) throw new Error("this field cannot be update");
    else return false;
}

module.exports = { validateSignup, validateUpdate };