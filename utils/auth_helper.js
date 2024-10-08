const isStrongPassword = (password) => {
    // At least 8 characters long
    const lengthCheck = password.length >= 8;

    // Contains at least one uppercase letter
    const uppercaseCheck = /[A-Z]/.test(password);

    // Contains at least one lowercase letter
    const lowercaseCheck = /[a-z]/.test(password);

    // Contains at least one digit
    const digitCheck = /\d/.test(password);

    // Contains at least one special character
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // All conditions must be true for the password to be considered strong
    return lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck && specialCharCheck;
}

module.exports = { isStrongPassword }
