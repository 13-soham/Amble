const validator = require("validator");

const validateSignup = (req) => {
    let { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) throw new Error("Enter the valid firstname or lastname");
    else if (!validator.isEmail(email)) throw new Error("Enter the valid Email");
    else if (!validator.isStrongPassword(password)) throw new Error("Provide a strong password");

}

module.exports = { validateSignup };