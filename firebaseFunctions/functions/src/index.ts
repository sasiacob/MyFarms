import * as functions from "firebase-functions";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onFarmCreate = functions.firestore.document("/farms/{id}")
    .onCreate((snap) => {
      const creationDate = snap.createTime;

      return snap.ref.set(
          {
            creationDate: creationDate,
            updatedDate: creationDate,
          },
          {merge: true}
      );
    });

export const onFarmUpdate = functions.firestore
    .document("/farms/{id}")
    .onUpdate((snap) => {
      const updatedTime = snap.after.updateTime;
      return snap.after.ref.set({
        updatedDate: updatedTime},
      {merge: true}
      );
    });

