import React, { useState } from "react";
import { dateValidator, textValidator, emailValidator, passwordValidator, confirmPasswordValidator, phoneValidator,userNameValidator } from "./Validators";

const touchError = (errors) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {...fieldError, dirty: true};
        return acc;
    }, {});
}

export const CreateUserValidator = (values) => {
    const [errors, setErrors] = React.useState({
        merchant: {
            dirty: false,
            error: false,
            message: ""
        },
        firstName: {
            dirty: false,
            error: false,
            message: ""
        },
        lastName: {
            dirty: false,
            error: false,
            message: ""
        },
        userName: {
            dirty: false,
            error: false,
            message: ""
        },
        emailAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        password: {
            dirty: false,
            error: false,
            message: ""
        },
        confirmPassword: {
            dirty: false,
            error: false,
            message: ""
        },
        subscriptionStart: {
            dirty: false,
            error: false,
            message: ""
        },
        phone: {
            dirty: false,
            error: false,
            message: ""
        },
    }
);

    const validateForm = ({values, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

        const nextErrors = JSON.parse(JSON.stringify(errors));

        if(forceTouchErrors){
            nextErrors = touchError(errors);
        }

        const {merchant,
            firstName,
            lastName,
            userName, 
            emailAddress,
            password,
            confirmPassword,
            subscriptionStart,
            phone} = values;

        if(nextErrors.merchant.dirty && (field ? field === "merchant" : true)){
            const merchantMessage = textValidator(merchant, values);
            nextErrors.merchant.error = !!merchantMessage;
            nextErrors.merchant.message = merchantMessage;
            if(!!merchantMessage) isValid = false;
        }

        if(nextErrors.firstName.dirty && (field ? field === "firstName" : true)){
            const firstNameMessage = textValidator(firstName, values);
            nextErrors.firstName.error = !!firstNameMessage;
            nextErrors.firstName.message = firstNameMessage;
            if(!!firstNameMessage) isValid = false;
        }

        if(nextErrors.lastName.dirty && (field ? field === "lastName" : true)){
            const lastNameMessage = textValidator(lastName, values);
            nextErrors.lastName.error = !!lastNameMessage;
            nextErrors.lastName.message = lastNameMessage;
            if(!!lastNameMessage) isValid = false;
        }

        if(nextErrors.userName.dirty && (field ? field === "userName" : true)){
            const userNameMessage = userNameValidator(userName, values);
            nextErrors.userName.error = !!userNameMessage;
            nextErrors.userName.message = userNameMessage;
            if(!!userNameMessage) isValid = false;

            
        }

        if(nextErrors.emailAddress.dirty && (field ? field === "emailAddress" : true)){
            const emailAddressMessage = emailValidator(emailAddress, values);
            nextErrors.emailAddress.error = !!emailAddressMessage;
            nextErrors.emailAddress.message = emailAddressMessage;
            if(!!emailAddressMessage) isValid = false;
        }

        if(nextErrors.password.dirty && (field ? field === "password" : true)) {
            const passwordMessage = passwordValidator(password, values);
            nextErrors.password.error = !!passwordMessage;
            nextErrors.password.message = passwordMessage;
            if(!!passwordMessage) isValid = false;
        }

        if(nextErrors.confirmPassword && (field ? field === "confirmPassword" : true)) {
            const confirmPasswordMessage = confirmPasswordValidator(confirmPassword, values);
            nextErrors.confirmPassword.error = !!confirmPasswordMessage;
            nextErrors.confirmPassword.message = confirmPasswordMessage;
            if(!!confirmPasswordMessage) isValid = false;
        }

        if(nextErrors.subscriptionStart.dirty && (field ? field === "subscriptionStart" : true)){
            const subscriptionStartMessage = dateValidator(subscriptionStart, values);
            nextErrors.subscriptionStart.error = !!subscriptionStartMessage;
            nextErrors.subscriptionStart.message = subscriptionStartMessage;
            if(!!subscriptionStartMessage) isValid = false;
        }
        if(nextErrors.phone.dirty && (field ? field === "phone" : true)){
            const phoneMessage = phoneValidator(phone, values);
            nextErrors.phone.error = !!phoneMessage;
            nextErrors.phone.message = phoneMessage;
            if(!!phoneMessage) isValid = false;
        }

        setErrors(nextErrors);

        return{
            isValid,
            errors: nextErrors
        };
    };

    const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;

        const updatedErrors = {
        ...errors,
        [field]: {
            ...errors[field],
            dirty: true,
        },
        };

        validateForm({ values, field, errors: updatedErrors });
    };

    return{
        validateForm, onBlurField, errors
    }

}