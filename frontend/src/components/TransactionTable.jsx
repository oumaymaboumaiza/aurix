export default function TransactionTable({ transactions }) {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>📋 Transaction History</h3>
            {transactions.length === 0 ? (
                <p style={styles.empty}>No transactions yet</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>EUR Amount</th>
                            <th style={styles.th}>Gold Amount</th>
                            <th style={styles.th}>Price/g</th>
                            <th style={styles.th}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.badge,
                                        background: tx.type === 'buy' ? '#22c55e22' : '#ef444422',
                                        color: tx.type === 'buy' ? '#22c55e' : '#ef4444',
                                        border: `1px solid ${tx.type === 'buy' ? '#22c55e' : '#ef4444'}`
                                    }}>
                                        {tx.type === 'buy' ? '🛒 Buy' : '💰 Sell'}
                                    </span>
                                </td>
                                <td style={styles.td}>{parseFloat(tx.eur_amount).toFixed(2)} EUR</td>
                                <td style={styles.td}>{parseFloat(tx.gold_amount).toFixed(4)} g</td>
                                <td style={styles.td}>{tx.price_per_gram} EUR</td>
                                <td style={styles.td}>{new Date(tx.created_at).toLocaleString('en-GB')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const styles = {
    card: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
    title: { color: '#fff', margin: '0 0 20px', fontSize: '18px' },
    empty: { color: '#888', textAlign: 'center', padding: '20px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { color: '#888', fontSize: '13px', padding: '10px', textAlign: 'left', borderBottom: '1px solid #2a2a4a' },
    tr: { borderBottom: '1px solid #1f1f3a' },
    td: { color: '#fff', fontSize: '14px', padding: '12px 10px' },
    badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }
};