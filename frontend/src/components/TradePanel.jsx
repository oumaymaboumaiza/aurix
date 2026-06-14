import { useState } from 'react';
import api from '../api/axios';

export default function TradePanel({ onSuccess }) {
    const [tab, setTab] = useState('buy');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleTrade = async () => {
        setLoading(true);
        setMessage('');
        setError('');
        try {
            if (tab === 'buy') {
                const res = await api.post('/buy', { eur_amount: parseFloat(amount) });
                setMessage(`✅ Purchase successful! You received ${res.data.gold_bought.toFixed(4)}g of gold`);
            } else {
                const res = await api.post('/sell', { gold_amount: parseFloat(amount) });
                setMessage(`✅ Sale successful! You received ${res.data.eur_received.toFixed(2)} EUR`);
            }
            setAmount('');
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Transaction error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.card}>
            <h3 style={styles.title}>💱 Buy / Sell</h3>
            <div style={styles.tabs}>
                <button
                    style={{ ...styles.tab, ...(tab === 'buy' ? styles.tabActive : {}) }}
                    onClick={() => { setTab('buy'); setMessage(''); setError(''); }}>
                    Buy
                </button>
                <button
                    style={{ ...styles.tab, ...(tab === 'sell' ? styles.tabActiveSell : {}) }}
                    onClick={() => { setTab('sell'); setMessage(''); setError(''); }}>
                    Sell
                </button>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    {tab === 'buy' ? 'EUR amount to invest' : 'Gold amount to sell (g)'}
                </label>
                <input
                    style={styles.input}
                    type="number"
                    placeholder={tab === 'buy' ? 'e.g. 100' : 'e.g. 1.5'}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    min="0"
                />
            </div>
            {amount > 0 && (
                <div style={styles.preview}>
                    {tab === 'buy'
                        ? `≈ ${(amount / 65).toFixed(4)}g of gold`
                        : `≈ ${(amount * 65).toFixed(2)} EUR`
                    }
                </div>
            )}
            {message && <div style={styles.success}>{message}</div>}
            {error && <div style={styles.error}>{error}</div>}
            <button
                style={{ ...styles.button, background: tab === 'buy' ? '#22c55e' : '#ef4444' }}
                onClick={handleTrade}
                disabled={loading || !amount}>
                {loading ? 'Processing...' : tab === 'buy' ? '🛒 Buy Gold' : '💰 Sell Gold'}
            </button>
        </div>
    );
}

const styles = {
    card: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' },
    title: { color: '#fff', margin: '0 0 20px', fontSize: '18px' },
    tabs: { display: 'flex', gap: '8px', marginBottom: '20px' },
    tab: { flex: 1, padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#888', cursor: 'pointer', fontSize: '14px' },
    tabActive: { background: '#22c55e22', border: '1px solid #22c55e', color: '#22c55e' },
    tabActiveSell: { background: '#ef444422', border: '1px solid #ef4444', color: '#ef4444' },
    inputGroup: { marginBottom: '12px' },
    label: { display: 'block', color: '#aaa', fontSize: '13px', marginBottom: '6px' },
    input: { width: '100%', padding: '12px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
    preview: { background: '#f0c04011', border: '1px solid #f0c04033', borderRadius: '8px', padding: '10px', color: '#f0c040', fontSize: '14px', textAlign: 'center', marginBottom: '12px' },
    success: { background: '#22c55e22', border: '1px solid #22c55e', color: '#22c55e', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' },
    error: { background: '#ff000022', border: '1px solid #ff4444', color: '#ff4444', padding: '10px', borderRadius: '8px', marginBottom: '12px', fontSize: '13px' },
    button: { width: '100%', padding: '12px', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }
};