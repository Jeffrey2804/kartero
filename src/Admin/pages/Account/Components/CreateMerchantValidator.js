import React, { useState } from "react";
import { dateValidator, textValidator, emailValidator, phoneValidator, urlValidator,addressValidator,mobileValidator } from "./Validators";

const touchError = (errors) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {...fieldError, dirty: true};
        return acc;
    }, {});
}

export const CreateMerchantValidator = (values) => {
    const [errors, setErrors] = React.useState({
        subscriptionStart: {
            dirty: false,
            error: false,
            message: ""
        },
        companyName: {
            dirty: false,
            error: false,
            message: ""
        },
        companyTradeName: {
            dirty: false,
            error: false,
            message: ""
        },
        companyFullAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        companyStreetAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        compantCityAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        companyRegionAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        companyZipCode: {
            dirty: false,
            error: false,
            message: ""
        },
        companyEmailAddress: {
            dirty: false,
            error: false,
            message: ""
        },
        companyCustomerRelationsEmail: {
            dirty: false,
            error: false,
            message: ""
        },
        companyMobileNumber1: {
            dirty: false,
            error: false,
            message: ""
        }, 
        companyMobileNumber2: {
            dirty: false,
            error: false,
            message: ""
        },
        companyPhoneNumber1: {
            dirty: false,
            error: false,
            message: ""
        },
        companyPhoneNumber2: {
            dirty: false,
            error: false,
            message: ""
        },
        companyWebsite: {
            dirty: false,
            error: false,
            message: ""
        },
        companyFacebookPage: {
            dirty: false,
            error: false,
            message: ""
        },
        companyTelegramPage: {
            dirty: false,
            error: false,
            message: ""
        },
        companyInstagramPage: {
            dirty: false,
            error: false,
            message: ""
        },
        companyCustomerServiceWebsite: {
            dirty: false,
            error: false,
            message: ""
        },
        companyWebsite: {
            dirty: false,
            error: false,
            message: ""
        }
    }
);

    const validateForm = ({values, field, errors, forceTouchErrors = false}) => {
        let isValid = true;

        let nextErrors = JSON.parse(JSON.stringify(errors));

        if(forceTouchErrors){
            nextErrors = touchError(errors);
        }

        const {
            companyName,
            companyTradeName,
            companyStreetAddress,
            compantCityAddress,
            companyRegionAddress,
            companyZipCode,
            companyEmailAddress,
            companyCustomerRelationsEmail,
            companyMobileNumber1, 
            companyMobileNumber2,
            companyPhoneNumber1,
            companyPhoneNumber2,
            subscriptionStart,
            } = values;

        if(nextErrors.companyName.dirty && (field ? field === "companyName" : true)){
            const companyNameMessage = textValidator(companyName, values);
            nextErrors.companyName.error = !!companyNameMessage;
            nextErrors.companyName.message = companyNameMessage;
            if(!!companyNameMessage) isValid = false;
        }

        if(nextErrors.companyTradeName.dirty && (field ? field === "companyTradeName" : true)){
            const companyTradeNameMessage = textValidator(companyTradeName, values);
            nextErrors.companyTradeName.error = !!companyTradeNameMessage;
            nextErrors.companyTradeName.message = companyTradeNameMessage;
            if(!!companyTradeNameMessage) isValid = false;
        }

        if(nextErrors.companyStreetAddress.dirty && (field ? field === "companyStreetAddress" : true)){
            const companyStreetAddressMessage = textValidator(companyStreetAddress, values);
            nextErrors.companyStreetAddress.error = !!companyStreetAddressMessage;
            nextErrors.companyStreetAddress.message = companyStreetAddressMessage;
            if(!!companyStreetAddressMessage) isValid = false;
        }

        if(nextErrors.compantCityAddress.dirty && (field ? field === "compantCityAddress" : true)){
            const compantCityAddressMessage = addressValidator(compantCityAddress, values);
            nextErrors.compantCityAddress.error = !!compantCityAddressMessage;
            nextErrors.compantCityAddress.message = compantCityAddressMessage;
            if(!!compantCityAddressMessage) isValid = false;
        }

        if(nextErrors.companyRegionAddress.dirty && (field ? field === "companyRegionAddress" : true)){
            const companyRegionAddressMessage = addressValidator(companyRegionAddress, values);
            nextErrors.companyRegionAddress.error = !!companyRegionAddressMessage;
            nextErrors.companyRegionAddress.message = companyRegionAddressMessage;
            if(!!companyRegionAddressMessage) isValid = false;
        }

        if(nextErrors.companyZipCode.dirty && (field ? field === "companyZipCode" : true)){
            const companyZipCodeMessage = textValidator(companyZipCode, values);
            nextErrors.companyZipCode.error = !!companyZipCodeMessage;
            nextErrors.companyZipCode.message = companyZipCodeMessage;
            if(!!companyZipCodeMessage) isValid = false;
        }

        if(nextErrors.companyEmailAddress.dirty && (field ? field === "companyEmailAddress" : true)){
            const companyEmailAddressMessage = emailValidator(companyEmailAddress, values);
            nextErrors.companyEmailAddress.error = !!companyEmailAddressMessage;
            nextErrors.companyEmailAddress.message = companyEmailAddressMessage;
            if(!!companyEmailAddressMessage) isValid = false;
        }

        if(nextErrors.companyCustomerRelationsEmail.dirty && (field ? field === "companyCustomerRelationsEmail" : true)){
            const companyCustomerRelationsEmailMessage = emailValidator(companyCustomerRelationsEmail, values);
            nextErrors.companyCustomerRelationsEmail.error = !!companyCustomerRelationsEmailMessage;
            nextErrors.companyCustomerRelationsEmail.message = companyCustomerRelationsEmailMessage;
            if(!!companyCustomerRelationsEmailMessage) isValid = false;
        }

        if(nextErrors.subscriptionStart.dirty && (field ? field === "subscriptionStart" : true)){
            const subscriptionStartMessage = dateValidator(subscriptionStart, values);
            nextErrors.subscriptionStart.error = !!subscriptionStartMessage;
            nextErrors.subscriptionStart.message = subscriptionStartMessage;
            if(!!subscriptionStartMessage) isValid = false;
        }

        if(nextErrors.companyPhoneNumber1.dirty && (field ? field === "companyPhoneNumber1" : true)){
            const companyPhoneNumber1Message = phoneValidator(companyPhoneNumber1, values);
            nextErrors.companyPhoneNumber1.error = !!companyPhoneNumber1Message;
            nextErrors.companyPhoneNumber1.message = companyPhoneNumber1Message;
            if(!!companyPhoneNumber1Message) isValid = false;
        }
        if(nextErrors.companyPhoneNumber2.dirty && (field ? field === "companyPhoneNumber2" : true)){
            const companyPhoneNumber2Message = phoneValidator(companyPhoneNumber2, values);
            nextErrors.companyPhoneNumber2.error = !!companyPhoneNumber2Message;
            nextErrors.companyPhoneNumber2.message = companyPhoneNumber2Message;
            if(!!companyPhoneNumber2Message) isValid = false;
        }


        if(nextErrors.companyMobileNumber1.dirty && (field ? field === "companyMobileNumber1" : true)){
            const companyMobileNumber1Message = mobileValidator(companyMobileNumber1, values);
            nextErrors.companyMobileNumber1.error = !!companyMobileNumber1Message;
            nextErrors.companyMobileNumber1.message = companyMobileNumber1Message;
            if(!!companyMobileNumber1Message) isValid = false;
        }

        if(nextErrors.companyMobileNumber2.dirty && (field ? field === "companyMobileNumber2" : true)){
            const companyMobileNumber2Message = mobileValidator(companyMobileNumber2, values);
            nextErrors.companyMobileNumber2.error = !!companyMobileNumber2Message;
            nextErrors.companyMobileNumber2.message = companyMobileNumber2Message;
            if(!!companyMobileNumber2Message) isValid = false;
        }

        // if(nextErrors.companyWebsite.dirty && (field ? field === "companyWebsite" : true)){
        //     const companyWebsiteMessage = urlValidator(companyWebsite, values);
        //     nextErrors.companyWebsite.error = !!companyWebsiteMessage;
        //     nextErrors.companyWebsite.message = companyWebsiteMessage;
        //     if(!!companyWebsiteMessage) isValid = false;
        // }

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