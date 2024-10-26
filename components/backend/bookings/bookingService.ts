import { db } from '@/components/backend/databaseController/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

interface Reservas {
    id: number; 
    booking_date: Date;
    serialId: string;
    booking_type: string;
}

// Colección de reservas
const reservasCollection = collection(db, 'Reservas');

// Crear una nueva reserva
export const crearReserva = async (reserva: Omit<Reservas, 'id'>) => {
    try {
        const nuevaReserva: Reservas = { ...reserva, id: Date.now() }; // Usar la fecha como ID simple
        await addDoc(reservasCollection, nuevaReserva);
        console.log('Reserva creada con ID: ', nuevaReserva.id);
    } catch (e) {
        console.error('Error al crear la reserva: ', e);
    }
};

// Leer todas las reservas
export const obtenerReservas = async (): Promise<Reservas[]> => {
    try {
        const snapshot = await getDocs(reservasCollection);
        const reservas: Reservas[] = [];
        snapshot.forEach(doc => {
            const data = doc.data() as Reservas;
            reservas.push({ ...data, id: data.id }); // Asumimos que el id ya está asignado correctamente
        });
        return reservas;
    } catch (e) {
        console.error('Error al obtener las reservas: ', e);
        return [];
    }
};

// Leer una reserva por ID
export const obtenerReservaPorId = async (id: number): Promise<Reservas | null> => {
    try {
        const q = query(reservasCollection, where('id', '==', id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const docData = snapshot.docs[0].data() as Reservas;
            return { ...docData, id: docData.id };
        } else {
            console.log('No se encontró la reserva');
            return null;
        }
    } catch (e) {
        console.error('Error al obtener la reserva: ', e);
        return null;
    }
};

// Actualizar una reserva
export const actualizarReserva = async (id: number, reservaActualizada: Partial<Omit<Reservas, 'id'>>) => {
    try {
        const q = query(reservasCollection, where('id', '==', id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const docRef = doc(reservasCollection, snapshot.docs[0].id);
            await updateDoc(docRef, reservaActualizada);
            console.log('Reserva actualizada');
        } else {
            console.log('Reserva no encontrada para actualizar');
        }
    } catch (e) {
        console.error('Error al actualizar la reserva: ', e);
    }
};

// Eliminar una reserva
export const eliminarReserva = async (id: number) => {
    try {
        const q = query(reservasCollection, where('id', '==', id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const docRef = doc(reservasCollection, snapshot.docs[0].id);
            await deleteDoc(docRef);
            console.log('Reserva eliminada');
        } else {
            console.log('Reserva no encontrada para eliminar');
        }
    } catch (e) {
        console.error('Error al eliminar la reserva: ', e);
    }
};

// Leer reservas por serialId
export const obtenerReservasPorSerialId = async (serialId: string): Promise<Reservas[]> => {
    try {
        const q = query(reservasCollection, where('serialId', '==', serialId));
        const snapshot = await getDocs(q);
        const reservas: Reservas[] = [];
        snapshot.forEach(doc => {
            const data = doc.data() as Reservas;
            reservas.push({ ...data, id: data.id });
        });
        return reservas;
    } catch (e) {
        console.error('Error al obtener las reservas por serialId: ', e);
        return [];
    }
};
