import { motion } from 'framer-motion';
import { Users, Trash2, Plus } from 'lucide-react';

export default function CandidatePool({ candidates, drawnIds, onShowInput, onClearAll }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="line-card"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                    <h2 className="text-sm font-medium tracking-[0.1em]">候選名單</h2>
                    <span className="text-[10px] tracking-wider text-[var(--text-muted)] border border-[var(--border-light)] px-1.5 py-0.5">
                        {candidates.length}
                    </span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={onShowInput}
                        className="p-1.5 text-[var(--text-light)] hover:text-[var(--text)] transition-colors"
                        title="重新匯入"
                    >
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={onClearAll}
                        className="p-1.5 text-[var(--text-light)] hover:text-[var(--danger)] transition-colors"
                        title="清除全部"
                    >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-h-56 overflow-y-auto -mx-1.5 px-1.5">
                {candidates.map((c, index) => {
                    const isDrawn = drawnIds.has(c.id);
                    return (
                        <div
                            key={c.id}
                            className={`flex items-center gap-3 px-2 py-1.5 border-b border-[var(--border-light)] last:border-b-0 transition-opacity duration-300 ${isDrawn ? 'opacity-30' : ''
                                }`}
                        >
                            <span className={`text-[10px] font-mono tracking-wider ${isDrawn ? 'line-through' : 'text-[var(--text-muted)]'}`}>
                                {c.id}
                            </span>
                            <span className={`text-xs ${isDrawn ? 'line-through text-[var(--text-light)]' : ''}`}>
                                {c.name}
                            </span>
                            {isDrawn && (
                                <span className="ml-auto text-[9px] tracking-wider text-[var(--accent)]">已抽出</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {drawnIds.size > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border-light)] flex justify-between text-[10px] text-[var(--text-muted)] tracking-wider">
                    <span>已抽出 {drawnIds.size}</span>
                    <span>剩餘 {candidates.length - drawnIds.size}</span>
                </div>
            )}
        </motion.div>
    );
}
