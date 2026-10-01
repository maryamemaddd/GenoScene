import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { GeneticDataStream } from '../components/home/GeneticDataStream';
import { ScientificWorkflow } from '../components/home/ScientificWorkflow';
import { FeatureSection } from '../components/home/FeatureSection';
import { DailyInsight } from '../components/home/DailyInsight';

interface HomePageProps {
  onStartAnalysis: () => void;
  onExplore: () => void;
  onLearnMore: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAnalysis,
  onExplore,
  onLearnMore
}) => {
  return (
    <div className="space-y-10 sm:space-y-16">

      <HeroSection
        onStartAnalysis={onStartAnalysis}
        onExplore={onExplore}
      />

      <GeneticDataStream />

      <div id="workflow-section">
        <ScientificWorkflow onStartAnalysis={onStartAnalysis} />
      </div>

      <DailyInsight />

      <FeatureSection
        onLearnMore={onLearnMore}
        onStartAnalysis={onStartAnalysis}
      />
    </div>
  );
};

