export const textValidator = text => {
    if(!text){
        console.log("This field is required")
        return "This field is required";
    }

    else {
        return "";
    }
}

export const phoneValidator = phoneNumber => {
    if(!phoneNumber){
        console.log("This field is required")
        return "This field is required";
    }
    else if(!new RegExp(/(^\d{11}$)/).test(phoneNumber)){
        console.log("Incorrect mobile number format. Number must be 11 digits. Accepted Format: 09123456789");
        return "Incorrect mobile number format. Number must be 11 digits. Accepted Format: 09123456789";
    }
    else {
        return "";
    }
}

export const dateValidator = date => {
    if(!date){
        console.log("This field is required");
        return "This field is required"
    }
    // else if(!new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/).test(date)){
    //     console.log("Incorrect date format. MM/DD/YYYY is required");
    //     return "Incorrect date format. MM/DD/YYYY is required";
    // }
    else if(!new RegExp(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/).test(date)){
        console.log("Incorrect date format. DD/MM/YYYY is required");
        return "Incorrect date format. DD/MM/YYYY is required";
    }

    return "";
}

export const emailValidator = email => {
    if(!email) {
        console.log("This field is required")
        return "This field is required";
    }
    else if (!new RegExp(/\S+@\S+\.\S+/).test(email)){
        console.log("Incorrect email format")
        return "Incorrect email format";
    }

    return "";
}

export const passwordValidator = password => {
    if (!password) {
        console.log("This field is required")
        return "Password is required";
    } else if (password.length < 8) {
        console.log("Password must have a minimum 8 characters")
        return "Password must have a minimum 8 characters";
    }
    return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
    if (!confirmPassword) {
        console.log("Confirm password is required")
        return "Confirm password is required";
    } else if (confirmPassword.length < 8) {
        console.log("Confirm password must have a minimum 8 characters")
        return "Confirm password must have a minimum 8 characters";
    } else if (confirmPassword !== form.password) {
        console.log("Passwords do not match")
        return "Passwords do not match";
    }
    return "";
}

export const urlValidator = url => {
    if(!url) {
        return "";
    }
    if(!RegExp().test(url)){
        console.log("Invalid URL")
        return "Invalid URL";
    }
}