function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;
  const stars = Math.round(product.rating.rate);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <div style={styles.content}>
          <div style={styles.imgSection}>
            <img src={product.image} alt={product.title} style={styles.img} />
            <div style={styles.catPill}>{product.category}</div>
          </div>
          <div style={styles.info}>
            <h2 style={styles.title}>{product.title}</h2>
            <div style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: i < stars ? '#f59e0b' : '#d1d5db', fontSize: '20px' }}>★</span>
              ))}
              <span style={styles.ratingText}>
                {product.rating.rate} / 5 · {product.rating.count} ulasan
              </span>
            </div>
            <div style={styles.divider} />
            <p style={styles.descLabel}>Deskripsi Menu</p>
            <p style={styles.desc}>{product.description}</p>
            <div style={styles.divider} />
            <div style={styles.footer}>
              <div>
                <p style={styles.priceLabel}>Harga</p>
                <p style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
              <button
                style={styles.orderBtn}
                onClick={() => { onAddToCart(product); onClose(); }}
              >
                🍴 Tambah Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(41,37,36,0.7)', zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px', backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: '#fffbeb', borderRadius: '24px',
    width: '100%', maxWidth: '820px', maxHeight: '90vh',
    overflow: 'auto', position: 'relative',
    boxShadow: '0 30px 70px rgba(120,53,15,0.25)',
    border: '2px solid #fde68a',
  },
  closeBtn: {
    position: 'absolute', top: '16px', right: '18px',
    backgroundColor: '#fef3c7', border: 'none',
    width: '38px', height: '38px', borderRadius: '50%',
    fontSize: '22px', cursor: 'pointer', zIndex: 1,
    color: '#78350f', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  content: { display: 'flex', flexWrap: 'wrap' },
  imgSection: {
    width: '300px', minWidth: '260px', backgroundColor: '#fff',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '40px 30px 30px', gap: '16px',
    borderRight: '2px dashed #fde68a',
    borderRadius: '24px 0 0 24px',
  },
  img: {
    width: '220px', height: '220px',
    objectFit: 'cover', borderRadius: '16px',
  },
  catPill: {
    backgroundColor: '#b45309', color: '#fff',
    padding: '6px 18px', borderRadius: '20px',
    fontSize: '13px', fontWeight: '700',
    fontFamily: "'DM Sans', sans-serif",
  },
  info: {
    flex: 1, padding: '40px 36px', display: 'flex',
    flexDirection: 'column', gap: '14px', minWidth: '280px',
  },
  title: {
    margin: 0, fontSize: '22px', color: '#292524',
    lineHeight: '1.4', fontFamily: "'Fraunces', serif", fontWeight: '800',
  },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '3px' },
  ratingText: {
    fontSize: '13px', color: '#a16207', marginLeft: '8px',
    fontFamily: "'DM Sans', sans-serif", fontWeight: '600',
  },
  divider: { height: '1px', backgroundColor: '#fde68a', margin: '4px 0' },
  descLabel: {
    fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px',
    color: '#b45309', fontWeight: '700', fontFamily: "'DM Sans', sans-serif", margin: '0 0 4px',
  },
  desc: {
    color: '#57534e', lineHeight: '1.75', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
  },
  footer: {
    display: 'flex', alignItems: 'flex-end',
    justifyContent: 'space-between', marginTop: 'auto',
  },
  priceLabel: {
    fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px',
    color: '#a16207', fontFamily: "'DM Sans', sans-serif", margin: '0 0 4px',
  },
  price: {
    fontSize: '28px', fontWeight: '700', color: '#78350f',
    fontFamily: "'Fraunces', serif", margin: 0,
  },
  orderBtn: {
    backgroundColor: '#b45309', color: '#fffbeb', border: 'none',
    padding: '14px 26px', borderRadius: '14px', fontSize: '15px',
    fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
  },
};

export default ProductModal;