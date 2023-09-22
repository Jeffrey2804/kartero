export const textValidator = text => {
    console.log("Text : ");
    console.log(text);
    if (!text) {
        console.log("This field is required")
        return "This field is required";
    }

    else {
        return "";
    }
}


export const addressValidator = text => {
    console.log("Text : ");
    console.log(text);
    if (text < 0) {
        console.log("This field is required")
        return "This field is required";
    }

    else {
        return "";
    }
}



export const userNameValidator = text => {
    console.log("User Name" );
    console.log(text);
    if (!text) {
        console.log("This field is required")
        return "This field is required";
    } else if (text.length < 8 || text.length > 15) {
        console.log("Should be between 8 and 15 characters")
        return "Should be between 8 and 15 characters";
    }

    else {
        return "";
    }
}

export const phoneValidator = phoneNumber => {
    console.log("Phone number" );
    console.log(phoneNumber);
    if (!phoneNumber) {
        console.log("This field is required")
        return "This field is required";
    }
    else if (!new RegExp(/(^\d{8}$)/).test(phoneNumber)) {
        console.log("Incorrect mobile number format. Number must be 8 digits. Accepted Format: 98745632");
        return "Incorrect mobile number format. Number must be 8 digits. Accepted Format: 98745632";
    }
    else {
        return "";
    }
}

export const mobileValidator = phoneNumber => {
    console.log("Phone number" );
    console.log(phoneNumber);
    if (!phoneNumber) {
        console.log("This field is required")
        return "This field is required";
    }
    else if (!new RegExp(/(^\d{10}$)/).test(phoneNumber)) {
        console.log("Incorrect mobile number format. Number must be 10 digits. Accepted Format: 9123456789");
        return "Incorrect mobile number format. Number must be 10 digits. Accepted Format: 9123456789";
    }
    else {
        return "";
    }
}
export const dateValidator = date => {
    console.log("Date" );
    if (!date) {
        console.log("This field is required");
        return "This field is required"
    }
    // else if(!new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/).test(date)){
    //     console.log("Incorrect date format. MM/DD/YYYY is required");
    //     return "Incorrect date format. MM/DD/YYYY is required";
    // }
    else if (!new RegExp(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/).test(date)) {
        console.log("Incorrect date format. DD/MM/YYYY is required");
        return "Incorrect date format. DD/MM/YYYY is required";
    }

    return "";
}

export const emailValidator = email => {
    console.log("Email " );
    if (!email) {
        console.log("This field is required")
        return "This field is required";
    }
    else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        console.log("Incorrect email format")
        return "Incorrect email format";
    }

    return "";
}

export const passwordValidator = password => {
    if (!password) {
        console.log("This field is required")
        return "Password is required";
    } else if (password.length < 12) {
        console.log("Password must have a minimum 12 characters")
        return "Password must have a minimum 12 characters";
    } else if (!new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/).test(password)) {
        console.log("Should at least contain one special character, Should at least contain one number, Should at least contain one uppercase letter")
        return "Should at least contain one special character, Should at least contain one number, Should at least contain one uppercase letter";
    }
    return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
    if (!confirmPassword) {
        console.log("Confirm password is required")
        return "Confirm password is required";
    } else if (confirmPassword.length < 12) {
        console.log("Confirm password must have a minimum 12 characters")
        return "Confirm password must have a minimum 12 characters";
    } else if (confirmPassword !== form.password) {
        console.log("Passwords do not match")
        return "Passwords do not match";
    }else if (!new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/).test(confirmPassword)) {
        console.log("Should at least contain one special character, Should at least contain one number, Should at least contain one uppercase letter")
        return "Should at least contain one special character, Should at least contain one number, Should at least contain one uppercase letter";
    }
    return "";
}

export const urlValidator = url => {

    if (!url) {
        return "";
    }
    if (!RegExp().test(url)) {
        console.log("Invalid URL")
        return "Invalid URL";
    }
}