import * as functions from "firebase-functions";

export const onFarmCreate = functions.firestore
    .document("/farms/{id}")
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
      // add 30 sec threshold in order to avoid infinite loop
      const now = new Date().getTime();
      const docDate = snap.after.data().updatedDate.seconds * 1000;
      if (docDate > now - 30 * 1000) {
        return;
      }

      const updatedTime = snap.after.updateTime;
      return snap.after.ref.set({
        updatedDate: updatedTime},
      {merge: true}
      );
    });

