import { db } from '@/components/backend/databaseController/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where } from 'firebase/firestore';

  interface Comunidades {
  id: number; // Auto-incremented ID
  name: string;
  description: string;
  community: string;
  number_of_members: number;
  serialId: string; // Clerk's serial ID for each registered user
}

const comunidadesCollection = collection(db, 'Comunidades'); // Reference to the 'Comunidades' collection

// Function to generate auto-incremented ID
let currentId = 0;
const getNextId = async (): Promise<number> => {
  const querySnapshot = await getDocs(comunidadesCollection);
  return querySnapshot.docs.length + 1;
};

// Create a community
export const createCommunity = async (communityData: Omit<Comunidades, 'id'>): Promise<void> => {
  try {
    const newId = await getNextId();
    const newCommunity: Comunidades = {
      id: newId,
      ...communityData
    };
    await addDoc(comunidadesCollection, newCommunity);
    console.log('Community created successfully');
  } catch (error) {
    console.error('Error creating community: ', error);
    throw error;
  }
};

// Read a community by ID
export const getCommunityById = async (id: number): Promise<Comunidades | null> => {
  try {
    const q = query(comunidadesCollection, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as Comunidades;
    } else {
      console.log(`No community found with id ${id}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching community: ', error);
    throw error;
  }
};

// Update a community by ID
export const updateCommunity = async (id: number, updatedData: Partial<Comunidades>): Promise<void> => {
  try {
    const q = query(comunidadesCollection, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, updatedData);
      console.log('Community updated successfully');
    } else {
      console.log(`No community found with id ${id}`);
    }
  } catch (error) {
    console.error('Error updating community: ', error);
    throw error;
  }
};

// Delete a community by ID
export const deleteCommunity = async (id: number): Promise<void> => {
  try {
    const q = query(comunidadesCollection, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log('Community deleted successfully');
    } else {
      console.log(`No community found with id ${id}`);
    }
  } catch (error) {
    console.error('Error deleting community: ', error);
    throw error;
  }
};

// Get all communities
export const getAllCommunities = async (): Promise<Comunidades[]> => {
  try {
    const querySnapshot = await getDocs(comunidadesCollection);
    const communities: Comunidades[] = querySnapshot.docs.map(doc => doc.data() as Comunidades);
    return communities;
  } catch (error) {
    console.error('Error fetching communities: ', error);
    throw error;
  }
};
