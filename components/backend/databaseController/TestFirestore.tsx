"use client";

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/components/backend/databaseController/firebase'; // Importamos Firestore desde el archivo de configuración
import { error } from 'console';

const TestFirestore: React.FC = () => {
  const [message, setMessage] = useState('Esperando resultado...');


  useEffect(() => {
    const testFirestoreConnection = async () => {
      try {
        // Agregar un documento de prueba a la colección "test"
        await setDoc(doc(db, 'test', 'test-doc'), {
          prueba: 'La base de datos fue inicializada correctamente',
          timestamp: new Date()
        });
        setMessage('¡La base de datos está conectada y el documento de prueba fue agregado!');
      } catch (error: any) {
        setMessage('Error al conectar con la base de datos: ' + error.message);
      }
    };

    testFirestoreConnection();
  }, []);

  return <p>{message}</p>;
};

export default TestFirestore;
