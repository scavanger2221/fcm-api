import {cert, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getMessaging} from "firebase-admin/messaging";
import {firebaseConfig} from "../../config/firebase";


const initApp = () => {

    const app = {}
    const db = {}
    const messaging = {}

    try {
        for(let key of Object.keys(firebaseConfig)) {
            app[key] = initializeApp({
                credential: cert(firebaseConfig[key]),
            }, key);
            

            db[key] = getFirestore(app[key]);
            messaging[key] = getMessaging(app[key]);
        } 

        return {
            db: db,
            messaging: messaging,
        }

    }catch(err){
        console.log(err);
    }

};

const {db, messaging} = initApp();

export const addNewData = async (data, collection, app) => {

    const docRef = db[app].collection(collection).doc();

    try {
        const payload = {
            timestamp:Date.now(),
            ...data
        }

        await docRef.set(payload);    
        return payload;

    } catch (error) {
        console.log(error);
    }
    
}

export const sendNotification =  async (data, app) => {
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
            messaging[app].sendToTopic(topic, message)
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
