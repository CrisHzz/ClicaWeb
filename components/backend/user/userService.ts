import { db } from '@/components/backend/databaseController/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

export interface Perfil {
  id: string; 
  name: string;
  description: string;
  likes: string;
  mail: string;
  communities: string[]; 
}

// Create or update a user profile
export const saveUserProfile = async (perfilData: Omit<Perfil, 'id'>, userId: string) => {
  try {
    const perfilRef = doc(db, 'Perfiles', userId); // Document reference based on Clerk user ID
    const existingProfile = await getDoc(perfilRef);

    if (existingProfile.exists()) {
      // Update profile if it exists
      await updateDoc(perfilRef, perfilData);
      console.log('User profile updated successfully');
    } else {
      // Create new profile if it doesn't exist
      const newProfile: Perfil = { ...perfilData, id: userId };
      await setDoc(perfilRef, newProfile);
      console.log('User profile created successfully');
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw new Error('Unable to save user profile');
  }
};

// Fetch a user profile by ID
export const getUserProfile = async (userId: string): Promise<Perfil | null> => {
  try {
    const perfilRef = doc(db, 'Perfiles', userId);
    const perfilDoc = await getDoc(perfilRef);

    if (perfilDoc.exists()) {
      return perfilDoc.data() as Perfil;
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Unable to fetch user profile');
  }
};

// Update only specific fields of a profile (e.g., without changing the ID)
export const updateUserProfile = async (userId: string, updatedData: Partial<Perfil>) => {
  try {
    const perfilRef = doc(db, 'Perfiles', userId);
    await updateDoc(perfilRef, updatedData);
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Unable to update user profile');
  }
};

export const addUserToCommunity = async (communityId: string) => {
    try {
      console.log(`Buscando comunidad con ID: ${communityId}`);
  
      const communityRef = doc(db, 'Comunidades', communityId);  // Referencia al documento de la comunidad
      const communitySnap = await getDoc(communityRef);  // Obtener el documento
  
      if (communitySnap.exists()) {
        console.log('Comunidad encontrada, incrementando número de miembros...');
        
        await updateDoc(communityRef, {
          number_of_members: increment(1), 
        });
  
        console.log('Número de miembros incrementado correctamente.');
      } else {
        console.error('La comunidad con este ID no existe.');
      }
    } catch (error) {
      console.error('Error al agregar usuario a la comunidad: ', error);
    }
  };
