import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserRole, IFirestoreTrip, IFirestoreUser } from './types';

const addUserToFirestore = async (user: IFirestoreUser) => {
  const userCollectionRef = collection(db, 'users');
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  const docRef = doc(userCollectionRef, userId);

  try {
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error);
  }
};

const getUserRole = async () => {
  const userId = auth.currentUser?.uid;

  if (!userId) return 'passenger';

  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const role = docSnap.data().role as UserRole;
      return role;
    } else {
      throw new Error('User document not found');
    }
  } catch {
    return 'passenger';
  }
};

const updateUserRole = async (userId: string, role: UserRole) => {
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, { role });
  } catch (e) {
    throw new Error('Error updating user role');
  }
};

const getAllFirestoreUsers = async () => {
  const usersCollectionRef = collection(db, 'users');

  try {
    const querySnapshot = await getDocs(usersCollectionRef);
    const users: IFirestoreUser[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as IFirestoreUser);
    });
    return users;
  } catch (e) {
    throw new Error('Error getting all users');
  }
};

const checkIsAdminFirestore = async () => {
  const userId = auth.currentUser?.uid;

  if (!userId) return false;

  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const isAdmin = docSnap.data().isAdmin as boolean;
      return isAdmin;
    } else {
      throw new Error('User document not found');
    }
  } catch {
    return false;
  }
};

const getAllFirestoreTrips = async () => {
  const tripsCollectionRef = collection(db, 'trips');

  try {
    const querySnapshot = await getDocs(tripsCollectionRef);
    const trips: IFirestoreTrip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data() as IFirestoreTrip);
    });
    return trips;
  } catch (e) {
    throw new Error('Error getting all users');
  }
};

const addTripToFirestore = async (trip: IFirestoreTrip) => {
  const tripsCollectionRef = collection(db, 'trips');
  const tripId = trip.id;
  const docRef = doc(tripsCollectionRef, tripId);

  try {
    await setDoc(docRef, trip);
  } catch (error) {
    console.error(error);
  }
};

export {
  addUserToFirestore,
  getUserRole,
  updateUserRole,
  getAllFirestoreUsers,
  checkIsAdminFirestore,
  getAllFirestoreTrips,
  addTripToFirestore,
};
