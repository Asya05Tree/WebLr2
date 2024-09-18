import React, { useState, useEffect } from 'react';
import './App.css';
import HeaderPart from './components/HeaderPart';
import MainPart from './components/MainPart';
import FooterPart from './components/FooterPart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    return storedLoginState ? JSON.parse(storedLoginState) : false;
  });
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    return storedSelectedProducts ? JSON.parse(storedSelectedProducts) : {};
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedBrands, setSelectedBrands] = useState({});

  const products = [
    { id: 1, name: "Корм для собак", brand: "Royal Canin" },
    { id: 2, name: "Іграшка для котів", brand: "Trixie" },
    { id: 3, name: "Ласощі для гризунів", brand: "Vitakraft" },
    { id: 4, name: "Шампунь для собак", brand: "8in1" },
    { id: 5, name: "Акваріум", brand: "Tetra" },
  ];
  const brands = [...new Set(products.map(product => product.brand))];

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleLoginToggle = (loginState) => {
    setIsLoggedIn(loginState);
    setShowLoginModal(false);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prevSelected => ({
      ...prevSelected,
      [productId]: !prevSelected[productId]
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.length > 20 || password.length > 20) {
      setLoginError("Логін та пароль повинні бути не більше 20 символів");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username) || !/^[a-zA-Z0-9]+$/.test(password)) {
      setLoginError("Логін та пароль повинні містити тільки англійські літери та цифри");
      return;
    }
    handleLoginToggle(true);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const filteredProducts = products.filter(product => !selectedBrands[product.brand]);

  return (
    <div className="App">
      <HeaderPart 
        isLoggedIn={isLoggedIn} 
        handleLoginToggle={handleLoginToggle} 
        setShowLoginModal={setShowLoginModal} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <MainPart 
        currentPage={currentPage}
        products={products}
        selectedProducts={selectedProducts}
        handleProductSelect={handleProductSelect}
        brands={brands}
        selectedBrands={selectedBrands}
        handleBrandToggle={handleBrandToggle}
        filteredProducts={filteredProducts}
      />
      <FooterPart />
      {showLoginModal && (
        <LoginModal 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loginError={loginError}
          handleLoginSubmit={handleLoginSubmit}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </div>
  );
}

function LoginModal({ username, setUsername, password, setPassword, loginError, handleLoginSubmit, setShowLoginModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Вхід</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username">Логін:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit">Увійти</button>
          <button type="button" onClick={() => setShowLoginModal(false)}>Скасувати</button>
        </form>
      </div>
    </div>
  );
}

export default App;