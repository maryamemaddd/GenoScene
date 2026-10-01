import React from 'react';
import { Clock, Hash } from 'lucide-react';

export default function HistoryCard({ prediction, onClick }) {
    if (!prediction) return null;

    const date = new Date(prediction.createdAt).toLocaleString();

    return (
        <div className="glass-panel glass-panel-hover" style={{ padding: '1.75rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onClick={onClick}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Clock size={16} style={{ color: 'var(--accent-primary)' }} /> Sequence Complete
                </div>
                <div className="badge badge-info">{date}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <div className="label-subtle" style={{ marginBottom: '0.5rem' }}>EYE</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{prediction.eyeColor.label || 'N/A'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <div className="label-subtle" style={{ marginBottom: '0.5rem' }}>HAIR</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{prediction.hairColor.label || 'N/A'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <div className="label-subtle" style={{ marginBottom: '0.5rem' }}>SKIN</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{prediction.skinColor.label || 'N/A'}</div>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace' }}>
                    <Hash size={14} /> {prediction._id.slice(-8)}
                </span>
                <span className="scientific-gradient-text" style={{ fontWeight: 600 }}>Expand Details →</span>
            </div>
        </div>
    );
}

