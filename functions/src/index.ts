import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// const env = functions.config();

import * as algoliasearch from 'algoliasearch' ;


const client = algoliasearch('7417ZEQGC5','b1aded5ef1cbca8981716da084d3a5ed');


//Event Professionals
const index1 = client.initIndex('users');

exports.indexEP_Name = functions.firestore
    .document('users/{uid}')
    .onCreate((snap,context)=>{
        const data = snap.data();
        const objectID = snap.id;
        return index1.addObject({
            objectID,data
        });
    });

 exports.upindexEP_Name = functions.firestore
    .document('users/{uid}')
    .onUpdate((change,context)=>{
        const objectID = change.after.id;
        const data = change.after.data();

        return index1.partialUpdateObject({objectID, data}, (err,res)=> {
            if (err) throw err;
            console.log("Update event triggered", res);
        });
        
        // return index1.partialUpdateObject({
        //    newData
        });
  
exports.unindexEP_Name = functions.firestore
    .document('users/{uid}')
    .onDelete((snap,context)=>{
        const objectID = snap.id;
        return index1.deleteObject(objectID);

    });




// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

 //export const helloWorld = functions.https.onRequest((request, response) => {
  //response.send("Hello from Firebase!");
 //});
