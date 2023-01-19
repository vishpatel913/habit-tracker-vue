import {
  collection,
  doc,
  query,
  // getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Habit } from "@/models/habit.model";

type DocumentTypes = {
  habits: Habit;
};

type DocumentTypeKey = keyof DocumentTypes;

const getAuthUserId = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw Error("User not authenticated");
  return userId;
};

export const getCollection = async <
  T extends DocumentTypeKey,
  R extends Array<DocumentTypes[T]>
>(
  type: T
): Promise<R> => {
  const userId = await getAuthUserId();
  const collectionRef = collection(db, "user", userId, type);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const result = await Promise.all(
    querySnapshot.docs.map((doc) => {
      if (doc.exists()) {
        return doc.data();
      } else {
        console.error("Document does not exist");
        return;
      }
    })
  );

  return result.filter(Boolean) as R;
};

export const setDocument = async <
  T extends DocumentTypeKey,
  R extends DocumentTypes[T]
>(
  type: T,
  payload: R
): Promise<R> => {
  const userId = await getAuthUserId();
  if (!payload.id) {
    throw Error("ID is required in payload to set document");
  }
  const docRef = doc(db, "user", userId, type, payload.id);
  await setDoc(docRef, payload);

  return payload;
};

export const deleteDocument = async <T extends DocumentTypeKey>(
  type: T,
  id: string
) => {
  const userId = await getAuthUserId();
  const docRef = doc(db, "user", userId, type, id);
  await deleteDoc(docRef);
};
