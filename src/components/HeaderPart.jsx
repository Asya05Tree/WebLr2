import React from 'react';

function HeaderPart({ isLoggedIn, handleLoginToggle, setShowLoginModal, currentPage, setCurrentPage }) {
  return (
    <>
      <header className="header">
        <h1>Зоомагазин</h1>
        {isLoggedIn ? (
          <button onClick={() => handleLoginToggle(false)} className="button">
            Вийти
          </button>
        ) : (
          <button onClick={() => setShowLoginModal(true)} className="button">
            Увійти
          </button>
        )}
      </header>
      <nav className="nav">
        <button className={`nav-button ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>Головна</button>
        <button className={`nav-button ${currentPage === 'brands' ? 'active' : ''}`} onClick={() => setCurrentPage('brands')}>Бренди</button>
      </nav>
    </>
  );
}

export default HeaderPart;