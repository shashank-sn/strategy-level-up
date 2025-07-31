import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ModuleProgress {
  id: string;
  name: string;
  completed: boolean;
  score: number;
  maxScore: number;
  locked: boolean;
  completedAt?: Date;
  timeSpent?: number;
}

export interface ProgressState {
  modules: ModuleProgress[];
  overallScore: number;
  overallProgress: number;
  brandHealthScore: number;
  currentActiveModule: string | null;
}

interface ProgressContextType {
  progress: ProgressState;
  completeModule: (moduleId: string, score: number, timeSpent?: number) => void;
  updateModuleScore: (moduleId: string, newScore: number) => void;
  isModuleUnlocked: (moduleId: string) => boolean;
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  getBrandHealthLevel: () => string;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialModules: ModuleProgress[] = [
  { id: 'foundation', name: 'Brand Foundation', completed: false, score: 0, maxScore: 100, locked: false },
  { id: 'business-goals', name: 'Business Goals', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'founder-story', name: 'Founder Story', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'personality', name: 'Brand Personality', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'audience', name: 'Audience Personas', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'competitive-analysis', name: 'Competitive Analysis', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'gap-analysis', name: 'Gap Analysis', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'positioning', name: 'Positioning & Promise', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'brand-concept', name: 'Brand Concept', completed: false, score: 0, maxScore: 100, locked: true },
  { id: 'strategic-pillars', name: 'Strategic Pillars', completed: false, score: 0, maxScore: 100, locked: true }
];

const initialProgress: ProgressState = {
  modules: initialModules,
  overallScore: 0,
  overallProgress: 0,
  brandHealthScore: 0,
  currentActiveModule: 'foundation'
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('brandJourneyProgress');
    return saved ? JSON.parse(saved) : initialProgress;
  });

  useEffect(() => {
    localStorage.setItem('brandJourneyProgress', JSON.stringify(progress));
  }, [progress]);

  const calculateOverallStats = (modules: ModuleProgress[]) => {
    const totalScore = modules.reduce((sum, module) => sum + module.score, 0);
    const totalMaxScore = modules.reduce((sum, module) => sum + module.maxScore, 0);
    const completedModules = modules.filter(module => module.completed).length;
    
    const overallScore = totalScore;
    const overallProgress = (completedModules / modules.length) * 100;
    const brandHealthScore = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

    return { overallScore, overallProgress, brandHealthScore };
  };

  const unlockNextModule = (currentModuleId: string, modules: ModuleProgress[]) => {
    const currentIndex = modules.findIndex(m => m.id === currentModuleId);
    if (currentIndex !== -1 && currentIndex < modules.length - 1) {
      modules[currentIndex + 1].locked = false;
    }
    return modules;
  };

  const completeModule = (moduleId: string, score: number, timeSpent?: number) => {
    setProgress(prev => {
      const updatedModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            completed: score >= 75, // 75-point threshold
            score,
            completedAt: new Date(),
            timeSpent
          };
        }
        return module;
      });

      const unlockedModules = unlockNextModule(moduleId, updatedModules);
      const stats = calculateOverallStats(unlockedModules);

      return {
        ...prev,
        modules: unlockedModules,
        ...stats
      };
    });
  };

  const updateModuleScore = (moduleId: string, newScore: number) => {
    setProgress(prev => {
      const updatedModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          return { ...module, score: newScore };
        }
        return module;
      });

      const stats = calculateOverallStats(updatedModules);

      return {
        ...prev,
        modules: updatedModules,
        ...stats
      };
    });
  };

  const isModuleUnlocked = (moduleId: string): boolean => {
    const module = progress.modules.find(m => m.id === moduleId);
    return module ? !module.locked : false;
  };

  const getModuleProgress = (moduleId: string): ModuleProgress | undefined => {
    return progress.modules.find(m => m.id === moduleId);
  };

  const getBrandHealthLevel = (): string => {
    const score = progress.brandHealthScore;
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Developing';
    return 'Needs Improvement';
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem('brandJourneyProgress');
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      completeModule,
      updateModuleScore,
      isModuleUnlocked,
      getModuleProgress,
      getBrandHealthLevel,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};