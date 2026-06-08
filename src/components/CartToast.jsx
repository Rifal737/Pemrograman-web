import { useEffect } from 'react';

function CartToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.toast}>
      <span style={styles.icon}>🍽️</span>
      <span>{message}</span>
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    backgroundColor: '#b45309',
    color: '#fffbeb',
    padding: '14px 22px',
    borderRadius: '14px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 8px 30px rgba(180,83,9,0.45)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    maxWidth: '320px',
  },
  icon: { fontSize: '20px' },
};

export default CartToast;