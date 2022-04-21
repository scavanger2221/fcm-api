import {cert, initializeApp} from "firebase-admin/app";
import {getFirestore, Timestamp, FieldValue} from "firebase-admin/firestore";
import {getMessaging} from "firebase-admin/messaging";
import {firebaseConfig} from "../../config/firebase.js";

initializeApp({
    credential:cert(firebaseConfig),
});

const db = getFirestore();

const fcm = getMessaging();

const addNewData = async (data, collection) => {
    const docRef = db.collection(collection).doc();
    
    try {
        
        const payload = {
            timestamp:Date.now(),
            ...data
        }

        const result = await docRef.set(payload);    

        return payload;
    } catch (error) {
        console.log(error);
    }
    
}


const sendNotification =  async (data) => {

    const topics = data.topics;
    
    const message = {
        notification: {
            title: data.title,
            body: data.message,
            click_action: data.clickable ? "FLUTTER_NOTIFICATION_CLICK" : "",
        },
        data: data.data,
    };

    try {
        topics.forEach(topic => {
            fcm.sendToTopic(topic, message)
                .then(function(response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function(error) {
                    console.log("Error sending message:", error.errorInfo);
                });
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}
export {
    addNewData,sendNotification
}

