import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartToast from './components/CartToast';
import CartSidebar from './components/CartSidebar';
import foodData from './data/foodData';

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,800;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background-color: #fef9ee; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(16px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  .food-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 16px 36px rgba(120,53,15,0.16) !important;
  }
  .food-card:hover img { transform: scale(1.07); }
  input:focus, select:focus { outline: 2px solid #b45309; }
`;
document.head.appendChild(styleSheet);

const ITEMS_PER_PAGE = 8;

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setProducts(foodData);
    const cats = [...new Set(foodData.map(p => p.category))];
    setCategories(cats);
    setLoading(false);
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setSearchTerm('');
    if (cat === 'all') {
      setProducts(foodData);
    } else {
      setProducts(foodData.filter(p => p.category === cat));
    }
  };

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.title.substring(0, 28)}... ditambahkan!`);
  };

  const handleRemoveFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (loading) return (
    <div style={styles.loadingPage}>
      <div style={styles.loadingInner}>
        <div style={styles.spinner} />
        <p style={styles.loadingTitle}>Menyiapkan Menu...</p>
        <p style={styles.loadingHint}>Mohon tunggu sebentar 🍳</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={styles.errorPage}>
      <div style={styles.errorBox}>
        <p style={{ fontSize: '56px', marginBottom: '12px' }}>🍽️</p>
        <h2 style={styles.errorTitle}>Oops, Menu Tidak Tersedia</h2>
        <p style={styles.errorMsg}>{error}</p>
        <button style={styles.retryBtn} onClick={() => window.location.reload()}>
          🔄 Coba Lagi
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.navInner}>
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>🍜</span>
            <span style={styles.logoText}>FoodVault</span>
          </div>
          <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
            🛒 Keranjang
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>🌶️ Menu Hari Ini</p>
          <h1 style={styles.heroTitle}>Lapar? Kami Siap<br />Melayani Kamu!</h1>
          <p style={styles.heroSub}>Pilih dari berbagai menu lezat pilihan terbaik kami</p>
        </div>
        <div style={styles.heroDeco}>🍕🥘🍣🥗🍰🥤</div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controlsWrap}>
        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Cari menu favoritmu..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={styles.searchInput}
            />
          </div>
          <select
            value={sortOrder}
            onChange={e => { setSortOrder(e.target.value); setCurrentPage(1); }}
            style={styles.sortSelect}
          >
            <option value="default">📋 Urutan Default</option>
            <option value="asc">💰 Harga: Termurah</option>
            <option value="desc">💎 Harga: Termahal</option>
          </select>
        </div>

        <div style={styles.catRow}>
          <button
            style={selectedCategory === 'all' ? styles.catActive : styles.cat}
            onClick={() => handleCategoryChange('all')}
          >
            🍽️ Semua Menu
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              style={selectedCategory === cat ? styles.catActive : styles.cat}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COUNT */}
      <div style={styles.countRow}>
        <p style={styles.countText}>
          Menampilkan <strong>{paginated.length}</strong> dari{' '}
          <strong>{filtered.length}</strong> menu
          {searchTerm && ` untuk "${searchTerm}"`}
        </p>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div style={styles.noResultWrap}>
          <p style={{ fontSize: '48px' }}>😅</p>
          <p style={styles.noResultText}>Menu "{searchTerm}" tidak ditemukan.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {paginated.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onOpenModal={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={{ ...styles.pageBtn, opacity: currentPage === 1 ? 0.4 : 1 }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              style={currentPage === i + 1 ? styles.pageBtnActive : styles.pageBtn}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={{ ...styles.pageBtn, opacity: currentPage === totalPages ? 0.4 : 1 }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <CartSidebar
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
        />
      )}

      {toast && <CartToast message={toast} onClose={() => setToast(null)} />}

      <footer style={styles.footer}>
        <p>🍜 FoodVault — Tugas Praktikum 6 Pemrograman Web · Dibuat dengan ❤️</p>
      </footer>
    </div>
  );
}

