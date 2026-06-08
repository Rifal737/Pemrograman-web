function CartSidebar({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.sidebar} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <p style={styles.headerSub}>Pesanan Kamu</p>
            <h2 style={styles.headerTitle}>🛒 Keranjang</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.emptyWrap}>
            <p style={styles.emptyIcon}>🍽️</p>
            <p style={styles.emptyText}>Belum ada pesanan.</p>
            <p style={styles.emptyHint}>Yuk pilih menu favoritmu!</p>
          </div>
        ) : (
          <>
            <div style={styles.items}>
              {cart.map(item => (
                <div key={item.id} style={styles.item}>
                  <div style={styles.imgWrap}>
                    <img src={item.image} alt={item.title} style={styles.img} />
                  </div>
                  <div style={styles.info}>
                    <p style={styles.catLabel}>{item.category}</p>
                    <p style={styles.itemTitle}>{item.title.substring(0, 35)}...</p>
                    <div style={styles.priceRow}>
                      <span style={styles.itemPrice}>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                      <span style={styles.qty}>× {item.qty}</span>
                    </div>
                  </div>
                  <button style={styles.removeBtn} onClick={() => onRemove(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div style={styles.footer}>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total Pesanan</span>
                <span style={styles.totalAmount}>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <button style={styles.checkoutBtn}>🍴 Pesan Sekarang</button>
              <p style={styles.footerNote}>Estimasi siap dalam 15–30 menit</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 2000,
    display: 'flex', justifyContent: 'flex-end',
  },
  sidebar: {
    width: '400px', backgroundColor: '#fffbeb', height: '100%',
    display: 'flex', flexDirection: 'column',
    boxShadow: '-8px 0 40px rgba(0,0,0,0.18)',
    animation: 'slideInRight 0.3s ease',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '24px 24px 20px', backgroundColor: '#78350f',
    borderBottom: '3px solid #b45309',
  },
  headerSub: {
    color: '#fcd34d', fontSize: '11px', fontFamily: "'DM Sans', sans-serif",
    textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px',
  },
  headerTitle: { color: '#fff', fontFamily: "'Fraunces', serif", fontSize: '22px', margin: 0 },
  closeBtn: {
    background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
    width: '36px', height: '36px', borderRadius: '50%',
    fontSize: '22px', cursor: 'pointer', lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  emptyWrap: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '8px',
  },
  emptyIcon: { fontSize: '56px' },
  emptyText: { fontFamily: "'Fraunces', serif", fontSize: '20px', color: '#78350f', fontWeight: '700' },
  emptyHint: { fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#a16207' },
  items: { flex: 1, overflowY: 'auto', padding: '16px' },
  item: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '14px 0', borderBottom: '1px dashed #fde68a',
  },
  imgWrap: {
    width: '64px', height: '64px', borderRadius: '12px',
    backgroundColor: '#fff', overflow: 'hidden', flexShrink: 0,
    border: '1px solid #fde68a',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { flex: 1, minWidth: 0 },
  catLabel: {
    fontSize: '10px', color: '#b45309', fontWeight: '700',
    fontFamily: "'DM Sans', sans-serif", marginBottom: '3px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  },
  itemTitle: {
    margin: '0 0 6px', fontSize: '13px', color: '#292524',
    fontFamily: "'DM Sans', sans-serif", fontWeight: '600', lineHeight: '1.3',
  },
  priceRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  itemPrice: { fontFamily: "'Fraunces', serif", fontSize: '15px', color: '#78350f', fontWeight: '700' },
  qty: { fontSize: '12px', color: '#a16207', fontFamily: "'DM Sans', sans-serif" },
  removeBtn: {
    background: '#fee2e2', border: 'none', color: '#ef4444',
    width: '28px', height: '28px', borderRadius: '50%',
    fontSize: '12px', cursor: 'pointer', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  footer: { padding: '20px 24px', borderTop: '2px solid #fde68a' },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  totalLabel: { fontFamily: "'DM Sans', sans-serif", color: '#78350f', fontSize: '14px', fontWeight: '600' },
  totalAmount: { fontFamily: "'Fraunces', serif", fontSize: '22px', color: '#78350f', fontWeight: '700' },
  checkoutBtn: {
    width: '100%', padding: '15px', backgroundColor: '#b45309',
    color: '#fffbeb', border: 'none', borderRadius: '14px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif ", marginBottom: '10px',
  },
  footerNote: { textAlign: 'center', fontSize: '12px', color: '#a16207', fontFamily: "'DM Sans', sans-serif", marginTop: '10px' },
};

export default CartSidebar;