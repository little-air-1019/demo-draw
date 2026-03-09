import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

/**
 * Single slot animation — scrolls through random names, then settles on the actual winner.
 * Uses a decelerating interval (cubic-bezier feel) with the final name being the real winner.
 */
function SlotColumn({ candidates, winner, isSpinning, slotIndex, onSettled }) {
    const [displayName, setDisplayName] = useState(null);
    const [settled, setSettled] = useState(false);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!isSpinning) {
            setSettled(false);
            setDisplayName(null);
            return;
        }

        if (candidates.length === 0) return;

        setSettled(false);
        let tick = 0;
        // Stagger each slot: later slots spin longer
        const baseDuration = 2000;
        const staggerDelay = slotIndex * 600;
        const totalDuration = baseDuration + staggerDelay;
        const startSpeed = 50;
        const endSpeed = 250;

        const scheduleNext = () => {
            const elapsed = tick * startSpeed;
            const progress = Math.min(elapsed / totalDuration, 1);
            // Cubic ease-out deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentInterval = startSpeed + (endSpeed - startSpeed) * eased;

            intervalRef.current = setTimeout(() => {
                // Pick a random candidate to display
                const randomIdx = Math.floor(Math.random() * candidates.length);
                setDisplayName(candidates[randomIdx]);
                tick++;

                if (elapsed < totalDuration) {
                    scheduleNext();
                } else {
                    // Settle on the actual winner — data synced from the pre-determined result
                    setDisplayName(winner);
                    setSettled(true);
                    if (onSettled) onSettled(slotIndex);
                }
            }, currentInterval);
        };

        // Small initial delay per slot for stagger effect
        timeoutRef.current = setTimeout(() => {
            scheduleNext();
        }, slotIndex * 150);

        return () => {
            clearTimeout(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [isSpinning, candidates, winner, slotIndex, onSettled]);

    const current = displayName || winner;

    return (
        <div
            className={`slot-box flex items-center justify-center py-6 px-4 transition-all duration-500 ${settled ? 'settled' : ''
                }`}
            style={{ minHeight: '72px' }}
        >
            <AnimatePresence mode="wait">
                {current ? (
                    <motion.div
                        key={settled ? `winner-${current.id}` : `rolling-${current.id}-${Date.now()}`}
                        initial={settled ? { opacity: 0, y: 12 } : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{
                            duration: settled ? 0.5 : 0.06,
                            ease: settled ? [0.22, 1, 0.36, 1] : 'linear',
                        }}
                        className="text-center"
                    >
                        {settled ? (
                            <>
                                <div className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] mb-1">
                                    {current.id}
                                </div>
                                <div className="text-lg font-medium tracking-[0.1em]">
                                    {current.name}
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-[var(--text-muted)] font-mono tracking-wider">
                                {current.id} {current.name}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="text-xs text-[var(--text-light)] tracking-wider">—</div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Determine the CSS grid layout based on the number of winners.
 */
function getGridClass(count) {
    if (count <= 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-3';
    if (count === 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    if (count <= 8) return 'grid-cols-4';
    return 'grid-cols-4';
}

export default function RaffleWheel({
    candidates,
    isSpinning,
    onStartDraw,
    availableCount,
    onReset,
    drawnCount,
    pendingWinners,
    winnerCount,
    onAnimationComplete,
}) {
    const settledCount = useRef(0);
    const completeCalled = useRef(false);

    // Reset settled tracking when a new draw starts
    useEffect(() => {
        if (isSpinning) {
            settledCount.current = 0;
            completeCalled.current = false;
        }
    }, [isSpinning]);

    const handleSlotSettled = useCallback(() => {
        settledCount.current += 1;
        if (settledCount.current >= pendingWinners.length && !completeCalled.current) {
            completeCalled.current = true;
            // Small delay after last slot settles for visual polish
            setTimeout(() => {
                onAnimationComplete();
            }, 400);
        }
    }, [pendingWinners, onAnimationComplete]);

    const actualWinnerCount = Math.min(winnerCount, availableCount);
    const gridClass = getGridClass(actualWinnerCount);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="line-card"
        >
            {/* Title */}
            <div className="text-center mb-6">
                <h2 className="text-sm font-medium tracking-[0.15em] text-[var(--text)]">
                    {isSpinning ? '抽獎中' : '抽獎區'}
                </h2>
                {isSpinning && (
                    <motion.div
                        className="mt-2 h-px bg-[var(--accent)] mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 2 + pendingWinners.length * 0.6,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                )}
            </div>

            {/* Slot Grid */}
            <div className={`grid ${gridClass} gap-px border border-[var(--border)] mb-6`} style={{ background: 'var(--border)' }}>
                {candidates.length === 0 ? (
                    <div className="col-span-full bg-[var(--bg-card)] flex items-center justify-center py-16 text-xs text-[var(--text-light)] tracking-wider">
                        請先匯入人員資料
                    </div>
                ) : !isSpinning && pendingWinners.length === 0 ? (
                    // Show empty slots as preview
                    Array.from({ length: actualWinnerCount }, (_, i) => (
                        <div
                            key={`empty-${i}`}
                            className="bg-[var(--bg-card)] flex items-center justify-center py-6"
                            style={{ minHeight: '72px' }}
                        >
                            <span className="text-xs text-[var(--text-light)] tracking-wider">
                                #{i + 1}
                            </span>
                        </div>
                    ))
                ) : (
                    // Active slots (spinning or settled)
                    pendingWinners.map((winner, i) => (
                        <SlotColumn
                            key={`slot-${i}-${winner.id}`}
                            candidates={candidates}
                            winner={winner}
                            isSpinning={isSpinning}
                            slotIndex={i}
                            onSettled={handleSlotSettled}
                        />
                    ))
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
                <button
                    id="draw-btn"
                    onClick={onStartDraw}
                    disabled={isSpinning || availableCount === 0}
                    className="btn-primary"
                >
                    {isSpinning ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="w-3.5 h-3.5 border border-[var(--bg)] border-t-transparent rounded-full"
                            />
                            抽獎中...
                        </>
                    ) : (
                        <>
                            <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                            開始抽獎
                        </>
                    )}
                </button>

                {drawnCount > 0 && !isSpinning && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        id="reset-btn"
                        onClick={onReset}
                        className="btn-outline"
                    >
                        <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                        重置
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
