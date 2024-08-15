import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Bonnie - The Friendly Chatbot</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p className="m-0">&copy; Ximena Gdur - 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