const styles = {
  app: { minHeight: '100vh', backgroundColor: '#fef9ee', fontFamily: "'DM Sans', sans-serif" },
  loadingPage: {
    height: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef9ee',
  },
  loadingInner: { textAlign: 'center' },
  spinner: {
    width: '52px', height: '52px', margin: '0 auto 20px',
    border: '5px solid #fde68a', borderTop: '5px solid #b45309',
    borderRadius: '50%', animation: 'spin 0.85s linear infinite',
  },
  loadingTitle: {
    fontFamily: "'Fraunces', serif", fontSize: '22px',
    color: '#78350f', marginBottom: '6px', fontWeight: '700',
  },
  loadingHint: { color: '#a16207', fontSize: '14px' },
  errorPage: {
    height: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fef9ee', padding: '24px',
  },
  errorBox: {
    backgroundColor: '#fff', borderRadius: '24px',
    padding: '52px 40px', textAlign: 'center', maxWidth: '400px',
    boxShadow: '0 12px 40px rgba(120,53,15,0.12)', border: '2px solid #fde68a',
  },
  errorTitle: {
    fontFamily: "'Fraunces', serif", fontSize: '22px',
    color: '#78350f', marginBottom: '10px',
  },
  errorMsg: { color: '#78716c', marginBottom: '24px', lineHeight: '1.6', fontSize: '14px' },
  retryBtn: {
    backgroundColor: '#b45309', color: '#fffbeb', border: 'none',
    padding: '13px 30px', borderRadius: '12px', fontSize: '15px',
    fontWeight: '700', cursor: 'pointer',
  },
  navbar: {
    backgroundColor: '#78350f', position: 'sticky',
    top: 0, zIndex: 500, boxShadow: '0 3px 16px rgba(120,53,15,0.3)',
  },
  navInner: {
    maxWidth: '1400px', margin: '0 auto', padding: '0 28px',
    height: '66px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoIcon: { fontSize: '28px' },
  logoText: {
    color: '#fef9ee', fontFamily: "'Fraunces', serif",
    fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px',
  },
  cartBtn: {
    backgroundColor: '#fde68a', color: '#78350f', border: 'none',
    padding: '10px 22px', borderRadius: '12px', fontSize: '14px',
    fontWeight: '700', cursor: 'pointer', display: 'flex',
    alignItems: 'center', gap: '8px', fontFamily: "'DM Sans', sans-serif",
  },
  cartBadge: {
    backgroundColor: '#b45309', color: '#fff', borderRadius: '50%',
    width: '22px', height: '22px', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800',
  },
  hero: {
    backgroundColor: '#78350f',
    backgroundImage: 'radial-gradient(circle at 80% 50%, #92400e 0%, #78350f 60%)',
    padding: '56px 28px 72px', textAlign: 'center',
    position: 'relative', overflow: 'hidden',
  },
  heroContent: { position: 'relative', zIndex: 1 },
  heroEyebrow: {
    color: '#fcd34d', fontSize: '13px', fontWeight: '700',
    letterSpacing: '2px', textTransform: 'uppercase',
    fontFamily: "'DM Sans', sans-serif", marginBottom: '14px',
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif", fontSize: '48px',
    fontWeight: '800', color: '#fffbeb', lineHeight: '1.15', marginBottom: '14px',
  },
  heroSub: { color: '#fde68a', fontSize: '17px', fontFamily: "'DM Sans', sans-serif" },
  heroDeco: {
    position: 'absolute', bottom: '-10px', right: '-10px',
    fontSize: '64px', opacity: '0.12', letterSpacing: '8px', transform: 'rotate(-8deg)',
  },
  controlsWrap: { maxWidth: '1400px', margin: '-28px auto 0', padding: '0 28px' },
  controls: {
    backgroundColor: '#fff', borderRadius: '18px',
    boxShadow: '0 6px 24px rgba(120,53,15,0.12)',
    padding: '20px 24px', display: 'flex', flexWrap: 'wrap',
    gap: '14px', alignItems: 'center', border: '1px solid #fde68a',
  },
  searchWrap: {
    flex: '1 1 260px', position: 'relative',
    display: 'flex', alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: '14px', fontSize: '16px' },
  searchInput: {
    width: '100%', padding: '11px 14px 11px 40px',
    border: '2px solid #fde68a', borderRadius: '12px',
    fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
    backgroundColor: '#fffbeb', color: '#292524',
  },
  sortSelect: {
    padding: '11px 16px', border: '2px solid #fde68a',
    borderRadius: '12px', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    backgroundColor: '#fffbeb', color: '#78350f',
    fontWeight: '600', cursor: 'pointer',
  },
  catRow: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '14px' },
  cat: {
    padding: '9px 18px', backgroundColor: '#fff',
    border: '2px solid #fde68a', borderRadius: '24px',
    fontSize: '13px', cursor: 'pointer', fontWeight: '600',
    fontFamily: "'DM Sans', sans-serif", color: '#78350f',
  },
  catActive: {
    padding: '9px 18px', backgroundColor: '#78350f',
    border: '2px solid #78350f', borderRadius: '24px',
    fontSize: '13px', cursor: 'pointer', fontWeight: '700',
    fontFamily: "'DM Sans', sans-serif", color: '#fef9ee',
  },
  countRow: { maxWidth: '1400px', margin: '18px auto 0', padding: '0 28px' },
  countText: { color: '#a16207', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" },
  grid: {
    maxWidth: '1400px', margin: '16px auto',
    padding: '0 28px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '22px',
  },
  noResultWrap: { textAlign: 'center', padding: '80px 24px' },
  noResultText: {
    fontFamily: "'Fraunces', serif", fontSize: '20px',
    color: '#a16207', marginTop: '12px',
  },
  pagination: {
    display: 'flex', justifyContent: 'center',
    gap: '8px', padding: '36px 24px', flexWrap: 'wrap',
  },
  pageBtn: {
    padding: '10px 18px', backgroundColor: '#fff',
    border: '2px solid #fde68a', borderRadius: '12px',
    fontSize: '14px', cursor: 'pointer', fontWeight: '600',
    fontFamily: "'DM Sans', sans-serif", color: '#78350f',
  },
  pageBtnActive: {
    padding: '10px 18px', backgroundColor: '#78350f',
    border: '2px solid #78350f', borderRadius: '12px',
    fontSize: '14px', cursor: 'pointer', fontWeight: '700',
    fontFamily: "'DM Sans', sans-serif", color: '#fef9ee',
  },
  footer: {
    textAlign: 'center', padding: '32px 24px',
    color: '#a16207', fontSize: '13px',
    borderTop: '2px dashed #fde68a', marginTop: '24px',
    backgroundColor: '#fff', fontFamily: "'DM Sans', sans-serif",
  },
};