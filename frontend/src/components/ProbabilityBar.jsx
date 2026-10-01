import React from 'react';

const getColor = (tLabel) => {
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

export default function ProbabilityBar({ distribution, confidence, topTrait }) {
    if (!distribution) return null;

    const arr = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

    return (
        <div style={{ marginTop: 'auto' }}>
            <div className="label-subtle" style={{ marginBottom: '0.75rem' }}>Probability Distribution</div>

            <div className="prob-segment-track">
                {arr.map(([label, prob], idx) => (
                    <div
                        key={idx}
                        className="prob-segment"
                        style={{
                            width: `${prob}%`,
                            background: getColor(label),
                            borderRight: idx !== arr.length - 1 ? '2px solid var(--bg-card)' : 'none',
                            opacity: label === topTrait ? 1 : 0.6
                        }}
                        title={`${label}: ${prob.toFixed(1)}%`}
                    />
                ))}
            </div>

            <div className="prob-legend">
                {arr.map(([label, prob]) => {
                    const isTop = label === topTrait;
                    return (
                        <div key={label} className="legend-item" style={{ opacity: isTop ? 1 : 0.5 }}>
                            <div className="legend-dot" style={{ background: getColor(label) }} />
                            <span style={{ fontWeight: isTop ? 600 : 400, color: isTop ? 'var(--text-primary)' : 'inherit' }}>{label}</span>
                            <span style={{ marginLeft: 'auto', fontFamily: 'monospace' }}>{prob.toFixed(1)}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

