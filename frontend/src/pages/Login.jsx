import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/login', { email, password });
            login(res.data.token, res.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.logo}>⚜️ Aurix</h1>
                <p style={styles.subtitle}>Sign in to your account</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            style={styles.input}
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={styles.link}>
                    No account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    card: { background: '#1a1a2e', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid #2a2a4a' },
    logo: { color: '#f0c040', textAlign: 'center', fontSize: '32px', margin: '0 0 8px' },
    subtitle: { color: '#888', textAlign: 'center', marginBottom: '24px' },
    error: { background: '#ff000022', border: '1px solid #ff4444', color: '#ff4444', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' },
    inputGroup: { marginBottom: '16px' },
    label: { display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '6px' },
    input: { width: '100%', padding: '12px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', background: '#f0c040', color: '#0f0f1a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' },
    link: { color: '#888', textAlign: 'center', marginTop: '16px', fontSize: '14px' }
};