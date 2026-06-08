function ProductCard({ product, onAddToCart, onOpenModal }) {
  const stars = Math.round(product.rating.rate);

  return (
    <div
      style={styles.card}
      className="food-card"
      onClick={() => onOpenModal(product)}
    >
      <div style={styles.imgWrap}>
        <img src={product.image} alt={product.title} style={styles.img} />
        <div style={styles.catBadge}>{product.category}</div>
      </div>
      <div style={styles.body}>
        <h3 style={styles.title}>{product.title}</h3>
        <div style={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: i < stars ? '#f59e0b' : '#d1d5db', fontSize: '13px' }}>★</span>
          ))}
          <span style={styles.ratingText}>{product.rating.rate} ({product.rating.count})</span>
        </div>
        <p style={styles.desc}>{product.description.substring(0, 70)}...</p>
        <div style={styles.footer}>
          <div>
            <p style={styles.priceLabel}>Harga</p>
            <p style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
          <button
            style={styles.addBtn}
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
          >
            + Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(120,53,15,0.08)', cursor: 'pointer',
    display: 'flex', flexDirection: 'column',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    border: '1px solid #fef3c7',
  },
  imgWrap: {
    position: 'relative', backgroundColor: '#fffbeb',
    height: '200px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    padding: '16px', overflow: 'hidden',
  },
  img: {
    width: '100%', height: '100%', objectFit: 'cover',
    borderRadius: '10px', transition: 'transform 0.3s ease',
  },
  catBadge: {
    position: 'absolute', bottom: '10px', left: '10px',
    backgroundColor: '#b45309', color: '#fff',
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '11px', fontWeight: '700',
    fontFamily: "'DM Sans', sans-serif",
  },
  body: {
    padding: '16px 18px 18px', flex: 1,
    display: 'flex', flexDirection: 'column', gap: '8px',
  },
  title: {
    margin: 0, fontSize: '15px', color: '#292524',
    fontFamily: "'Fraunces', serif", fontWeight: '700', lineHeight: '1.4',
  },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '2px' },
  ratingText: {
    fontSize: '12px', color: '#a16207', marginLeft: '6px',
    fontFamily: "'DM Sans', sans-serif", fontWeight: '600',
  },
  desc: {
    fontSize: '13px', color: '#78716c',
    lineHeight: '1.5', fontFamily: "'DM Sans', sans-serif", flex: 1,
  },
  footer: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-end', marginTop: 'auto',
    paddingTop: '10px', borderTop: '1px dashed #fde68a',
  },
  priceLabel: {
    fontSize: '10px', color: '#a16207', margin: '0 0 2px',
    fontFamily: "'DM Sans', sans-serif",
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  price: {
    fontSize: '18px', fontWeight: '700', color: '#78350f',
    fontFamily: "'Fraunces', serif", margin: 0,
  },
  addBtn: {
    backgroundColor: '#b45309', color: '#fffbeb', border: 'none',
    padding: '10px 18px', borderRadius: '12px', fontSize: '13px',
    fontWeight: '700', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
  },
};

export default ProductCard;