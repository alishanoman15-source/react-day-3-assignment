import React, { useState } from 'react';
import '../App.css';
import { MdSearch, MdManageSearch, MdSentimentDissatisfied } from 'react-icons/md';

function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$89' },
    { id: 2, name: 'Running Shoes', category: 'Sports', price: '$55' },
    { id: 3, name: 'Smart Watch', category: 'Electronics', price: '$244' },
    { id: 4, name: 'Coffee Mug', category: 'Home', price: '$12' },
    { id: 5, name: 'Gaming Mouse', category: 'Electronics', price: '$45' }
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Electronics':
        return 'category-pill--electronics';
      case 'Sports':
        return 'category-pill--sports';
      default:
        return 'category-pill--home';
    }
  };

  return (
    <div className="premium-card">
      <h2 className="section-title">
        <MdSearch style={{ color: '#0ea5e9', fontSize: '28px' }} />
        Product Search
      </h2>
      <p className="section-subtitle">Live filtering with a polished product grid and category pills.</p>

      <div className="search-container">
        <span className="search-icon">
          <MdManageSearch style={{ color: '#94a3b8', fontSize: '20px' }} />
        </span>
        <input
          type="text"
          placeholder="Search products by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="list-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={product.id} className="list-item product-card" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="item-info">
                <h4 className="item-name">{product.name}</h4>
                <p className="item-detail">{product.category}</p>
              </div>
              <div className="item-info" style={{ alignItems: 'flex-end' }}>
                <div className={`category-pill ${getCategoryClass(product.category)}`}>{product.category}</div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <MdSentimentDissatisfied style={{ fontSize: '28px', marginBottom: '6px' }} />
            <div>No products found matching “{searchTerm}”.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSearch;