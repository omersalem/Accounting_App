import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  CollectionReference,
  DocumentReference,
  Firestore,
} from "firebase/firestore";
import { app } from "./firebase";

export function getDB(): Firestore {
  return getFirestore(app);
}

export function col<T = unknown>(colName: string): CollectionReference<T> {
  return collection(getDB(), colName) as CollectionReference<T>;
}

export function docRef<T = unknown>(
  colName: string,
  id: string
): DocumentReference<T> {
  return doc(getDB(), colName, id) as DocumentReference<T>;
}

export async function addDocTyped<T>(
  colRef: CollectionReference<T>,
  data: T
): Promise<DocumentReference<T>> {
  return addDoc(colRef, data);
}

export async function getDocsTyped<T>(
  colRef: CollectionReference<T>
): Promise<readonly T[]> {
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as T));
}
