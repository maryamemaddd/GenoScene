import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryCard from '../components/HistoryCard';
import PredictionCard from '../components/PredictionCard';
import FaceGenerator from '../components/FaceGenerator';
import { Database, Network } from 'lucide-react';

export default function History({ token, apiUrl }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [detailData, setDetailData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, [token]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(response.data);
        } catch (err) {
            setError('Failed to fetch genomic history records.');
        } finally {
            setLoading(false);
        }
    };

    const loadDetail = async (id) => {
        try {
            setError(null);
            setDetailData(null);
            setSelectedId(id);
            const response = await axios.get(`${apiUrl}/history/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const p = response.data;
            const mapped = {
                Eye: { Top: p.eyeColor.label, 'Confidence_%': p.eyeColor.confidence, 'Probabilities_%': p.eyeColor.probabilities, Entropy: p.eyeColor.entropy, Uncertainty: p.eyeColor.uncertainty },
                Hair: { Top: p.hairColor.label, 'Confidence_%': p.hairColor.confidence, 'Probabilities_%': p.hairColor.probabilities, Entropy: p.hairColor.entropy, Uncertainty: p.hairColor.uncertainty },
                Skin: { Top: p.skinColor.label, 'Confidence_%': p.skinColor.confidence, 'Probabilities_%': p.skinColor.probabilities, Entropy: p.skinColor.entropy, Uncertainty: p.skinColor.uncertainty }
            };
            setDetailData(mapped);
        } catch (err) {
            setError('Failed to fetch detailed assay.');
            setSelectedId(null);
        }
    };

    if (!token) {
        return (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', marginTop: '3rem', maxWidth: '600px', margin: '3rem auto' }}>
                <Database size={56} style={{ color: 'var(--accent-primary)', opacity: 0.3, margin: '0 auto 1.5rem' }} />
                <h2 style={{ marginBottom: '0.5rem' }}>Authentication Integrity Required</h2>
                <p style={{ marginBottom: 0 }}>Database access to historical phenotypic models is restricted to authorized researchers. Please initialize identity link.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <div className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Network style={{ color: 'var(--accent-primary)' }} size={24} />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem' }}>Database History</h1>
                    <div style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Review previously processed phenotypic inference sequences.</div>
                </div>
            </div>

            {error && <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', marginBottom: '2rem', borderLeft: '4px solid #EF4444', borderRadius: '4px' }}>{error}</div>}

            {selectedId && detailData ? (
                <div className="animate-fade-up delay-1">
                    <button className="btn btn-secondary" onClick={() => setSelectedId(null)} style={{ marginBottom: '2rem' }}>
                        ← Return to Database Matrix
                    </button>

                    <div className="results-grid">
                        <PredictionCard title="Eye" data={detailData.Eye} delayClass="delay-1" />
                        <PredictionCard title="Hair" data={detailData.Hair} delayClass="delay-2" />
                        <PredictionCard title="Skin" data={detailData.Skin} delayClass="delay-3" />
                    </div>

                    <FaceGenerator data={detailData} token={token} apiUrl={apiUrl} />
                </div>
            ) : (
                <>
                    {loading ? (
                        <div className="scientific-loader" style={{ margin: '6rem auto' }}></div>
                    ) : history.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                            <Database size={64} style={{ color: 'var(--text-muted)', margin: '0 auto 1.5rem', opacity: 0.2 }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>No Sequences Found</h3>
                            <p style={{ margin: 0 }}>You have not executed any forensic AI runs across the neural network yet.</p>
                        </div>
                    ) : (
                        <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {history.map(record => (
                                <HistoryCard key={record._id} prediction={record} onClick={() => loadDetail(record._id)} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

