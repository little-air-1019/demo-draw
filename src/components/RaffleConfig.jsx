import { motion } from 'framer-motion';
import { Settings, Hash } from 'lucide-react';

export default function RaffleConfig({ winnerCount, onWinnerCountChange, maxWinners, totalCandidates, drawnCount }) {
    const effectiveMax = Math.max(1, maxWinners);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="line-card"
        >
            <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                <h2 className="text-sm font-medium tracking-[0.1em]">抽獎設定</h2>
            </div>

            <div className="space-y-4">
                {/* Winner Count Control */}
                <div>
                    <label className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] mb-3 tracking-wider">
                        <Hash className="w-3 h-3" strokeWidth={1.5} />
                        抽出人數
                    </label>

                    <div className="flex items-center gap-4">
                        <input
                            id="winner-count-slider"
                            type="range"
                            min={1}
                            max={effectiveMax}
                            value={Math.min(winnerCount, effectiveMax)}
                            onChange={(e) => onWinnerCountChange(Number(e.target.value))}
                            className="flex-1"
                            disabled={totalCandidates === 0}
                        />
                        <input
                            id="winner-count-input"
                            type="number"
                            min={1}
                            max={effectiveMax}
                            value={winnerCount}
                            onChange={(e) => {
                                const val = Math.max(1, Math.min(effectiveMax, Number(e.target.value) || 1));
                                onWinnerCountChange(val);
                            }}
                            disabled={totalCandidates === 0}
                            className="w-14 bg-transparent border border-[var(--border-light)] px-2 py-1.5 text-center text-sm font-mono focus:outline-none focus:border-[var(--border)] transition-colors"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-px border border-[var(--border-light)]">
                    <div className="bg-[var(--bg-card)] p-3 text-center">
                        <div className="text-lg font-light tabular-nums">{totalCandidates}</div>
                        <div className="text-[9px] text-[var(--text-muted)] tracking-wider mt-0.5">總人數</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-3 text-center border-x border-[var(--border-light)]">
                        <div className="text-lg font-light tabular-nums text-[var(--accent)]">{maxWinners}</div>
                        <div className="text-[9px] text-[var(--text-muted)] tracking-wider mt-0.5">可抽</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-3 text-center">
                        <div className="text-lg font-light tabular-nums">{drawnCount}</div>
                        <div className="text-[9px] text-[var(--text-muted)] tracking-wider mt-0.5">已抽出</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
