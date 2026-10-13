import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroInfographic } from './components/HeroInfographic';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { EngineeringLayers } from './components/EngineeringLayers';
import { ManualsSection } from './components/ManualsSection';
import { PromptVault } from './components/PromptVault';
import { StackCalculator } from './components/StackCalculator';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';
import { LayerType, PlatformId } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [selectedLayer, setSelectedLayer] = useState<LayerType>('models');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('claude');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenManual = (platformId: PlatformId) => {
    setSelectedPlatform(platformId);
    handleNavigate('manuales');
  };

  const handleSelectLayer = (layer: LayerType) => {
    setSelectedLayer(layer);
    handleNavigate('capas');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Visual Infographic & Hero Overview */}
        <HeroInfographic
          onSelectLayer={handleSelectLayer}
          onNavigate={handleNavigate}
        />

        {/* 01. Platform Comparison Matrix */}
        <ComparisonMatrix
          onOpenManual={handleOpenManual}
        />

        {/* 02. The 4 Engineering Layers: Models, Harness, Assistants & Agents */}
        <EngineeringLayers
          selectedLayer={selectedLayer}
          onSelectLayer={setSelectedLayer}
        />

        {/* 03. Comprehensive Step-by-Step Manuals for each AI */}
        <ManualsSection
          selectedPlatformId={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />

        {/* 04. High-Precision Prompt Laboratory with Live Variables */}
        <PromptVault />

        {/* 05. Stack Selector & ROI Productivity Calculator */}
        <StackCalculator
          onOpenManual={handleOpenManual}
        />
      </main>

      {/* Export Markdown / Cheatsheet Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Understated Senior Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenExport={() => setIsExportOpen(true)}
      />
    </div>
  );
}
