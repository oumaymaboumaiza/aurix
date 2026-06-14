import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import WalletCard from '../components/WalletCard';
import TradePanel from '../components/TradePanel';
import TransactionTable from '../components/TransactionTable';
import AIAssistant from '../components/AIAssistant';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [walletRes, txRes] = await Promise.all([
                api.get('/wallet'),
                api.get('/transactions')
            ]);
            setWallet(walletRes.data);
            setTransactions(txRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const [walletRes, txRes] = await Promise.all([
                    api.get('/wallet'),
                    api.get('/transactions')
                ]);
                if (isMounted) {
                    setWallet(walletRes.data);
                    setTransactions(txRes.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, []);

    if (loading) return (
        <div style={styles.loading}>
            <p style={{ color: '#f0c040' }}>Loading...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.logo}>⚜️ Aurix</h1>
                <div style={styles.headerRight}>
                    <span style={styles.userName}>👤 {user?.full_name || user?.email}</span>
                    <button style={styles.logoutBtn} onClick={logout}>Logout</button>
                </div>
            </div>

            {/* Wallet Cards */}
            <WalletCard wallet={wallet} />

            {/* Trade + AI */}
            <div style={styles.row}>
                <TradePanel onSuccess={fetchData} />
                <AIAssistant />
            </div>

            {/* Transactions */}
            <TransactionTable transactions={transactions} />
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', background: '#0f0f1a', padding: '24px', fontFamily: 'sans-serif' },
    loading: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
    logo: { color: '#f0c040', margin: 0, fontSize: '28px' },
    headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
    userName: { color: '#aaa', fontSize: '14px' },
    logoutBtn: { padding: '8px 16px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#aaa', cursor: 'pointer', fontSize: '14px' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }
};