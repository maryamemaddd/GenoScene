import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileCheck, AlertTriangle } from 'lucide-react';

export default function UploadBox({ onUploadSuccess, token, apiUrl }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [fileSize, setFileSize] = useState('');

    const toggleDrag = (e, state) => { e.preventDefault(); e.stopPropagation(); setIsDragging(state); };

    const processFile = async (selFile) => {
        if (!selFile.name.endsWith('.csv')) {
            setStatus('error'); setErrorMsg('System requires a robust .csv genomic array.');
            return;
        }
        setFile(selFile);
        setFileSize((selFile.size / 1024).toFixed(1) + ' KB');
        setStatus('loading');

        try {
            const fd = new FormData();
            fd.append('file', selFile);
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await axios.post(`${apiUrl}/predict`, fd, { headers });

            setTimeout(() => {
                setStatus('success');
                onUploadSuccess(res.data);
            }, 1200);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.response?.data?.detail || 'Pipeline intercept: Failed to analyze alleles.');
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Upload SNP Data</h3>
                <span className="badge badge-info">Neural Engine Ready</span>
            </div>

            {(status === 'idle' || status === 'error') && (
                <label
                    className={`upload-zone ${isDragging ? 'drag-active' : ''}`}
                    onDragOver={(e) => toggleDrag(e, true)} onDragLeave={(e) => toggleDrag(e, false)}
                    onDrop={(e) => { toggleDrag(e, false); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
                >
                    <input type="file" onChange={(e) => e.target.files[0] && processFile(e.target.files[0])} accept=".csv" style={{ display: 'none' }} />
                    <div className="upload-icon-wrapper"><Upload size={28} /></div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Drag & Drop Forensic Packet</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Supports standard .csv SNP formats</div>
                </label>
            )}

            {status === 'loading' && (
                <div className="upload-zone" style={{ border: 'none', background: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
                    <div className="scientific-loader" style={{ marginBottom: '1rem' }}></div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Analyzing alleles...</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{file.name} [{fileSize}]</div>
                </div>
            )}

            {status === 'success' && (
                <div className="upload-zone success-state" style={{ pointerEvents: 'none' }}>
                    <div className="upload-icon-wrapper" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--trait-green)' }}>
                        <FileCheck size={32} />
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Dataset Validated & Analyzed</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontFamily: 'monospace' }}>{file.name} • {fileSize}</div>

                    <button onClick={(e) => { e.preventDefault(); setStatus('idle'); setFile(null); onUploadSuccess(null); }} className="btn btn-secondary" style={{ marginTop: '1.5rem', pointerEvents: 'auto', padding: '0.5rem 1rem' }}>
                        Analyze New Packet
                    </button>
                </div>
            )}

            {status === 'error' && (
                <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderLeft: '4px solid var(--trait-red)', borderRadius: '4px', display: 'flex', gap: '0.75rem' }}>
                    <AlertTriangle color="#FCA5A5" size={20} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: '#FCA5A5' }}>{errorMsg}</span>
                </div>
            )}

            {status === 'idle' && (
                <button className="btn btn-secondary" onClick={() => processFile(new File(["dummy data"], "sample_data.csv"))} style={{ marginTop: 'auto' }}>
                    Load Sample Dataset
                </button>
            )}
        </div>
    );
}

