import { useState, useEffect, useCallback } from 'react';

export interface GameStats {
    totalExcuses: number;
    score: number;
    level: number;
    streak: number;
    lastPlayDate: string | null;
    categoriesUsed: Set<string>;
    achievements: string[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

const STORAGE_KEY = 'excuse-game-stats';

const ACHIEVEMENTS_CONFIG: Omit<Achievement, 'unlocked'>[] = [
    { id: 'first-excuse', title: 'Getting Started', description: 'Generate your first excuse', icon: '🎯' },
    { id: 'excuse-master', title: 'Excuse Master', description: 'Generate 10 excuses', icon: '🏆' },
    { id: 'category-explorer', title: 'Category Explorer', description: 'Try all 4 categories', icon: '🗺️' },
    { id: 'favorite-collector', title: 'Favorite Collector', description: 'Save 5 favorites', icon: '❤️' },
    { id: 'streak-master', title: 'Streak Master', description: '3-day streak', icon: '🔥' },
    { id: 'legend', title: 'Excuse Legend', description: 'Reach level 5', icon: '👑' },
];

function calculateLevel(score: number): number {
    if (score >= 500) return 5;
    if (score >= 300) return 4;
    if (score >= 150) return 3;
    if (score >= 50) return 2;
    return 1;
}

function getLevelName(level: number): string {
    const names = ['', 'Novice', 'Apprentice', 'Expert', 'Master', 'Legend'];
    return names[level] || 'Novice';
}

export function useGameStats() {
    const [stats, setStats] = useState<GameStats>({
        totalExcuses: 0,
        score: 0,
        level: 1,
        streak: 0,
        lastPlayDate: null,
        categoriesUsed: new Set(),
        achievements: [],
    });

    const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

    // Load stats from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setStats({
                    ...parsed,
                    categoriesUsed: new Set(parsed.categoriesUsed || []),
                });
            }
        } catch (error) {
            console.error('Failed to load game stats:', error);
        }
    }, []);

    // Save stats to localStorage
    const saveStats = useCallback((newStats: GameStats) => {
        try {
            const toSave = {
                ...newStats,
                categoriesUsed: Array.from(newStats.categoriesUsed),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
            setStats(newStats);
        } catch (error) {
            console.error('Failed to save game stats:', error);
        }
    }, []);

    // Check and unlock achievements
    const checkAchievements = useCallback((updatedStats: GameStats, favoritesCount: number = 0) => {
        const newlyUnlocked: Achievement[] = [];

        ACHIEVEMENTS_CONFIG.forEach((achievement) => {
            if (updatedStats.achievements.includes(achievement.id)) return;

            let shouldUnlock = false;

            switch (achievement.id) {
                case 'first-excuse':
                    shouldUnlock = updatedStats.totalExcuses >= 1;
                    break;
                case 'excuse-master':
                    shouldUnlock = updatedStats.totalExcuses >= 10;
                    break;
                case 'category-explorer':
                    shouldUnlock = updatedStats.categoriesUsed.size >= 4;
                    break;
                case 'favorite-collector':
                    shouldUnlock = favoritesCount >= 5;
                    break;
                case 'streak-master':
                    shouldUnlock = updatedStats.streak >= 3;
                    break;
                case 'legend':
                    shouldUnlock = updatedStats.level >= 5;
                    break;
            }

            if (shouldUnlock) {
                newlyUnlocked.push({ ...achievement, unlocked: true });
                updatedStats.achievements.push(achievement.id);
            }
        });

        if (newlyUnlocked.length > 0) {
            setNewAchievements(newlyUnlocked);
            setTimeout(() => setNewAchievements([]), 5000);
        }

        return updatedStats;
    }, []);

    // Add excuse generated
    const addExcuse = useCallback((category: string, favoritesCount: number = 0) => {
        const today = new Date().toDateString();
        const isNewDay = stats.lastPlayDate !== today;

        let newStats = {
            ...stats,
            totalExcuses: stats.totalExcuses + 1,
            score: stats.score + 10,
            categoriesUsed: new Set([...stats.categoriesUsed, category]),
            lastPlayDate: today,
            streak: isNewDay ? stats.streak + 1 : stats.streak,
        };

        // Add streak bonus
        if (isNewDay && newStats.streak > 1) {
            newStats.score += 20;
        }

        newStats.level = calculateLevel(newStats.score);
        newStats = checkAchievements(newStats, favoritesCount);
        saveStats(newStats);
    }, [stats, saveStats, checkAchievements]);

    // Add favorite saved
    const addFavorite = useCallback((favoritesCount: number) => {
        let newStats = {
            ...stats,
            score: stats.score + 5,
        };
        newStats.level = calculateLevel(newStats.score);
        newStats = checkAchievements(newStats, favoritesCount);
        saveStats(newStats);
    }, [stats, saveStats, checkAchievements]);

    // Get all achievements
    const getAllAchievements = useCallback((): Achievement[] => {
        return ACHIEVEMENTS_CONFIG.map((achievement) => ({
            ...achievement,
            unlocked: stats.achievements.includes(achievement.id),
        }));
    }, [stats.achievements]);

    return {
        stats,
        levelName: getLevelName(stats.level),
        addExcuse,
        addFavorite,
        newAchievements,
        getAllAchievements,
    };
}
