import React, { useState } from 'react';
import axios from 'axios';
import { Fingerprint, AlertCircle } from 'lucide-react';

export default function FaceGenerator({ data, token, apiUrl }) {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateFace = async () => {
        setIsLoading(true);
        setError('');

        try {
            const config = {
                responseType: 'blob',
                timeout: 130000
            };
            if (token) config.headers = { 'Authorization': `Bearer ${token}` };

            const response = await axios.post(`${apiUrl}/face-generation`, data, config);
            const objectUrl = URL.createObjectURL(response.data);
            setImageUrl(objectUrl);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.type === 'application/json') {
                const text = await err.response.data.text();
                try {
                    const parsed = JSON.parse(text);
                    setError(parsed.detail || 'Neural timeout sequence intercepted.');
                } catch {
                    setError('Face Generation Pipeline Terminated.');
                }
            } else {
                setError(err.message || 'Network disruption during generation.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-panel face-gen-panel animate-fade-up delay-3" style={{ padding: '2.5rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>

                <div style={{ flex: '1 1 350px' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Fingerprint style={{ color: 'var(--accent-primary)' }} size={28} /> Visual Representation
                    </h2>
                    <p style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Synthesize a 1024x1024 photorealistic composite utilizing the SDXL architectural layout framework mapping exactly to predicted probabilities.
                    </p>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
                        <div className="label-subtle" style={{ marginBottom: '0.75rem' }}>Final Phenotype Colors</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Eye</span>
                                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="legend-dot" style={{ background: 'var(--text-muted)' }} /> {data.Eye?.Top}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Hair</span>
                                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="legend-dot" style={{ background: 'var(--text-muted)' }} /> {data.Hair?.Top}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Skin</span>
                                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="legend-dot" style={{ background: 'var(--text-muted)' }} /> {data.Skin?.Top}</span>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={generateFace} disabled={isLoading} style={{ width: '100%' }}>
                        {isLoading ? 'Generating Visual Representation...' : 'Generate Picture'}
                        <Fingerprint size={18} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                        <AlertCircle size={20} style={{ flexShrink: 0, color: 'var(--accent-secondary)' }} />
                        <span style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                            <strong>Scientific Notice:</strong> This visual representation is based strictly on predicted phenotype traits and is not intended for direct biometric identification.
                        </span>
                    </div>

                    {error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', color: '#FCA5A5', borderLeft: '4px solid #EF4444', borderRadius: '4px' }}>
                            {error}
                        </div>
                    )}
                </div>

                <div style={{ flex: '1 1 350px' }}>
                    <div className="face-img-container" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Generated Phenotype Visual Representation" className="animate-fade-up" />
                        ) : isLoading ? (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                <div className="scientific-loader"></div>
                                <div className="scientific-gradient-text" style={{ fontWeight: 600, letterSpacing: '2px', animation: 'pulse 2s infinite' }}>SYNTHESIZING</div>
                            </div>
                        ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                <Fingerprint size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                                <div>Awaiting Generation Phase</div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

