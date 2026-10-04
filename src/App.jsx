import { useState } from 'react'

function App() {
  const [page, setPage] = useState('home')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([
    { amount: 1200, status: 'SAFE', time: '10:32 AM' },
    { amount: 75000, status: 'FRAUD', time: '09:15 AM' },
  ])

  const checkFraud = async () => {
    try {
      const res = await fetch('https://finshield-upi-fraud-detector-1.onrender.com/predict', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      })
      const data = await res.json()
      setResult(data.prediction)
      const st = data.prediction.includes('FRAUD') ? 'FRAUD' : 'SAFE'
      setHistory([{ amount, status: st, time: 'Just now' }, ...history])
    } catch { setResult('Backend OFF 🔴') }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', fontFamily: 'sans-serif' }}>

      {/* LEFT COLUMN - FEATURES */}
      <div style={{ width: '220px', background: '#0f172a', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: 'white', margin: '0 0 30px 0', fontSize: '22px', fontWeight: 'bold' }}>🛡️ FinShield</h1>

        <button onClick={() => setPage('home')} style={{ padding: '12px', marginBottom: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', background: page === 'home' ? '#2563eb' : '#1e293b', color: 'white' }}>🏠 Home</button>
        <button onClick={() => setPage('dashboard')} style={{ padding: '12px', marginBottom: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', background: page === 'dashboard' ? '#2563eb' : '#1e293b', color: 'white' }}>📊 Dashboard</button>
        <button onClick={() => setPage('accuracy')} style={{ padding: '12px', marginBottom: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', background: page === 'accuracy' ? '#2563eb' : '#1e293b', color: 'white' }}>🎯 Accuracy</button>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, padding: '20px' }}>
        {page === 'home' && (
          <div style={{ maxWidth: '600px' }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '20px' }}>
              <h2 style={{ marginTop: 0 }}>Fraud Checker</h2>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter Amount ₹" style={{ width: '100%', padding: '15px', fontSize: '18px', borderRadius: '10px', border: '2px solid #ddd' }} />
              <button onClick={checkFraud} style={{ width: '100%', padding: '15px', marginTop: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Check Fraud Risk</button>
              {result && <div style={{ marginTop: '15px', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', background: result.includes('FRAUD') ? '#fee2e2' : '#dcfce7' }}>{result}</div>}
            </div>
            <div style={{ background: 'white', marginTop: '20px', padding: '20px', borderRadius: '20px' }}>
              <h3>Recent History</h3>
              {history.map((h, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}><span>₹{h.amount} - {h.time}</span><span style={{ fontWeight: 'bold', color: h.status === 'FRAUD' ? 'red' : 'green' }}>{h.status}</span></div>))}
            </div>
          </div>
        )}

        {page === 'dashboard' && (
          <div>
            <h2>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px' }}><p>Total</p><h1>12,847</h1></div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px' }}><p>Fraud</p><h1 style={{ color: 'red' }}>184</h1></div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '15px' }}><p>Saved</p><h1 style={{ color: 'green' }}>₹42.5L</h1></div>
            </div>
          </div>
        )}

        {page === 'accuracy' && (
          <div style={{ maxWidth: '400px', background: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', border: '8px solid #22c55e', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '22px' }}>98.5%</div>
            <h3>Model Accuracy</h3>
            <p>Precision: 97.2% | Recall: 96.8%</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default App
