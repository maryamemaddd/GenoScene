import React, { useState, useEffect } from 'react';

const facts = [
    { category: "DNA Phenotyping", title: "Single Nucleotide Polymorphisms (SNPs)", desc: "SNPs are the most common genetic variations among people. They act as biological markers helping scientists map phenotype traits to specific mutations." },
    { category: "Forensic AI Classification", title: "Predictive Analytics", desc: "Machine learning algorithms translate genetic blueprints into visible phenotypic expressions, mapping multi-class variants across thousands of arrays." },
    { category: "Biological Mechanics", title: "Melanin Synthesis", desc: "Eye pigmentation isn't determined by distinct colors, but rather by the concentration, distribution, and structural scaling of melanin within the iris stroma." },
    { category: "Visual Assembly", title: "Stable Diffusion Generation", desc: "The AI neural platform synthesizes realistic visual structures approximating the statistical probabilities identified during phenotype classification." }
];

export default function InformationSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % facts.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="glass-panel info-slider animate-fade-up delay-2" style={{ marginBottom: '3rem', padding: '0', display: 'flex' }}>
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: '180px' }}>
                {facts.map((fact, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            padding: '2rem', boxSizing: 'border-box',
                            opacity: idx === currentIndex ? 1 : 0,
                            transform: `translateY(${idx === currentIndex ? '0' : '10px'})`,
                            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            pointerEvents: idx === currentIndex ? 'auto' : 'none'
                        }}
                    >
                        <div className="badge badge-info" style={{ marginBottom: '0.75rem' }}>{fact.category}</div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{fact.title}</h3>
                        <p style={{ fontSize: '0.95rem', maxWidth: '800px', margin: 0, color: 'var(--text-secondary)' }}>{fact.desc}</p>
                    </div>
                ))}

                <div style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', display: 'flex', gap: '0.75rem' }}>
                    {facts.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            style={{
                                width: '30px', height: '4px', cursor: 'pointer',
                                background: idx === currentIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                                borderRadius: '4px', transition: 'all 0.3s'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

