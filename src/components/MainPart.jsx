import React from 'react';

function MainPart({ currentPage, products, selectedProducts, handleProductSelect, brands, selectedBrands, handleBrandToggle, filteredProducts }) {
  const renderProductItem = (product) => (
    <div 
      key={product.id} 
      className={`product ${selectedProducts[product.id] ? 'selected' : ''}`}
      onClick={() => handleProductSelect(product.id)}
    >
      <h3>{product.name}</h3>
      <p>Бренд: {product.brand}</p>
      <input
        type="checkbox"
        checked={selectedProducts[product.id] || false}
        onChange={() => {}}
        style={{ display: 'none' }}
      />
    </div>
  );

  const renderHomePage = () => (
    <main className="home-page">
      <h2>Ласкаво просимо до нашого зоомагазину!</h2>
      <div className="selected-count">
        Обрано товарів: {Object.values(selectedProducts).filter(Boolean).length}
      </div>
      <div className="product-list">
        {products.map(renderProductItem)}
      </div>
    </main>
  );

  const renderBrandsPage = () => (
    <div className="brands-page">
      <h2>Бренди</h2>
      <div className="brand-list">
        {brands.map(brand => (
          <label key={brand} className="brand-item">
            <input
              type="checkbox"
              checked={!selectedBrands[brand]}
              onChange={() => handleBrandToggle(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
      <h3>Товари:</h3>
      <ul className="filtered-products">
        {filteredProducts.map(product => (
          <li key={product.id}>{product.name} - {product.brand}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {currentPage === 'home' ? renderHomePage() : renderBrandsPage()}
    </>
  );
}

export default MainPart;