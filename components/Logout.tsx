import React from 'react';
import { useClerk } from '@clerk/clerk-react';

const LogoutButton = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <button onClick={handleLogout} className="btn">
      Cerrar sesión ❌
    </button>
  );
};

export default LogoutButton;
