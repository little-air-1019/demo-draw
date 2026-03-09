import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DataInput from './components/DataInput';
import RaffleConfig from './components/RaffleConfig';
import CandidatePool from './components/CandidatePool';
import RaffleWheel from './components/RaffleWheel';
import WinnerDisplay from './components/WinnerDisplay';
import { parseStaffData } from './utils/parseStaffData';
import { fireCelebration } from './utils/confetti';

function App() {
    const [candidates, setCandidates] = useState([]);
    const [winnerCount, setWinnerCount] = useState(1);
    const [winners, setWinners] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [drawnIds, setDrawnIds] = useState(new Set());
    // Pre-determined winners passed to RaffleWheel for data-sync
    const [pendingWinners, setPendingWinners] = useState([]);

    const handleParseData = useCallback((rawText) => {
        const parsed = parseStaffData(rawText);
        setCandidates(parsed);
        setWinners([]);
        setDrawnIds(new Set());
        setPendingWinners([]);
        if (parsed.length > 0) {
            setShowInput(false);
        }
    }, []);

    const handleStartDraw = useCallback(() => {
        if (candidates.length === 0 || isSpinning) return;

        const available = candidates.filter(c => !drawnIds.has(c.id));
        if (available.length === 0) return;

        const count = Math.min(winnerCount, available.length);

        // Pre-determine winners BEFORE animation starts — this is the single source of truth
        const shuffled = [...available].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        setPendingWinners(selected);
        setWinners([]);
        setIsSpinning(true);
    }, [candidates, winnerCount, isSpinning, drawnIds]);

    // Called by RaffleWheel when animation completes
    const handleAnimationComplete = useCallback(() => {
        setPendingWinners(prev => {
            setWinners(prev);
            setDrawnIds(old => {
                const next = new Set(old);
                prev.forEach(w => next.add(w.id));
                return next;
            });
            return prev;
        });
        setIsSpinning(false);
        fireCelebration();
    }, []);

    const handleReset = useCallback(() => {
        setWinners([]);
        setDrawnIds(new Set());
        setPendingWinners([]);
    }, []);

    const handleClearAll = useCallback(() => {
        setCandidates([]);
        setWinners([]);
        setDrawnIds(new Set());
        setShowInput(true);
        setWinnerCount(1);
        setPendingWinners([]);
    }, []);

    const availableCount = candidates.filter(c => !drawnIds.has(c.id)).length;

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-6 py-6">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <AnimatePresence mode="wait">
                            {showInput ? (
                                <DataInput
                                    key="input"
                                    onParse={handleParseData}
                                    candidateCount={candidates.length}
                                />
                            ) : (
                                <CandidatePool
                                    key="pool"
                                    candidates={candidates}
                                    drawnIds={drawnIds}
                                    onShowInput={() => setShowInput(true)}
                                    onClearAll={handleClearAll}
                                />
                            )}
                        </AnimatePresence>

                        <RaffleConfig
                            winnerCount={winnerCount}
                            onWinnerCountChange={setWinnerCount}
                            maxWinners={availableCount}
                            totalCandidates={candidates.length}
                            drawnCount={drawnIds.size}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 space-y-6">
                        <RaffleWheel
                            candidates={candidates}
                            isSpinning={isSpinning}
                            onStartDraw={handleStartDraw}
                            availableCount={availableCount}
                            onReset={handleReset}
                            drawnCount={drawnIds.size}
                            pendingWinners={pendingWinners}
                            winnerCount={winnerCount}
                            onAnimationComplete={handleAnimationComplete}
                        />

                        <AnimatePresence>
                            {winners.length > 0 && !isSpinning && (
                                <WinnerDisplay winners={winners} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
