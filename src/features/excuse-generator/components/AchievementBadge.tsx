import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Achievement } from '../hooks/useGameStats';

interface AchievementNotificationProps {
    achievement: Achievement;
    onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        setTimeout(() => setIsVisible(true), 100);

        // Auto close after 4 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={cn(
            "fixed top-20 right-4 z-50 max-w-sm",
            "transform transition-all duration-300",
            isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}>
            <div className="achievement-card rounded-2xl p-4 shadow-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20">
                <div className="flex items-start gap-3">
                    <div className="text-4xl animate-bounce-slow">{achievement.icon}</div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display font-bold text-yellow-900 dark:text-yellow-100">
                                🎉 Achievement Unlocked!
                            </h3>
                        </div>
                        <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                            {achievement.title}
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {achievement.description}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

interface AchievementBadgeProps {
    achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
    return (
        <div className={cn(
            "relative group rounded-xl p-3 border-2 transition-all duration-300",
            achievement.unlocked
                ? "bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/30 dark:to-amber-900/30 border-yellow-400 shadow-md hover:shadow-lg hover:scale-105"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50 grayscale"
        )}>
            <div className="text-center">
                <div className={cn(
                    "text-3xl mb-2",
                    achievement.unlocked && "animate-bounce-slow"
                )}>
                    {achievement.icon}
                </div>
                <p className={cn(
                    "text-xs font-semibold",
                    achievement.unlocked
                        ? "text-yellow-900 dark:text-yellow-100"
                        : "text-gray-600 dark:text-gray-400"
                )}>
                    {achievement.title}
                </p>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {achievement.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );
}
