import { Trophy, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreTrackerProps {
    score: number;
    level: number;
    levelName: string;
    totalExcuses: number;
    streak: number;
}

export function ScoreTracker({ score, level, levelName, totalExcuses, streak }: ScoreTrackerProps) {
    const getLevelColor = (level: number) => {
        switch (level) {
            case 5: return 'from-yellow-400 via-amber-500 to-yellow-600';
            case 4: return 'from-purple-400 via-pink-500 to-purple-600';
            case 3: return 'from-blue-400 via-cyan-500 to-blue-600';
            case 2: return 'from-green-400 via-emerald-500 to-green-600';
            default: return 'from-gray-400 via-slate-500 to-gray-600';
        }
    };

    const getLevelEmoji = (level: number) => {
        switch (level) {
            case 5: return '👑';
            case 4: return '💎';
            case 3: return '⭐';
            case 2: return '🌟';
            default: return '🎯';
        }
    };

    return (
        <div className="game-header-card rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Level Badge */}
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                        "shadow-lg transform hover:scale-105 transition-transform duration-300",
                        "game-glow",
                        getLevelColor(level)
                    )}>
                        <span className="text-3xl sm:text-4xl animate-bounce-slow">{getLevelEmoji(level)}</span>
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 shadow-md border-2 border-primary">
                            <span className="text-xs font-bold text-primary">{level}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                            {levelName}
                        </h2>
                        <p className="text-sm text-muted-foreground">Level {level}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-6">
                    {/* Score */}
                    <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl sm:text-3xl font-bold text-gradient animate-pulse-soft">
                                {score}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                    </div>

                    {/* Excuses */}
                    <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="text-2xl sm:text-3xl font-bold text-foreground">
                                {totalExcuses}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Excuses</p>
                    </div>

                    {/* Streak */}
                    {streak > 0 && (
                        <div className="text-center">
                            <div className="flex items-center gap-1 justify-center mb-1">
                                <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                                <span className="text-2xl sm:text-3xl font-bold text-orange-500">
                                    {streak}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Streak</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
