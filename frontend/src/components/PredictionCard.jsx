import React from 'react';
import ProbabilityBar from './ProbabilityBar';
import { Target, Activity } from 'lucide-react';

const traitColorMap = (tCategory, tLabel) => {
    const term = tLabel.toLowerCase();
    if (term.includes('brown')) return 'var(--trait-brown)';
    if (term.includes('blue')) return 'var(--trait-blue)';
    if (term.includes('black')) return 'var(--trait-black)';
    if (term.includes('blond')) return 'var(--trait-blonde)';
    if (term.includes('red')) return 'var(--trait-red)';
    if (term.includes('green') || term.includes('hazel')) return 'var(--trait-green)';
    if (term.includes('dark')) return 'var(--trait-dark)';
    if (term.includes('pale')) return 'var(--trait-pale)';
    if (term.includes('intermediate') || term.includes('olive')) return 'var(--trait-intermediate)';
    return 'var(--accent-primary)';
};

export default function PredictionCard({ title, data, delayClass }) {
    if (!data) return null;

    const tColor = traitColorMap(title, data.Top);

    return (
        <div className={`glass-panel glass-panel-hover animate-fade-up ${delayClass}`} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={18} style={{ color: 'var(--accent-primary)' }} />
                    Predicted {title} Color
                </h3>
                {data.Uncertainty && (
                    <span className="badge badge-warn">Uncertainty: {data.Uncertainty}</span>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="trait-indicator-large" style={{ background: tColor }} />
                <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{data.Top}</div>
                    <div style={{ color: tColor, fontWeight: 600, marginTop: '0.25rem' }}>{data['Confidence_%'].toFixed(1)}% Confidence</div>
                </div>
            </div>

            <ProbabilityBar
                distribution={data['Probabilities_%']}
                confidence={data['Confidence_%']}
                title={title}
                topTrait={data.Top}
            />

            {data.Entropy !== undefined && (
                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={14} /> <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sys_Entropy</span>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{data.Entropy.toFixed(4)}</span>
                </div>
            )}
        </div>
    );
}

