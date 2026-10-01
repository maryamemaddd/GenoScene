import React from 'react';
import { BookOpen, Database, Play, MonitorPlay } from 'lucide-react';

export default function LearningSection() {
    return (
        <div style={{ marginTop: '5rem' }} className="animate-fade-up delay-3">
            <h2 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                Biological Learning
            </h2>

            <div className="edu-grid">
                <div className="glass-panel glass-panel-hover edu-card">
                    <div className="edu-card-img" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,1), rgba(6,182,212,0.3))' }}>
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={48} style={{ color: 'rgba(255,255,255,0.8)' }} />
                        </div>
                    </div>
                    <div className="edu-card-content">
                        <div className="badge badge-warn" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>Video Archive</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Genetics Mapping Visualization</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>A comprehensive scientific breakdown illustrating how melanin clusters synthesize specific Iris patterns over generations.</p>
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <MonitorPlay size={16} /> 14:20 Duration
                        </div>
                    </div>
                </div>

                <div className="glass-panel glass-panel-hover edu-card">
                    <div className="edu-card-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div className="badge badge-info">Article</div>
                            <BookOpen size={20} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Understanding SNP Sequences</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Learn how localized genetic variations dictate morphological structures triggering diverse phenotypical expressions universally.</p>
                        <a href="#" style={{ marginTop: 'auto', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Initialize sequence reader →</a>
                    </div>
                </div>
            </div>

            <h2 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '2rem', marginTop: '4rem' }}>
                Technical Framework
            </h2>

            <div className="edu-grid">
                <div className="glass-panel glass-panel-hover edu-card">
                    <div className="edu-card-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div className="badge badge-info">Architecture</div>
                            <Database size={20} style={{ color: 'var(--accent-secondary)' }} />
                        </div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Random Forest Classifier Architecture</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Examine how Genoscene's AI engine interprets multi-allelic dimensional thresholds executing probabilistic inference over raw sequences.</p>
                        <a href="#" style={{ marginTop: 'auto', color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Review System Flow →</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

