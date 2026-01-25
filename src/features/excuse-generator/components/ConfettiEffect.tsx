import { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    left: number;
    delay: number;
    duration: number;
    color: string;
}

interface ConfettiEffectProps {
    trigger: boolean;
}

export function ConfettiEffect({ trigger }: ConfettiEffectProps) {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (!trigger) return;

        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#C7CEEA'];
        const pieces: ConfettiPiece[] = [];

        for (let i = 0; i < 50; i++) {
            pieces.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.3,
                duration: 2 + Math.random() * 1,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        setConfetti(pieces);

        const timer = setTimeout(() => {
            setConfetti([]);
        }, 3000);

        return () => clearTimeout(timer);
    }, [trigger]);

    if (confetti.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                        left: `${piece.left}%`,
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                        backgroundColor: piece.color,
                    }}
                />
            ))}
        </div>
    );
}
