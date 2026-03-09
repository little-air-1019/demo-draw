import { motion } from 'framer-motion';
import { fireSpark } from '../utils/confetti';
import { useEffect } from 'react';

export default function WinnerDisplay({ winners }) {
    useEffect(() => {
        winners.forEach((_, i) => {
            setTimeout(() => {
                const x = 0.3 + Math.random() * 0.4;
                fireSpark(x, 0.5);
            }, i * 300 + 100);
        });
    }, [winners]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="line-card"
        >
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="text-sm font-medium tracking-[0.15em] text-[var(--text)]">
                    抽獎結果
                </h2>
                <div className="mt-2 h-px w-12 bg-[var(--accent)] mx-auto" />
            </div>

            {/* Winners Grid */}
            <div className="space-y-0 border border-[var(--border-light)]">
                {winners.map((winner, index) => (
                    <motion.div
                        key={winner.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.15,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`flex items-center gap-4 px-4 py-3 bg-[var(--bg-card)] ${index !== winners.length - 1 ? 'border-b border-[var(--border-light)]' : ''
                            }`}
                    >
                        {/* Rank */}
                        <div className="w-8 h-8 flex items-center justify-center border border-[var(--border-light)] text-xs font-mono text-[var(--text-muted)] shrink-0">
                            {index + 1}
                        </div>

                        {/* Info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-[10px] font-mono tracking-[0.15em] text-[var(--accent)]">
                                {winner.id}
                            </span>
                            <span className="text-sm font-medium tracking-[0.05em] truncate">
                                {winner.name}
                            </span>
                        </div>

                        {/* Accent dot */}
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
                <span className="text-[10px] text-[var(--text-muted)] tracking-[0.2em]">
                    共 {winners.length} 位中獎
                </span>
            </div>
        </motion.div>
    );
}
