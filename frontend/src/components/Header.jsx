import React from 'react';
import { Network, ShieldCheck } from 'lucide-react';

export default function Header({ user, logout }) {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo" style={{ cursor: 'default' }}>
                    <Network className="scientific-gradient-text" />
                    <span className="scientific-gradient-text">GenoScene</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {user ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <ShieldCheck size={16} style={{ color: 'var(--trait-green)' }} />
                                Authorized: {user.name}
                            </div>
                            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Disconnect</button>
                        </>
                    ) : (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Terminal Active</div>
                    )}
                </div>
            </div>
        </header>
    );
}

