"""
GenoScene - Empirical Model Evaluation Visualizer
Generates publication-quality Seaborn & Matplotlib bar charts
comparing Accuracy, Macro F1, and Log-Loss across the 3 selected models.
"""

import os
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def generate_performance_plots(output_dir="docs/assets"):
    os.makedirs(output_dir, exist_ok=True)
    
    # Configure high-quality styling
    plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6.5), dpi=300, facecolor='#FFFFFF')

    models = [
        'Eye Pigmentation\n(Calibrated SVC)',
        'Hair Phenotype\n(Stacking Ensemble)',
        'Skin Pigmentation\n(Optuna LightGBM)'
    ]

    accuracy = [98.45, 94.04, 88.32]
    macro_f1 = [68.64, 91.04, 87.39]
    log_loss = [0.0419, 0.1950, 0.3612]

    x = np.arange(len(models))
    width = 0.36

    # Forensic & DNA palette
    color_acc = '#2563EB'   # Adenine Royal Blue
    color_f1  = '#059669'   # Thymine Emerald Green

    # Panel 1: Accuracy & Macro F1 Grouped Bar Chart
    rects1 = ax1.bar(x - width/2, accuracy, width, label='Test Accuracy (%)', 
                     color=color_acc, edgecolor='#1E40AF', linewidth=1.5, zorder=3, alpha=0.92)
    rects2 = ax1.bar(x + width/2, macro_f1, width, label='Macro F1-Score (%)', 
                     color=color_f1, edgecolor='#047857', linewidth=1.5, zorder=3, alpha=0.92)

    def autolabel(rects, ax, suffix='%'):
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.2f}{suffix}',
                        xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 6),
                        textcoords="offset points",
                        ha='center', va='bottom', fontsize=11, fontweight='bold',
                        color='#0F172A')

    autolabel(rects1, ax1)
    autolabel(rects2, ax1)

    ax1.set_title('Classification Performance Benchmark\n(Accuracy vs. Macro F1)', 
                  fontsize=14, fontweight='bold', pad=18, color='#0F172A')
    ax1.set_ylabel('Score (%)', fontsize=12, fontweight='bold', color='#1E293B')
    ax1.set_xticks(x)
    ax1.set_xticklabels(models, fontsize=11, fontweight='600', color='#0F172A')
    ax1.set_ylim(0, 115)
    ax1.set_facecolor('#FAFAFA')
    ax1.grid(True, linestyle='--', alpha=0.5, color='#CBD5E1', zorder=0)
    ax1.legend(frameon=True, facecolor='#FFFFFF', edgecolor='#E2E8F0', fontsize=11, loc='upper right')

    # Panel 2: Cross-Entropy Calibration Log-Loss
    bars_loss = ax2.bar(x, log_loss, width=0.5, color=['#3B82F6', '#10B981', '#F59E0B'],
                        edgecolor='#334155', linewidth=1.5, zorder=3, alpha=0.9)

    for rect in bars_loss:
        height = rect.get_height()
        ax2.annotate(f'{height:.4f}',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 6),
                    textcoords="offset points",
                    ha='center', va='bottom', fontsize=11, fontweight='bold',
                    color='#0F172A')

    ax2.set_title('Probabilistic Calibration Error\n(Cross-Entropy Log-Loss — Lower is Better)', 
                  fontsize=14, fontweight='bold', pad=18, color='#0F172A')
    ax2.set_ylabel('Log-Loss', fontsize=12, fontweight='bold', color='#1E293B')
    ax2.set_xticks(x)
    ax2.set_xticklabels(models, fontsize=11, fontweight='600', color='#0F172A')
    ax2.set_ylim(0, 0.48)
    ax2.set_facecolor('#FAFAFA')
    ax2.grid(True, linestyle='--', alpha=0.5, color='#CBD5E1', zorder=0)

    plt.suptitle('GenoScene Forensic Multi-Task AI Engine — Empirical Evaluation (Holdout Test Set N=2,064)',
                 fontsize=16, fontweight='bold', y=1.02, color='#0F172A')

    for ax in [ax1, ax2]:
        for spine in ax.spines.values():
            spine.set_color('#94A3B8')
            spine.set_linewidth(1.2)

    plt.tight_layout()
    
    png_path = os.path.join(output_dir, 'model_performance.png')
    svg_path = os.path.join(output_dir, 'model_performance.svg')
    plt.savefig(png_path, dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.savefig(svg_path, format='svg', bbox_inches='tight', facecolor='#FFFFFF')
    print(f"✅ Generated: {png_path} and {svg_path}")

if __name__ == '__main__':
    generate_performance_plots()
