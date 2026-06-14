export default function WalletCard({ wallet }) {
    if (!wallet) return null;

    return (
        <div style={styles.grid}>
            <div style={styles.card}>
                <p style={styles.label}>💶 EUR Balance</p>
                <p style={styles.value}>{wallet.eur_balance.toFixed(2)} <span style={styles.unit}>EUR</span></p>
            </div>
            <div style={styles.card}>
                <p style={styles.label}>🥇 Gold Balance</p>
                <p style={styles.value}>{wallet.gold_balance.toFixed(4)} <span style={styles.unit}>g</span></p>
            </div>
            <div style={styles.card}>
                <p style={styles.label}>📈 Gold Price</p>
                <p style={styles.value}>{wallet.gold_price} <span style={styles.unit}>EUR/g</span></p>
            </div>
            <div style={{...styles.card, border: '1px solid #f0c04044'}}>
                <p style={styles.label}>💼 Portfolio Value</p>
                <p style={{...styles.value, color: '#f0c040'}}>{wallet.portfolio_value.toFixed(2)} <span style={styles.unit}>EUR</span></p>
            </div>
        </div>
    );
}

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
    card: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' },
    label: { color: '#888', fontSize: '13px', margin: '0 0 8px' },
    value: { color: '#fff', fontSize: '24px', fontWeight: 'bold', margin: 0 },
    unit: { fontSize: '14px', color: '#888', fontWeight: 'normal' }
};