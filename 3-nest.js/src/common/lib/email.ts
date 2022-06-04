// Chromium Regex String
const emailRegex: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function validateEmail(email: String) : boolean {
    if(typeof(email) !== 'string') { return false; } // ako nije string nema sta da proveravamo
    return emailRegex.test(email);
}

export { validateEmail };