import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>My Application</h1>
        {/* Add navigation links or other header content here */}
      </header>
      <main className="main-content">
        {children} {/* Render the page content here */}
      </main>
      <footer className="footer">
        <p>&copy; 2024 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;
