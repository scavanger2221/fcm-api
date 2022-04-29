
import {checkSchema} from "express-validator";
import { firebaseConfig } from "../../config/firebase";


const createNotificationSchema = checkSchema({
    app : {
        in : ["params"],
        contains:{
            options : Object.keys(firebaseConfig),
            errorMessage : "Invalid app name",
            bail : true
        }
    },
    clickable: {
        optional: true,
        isBoolean: {
            errorMessage: "Clickable must be a boolean"
        }
    },
    title: {
        notEmpty: {
            bail:true,
            errorMessage: "Title is required"
        },
        isString: {
            errorMessage: "Title must be a string"
        },
    },
    message: {
        notEmpty: {
            bail:true,
            errorMessage: "Message is required"
        },
        isString: {
            errorMessage: "Message must be a string"
        },
    },
    data:{
        isObject: {
            errorMessage: "Data must be an object",
        },
        optional: true
    },
    topics: {
        notEmpty: {
            bail:true,
            errorMessage: "Topics is required"
        },
        isArray: {
            errorMessage: "Topics must be an array"
        },
        errorMessage: "Topics is required"
    }
});

export default createNotificationSchema;