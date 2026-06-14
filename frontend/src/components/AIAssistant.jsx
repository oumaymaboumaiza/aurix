import { useState } from 'react';
import api from '../api/axios';

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! I am your Aurix assistant. Ask me anything about your portfolio, gold prices, or transactions!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);
        try {
            const res = await api.post('/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, { role: 'ai', text: res.data.response }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, an error occurred.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div style={styles.card}>
            <h3 style={styles.title}>🤖 AI Assistant</h3>
            <div style={styles.messages}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ ...styles.msg, ...(msg.role === 'user' ? styles.userMsg : styles.aiMsg) }}>
                        {msg.role === 'ai' && <span style={styles.aiIcon}>🤖 </span>}
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={styles.aiMsg}>🤖 Thinking...</div>}
            </div>
            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                />
                <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>➤</button>
            </div>
            <div style={styles.suggestions}>
                {['Buy advice', 'My portfolio', 'Gold price'].map(s => (
                    <button key={s} style={styles.chip} onClick={() => setInput(s)}>{s}</button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    card: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' },
    title: { color: '#fff', margin: '0 0 16px', fontSize: '18px' },
    messages: { flex: 1, minHeight: '200px', maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' },
    msg: { padding: '10px 14px', borderRadius: '12px', fontSize: '13px', lineHeight: '1.5', maxWidth: '90%' },
    aiMsg: { background: '#0f0f1a', border: '1px solid #2a2a4a', color: '#ddd', alignSelf: 'flex-start' },
    userMsg: { background: '#f0c04022', border: '1px solid #f0c04044', color: '#f0c040', alignSelf: 'flex-end' },
    aiIcon: { fontSize: '14px' },
    inputRow: { display: 'flex', gap: '8px', marginBottom: '10px' },
    input: { flex: 1, padding: '10px 14px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#fff', fontSize: '14px' },
    sendBtn: { padding: '10px 16px', background: '#f0c040', border: 'none', borderRadius: '8px', color: '#0f0f1a', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
    suggestions: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    chip: { padding: '4px 12px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '20px', color: '#888', cursor: 'pointer', fontSize: '12px' }
};