import React, { useState } from 'react';
import { Store, LogIn, LogOut } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Modal } from '../ui/Modal';
import { LoginForm } from '../auth/LoginForm';

export function Header() {
  const { isAdmin, logout } = useShop();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <header className="navbar">


      <a href="">
        <div className="navbar-logo">
          <img src="https://application.colmexrp.com/logo.png" alt="Logo" className="logo" />
        </div>
      </a>
      <div>
        {isAdmin ? (
          <button
            onClick={logout}
            className="login-btn"
          >
            
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="login-btn"
          >
            
            <span>Admin Login</span>
          </button>
        )}
      </div>



      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Admin Login"
      >
        <LoginForm onSuccess={() => setShowLoginModal(false)} />
      </Modal>
    </header>
  );
}