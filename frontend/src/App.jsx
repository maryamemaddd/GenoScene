import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadBox from './components/UploadBox';
import PredictionCard from './components/PredictionCard';
import FaceGenerator from './components/FaceGenerator';
import { Settings2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
    const [predictionData, setPredictionData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) fetchUser();
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`${API_URL}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                localStorage.removeItem('token');
                setToken('');
            }
        } catch (e) {
            console.error("Auth mapping offline");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    return (
        <div className="app-container">
            <div className="dna-mesh" />
            <Header user={user} logout={handleLogout} />

            <main className="main-content">
                <div className="animate-fade-up" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 className="scientific-gradient-text" style={{ textShadow: '0 0 30px rgba(6,182,212,0.3)' }}>AI-Powered Forensic DNA Phenotyping</h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                        Execute deterministic genetic trait classification and multi-modal phenotype mapping directly via single-upload assay sequences.
                    </p>
                </div>

                <div className="analysis-grid gap-1.5rem">
                    <div className="animate-fade-up delay-1">
                        <UploadBox onUploadSuccess={setPredictionData} token={token} apiUrl={API_URL} />
                    </div>

                    <div>
                        {predictionData ? (
                            <div className="animate-fade-up delay-1">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                                    <Settings2 style={{ color: 'var(--accent-primary)' }} />
                                    <h2 style={{ margin: 0 }}>Phenotypic Analysis Complete</h2>
                                </div>
                                <div className="results-grid">
                                    <PredictionCard title="Eye" data={predictionData.Eye} delayClass="delay-1" />
                                    <PredictionCard title="Hair" data={predictionData.Hair} delayClass="delay-2" />
                                    <PredictionCard title="Skin" data={predictionData.Skin} delayClass="delay-3" />
                                </div>
                            </div>
                        ) : (
                            <div className="glass-panel animate-fade-up delay-2" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', opacity: 0.6 }}>
                                <Settings2 size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', animation: 'spin 10s linear infinite', opacity: 0.2 }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>Neural Models Idle</h3>
                                <p style={{ textAlign: 'center', maxWidth: '350px' }}>Upload a .csv genetic sequence array to automatically execute classification protocols instantly.</p>
                            </div>
                        )}
                    </div>
                </div>

                {predictionData && (
                    <FaceGenerator data={predictionData} token={token} apiUrl={API_URL} />
                )}
            </main>
        </div>
    );
}

