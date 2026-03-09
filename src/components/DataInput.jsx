import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardPaste, FileText, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DataInput({ onParse, candidateCount }) {
    const [rawText, setRawText] = useState('');
    const [error, setError] = useState('');

    const sampleData = `行編\t姓名\t性別\t電話
A001\t王小明\t男\t0912345678
A002\t李美麗\t女\t0923456789
A003\t張大強\t男\t0934567890
A004\t陳淑芬\t女\t0945678901
A005\t林志豪\t男\t0956789012
A006\t黃雅婷\t女\t0967890123
A007\t吳建宏\t男\t0978901234
A008\t劉佳蓉\t女\t0989012345
A009\t蔡明哲\t男\t0990123456
A010\t鄭惠如\t女\t0901234567
A011\t許文傑\t男\t0912345001
A012\t楊曉雯\t女\t0923456002`;

    const handleParse = () => {
        if (!rawText.trim()) {
            setError('請貼上人員資料');
            return;
        }
        setError('');
        onParse(rawText);
    };

    const handleLoadSample = () => {
        setRawText(sampleData);
        setError('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="line-card"
        >
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-4">
                <ClipboardPaste className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.5} />
                <h2 className="text-sm font-medium tracking-[0.1em] text-[var(--text)]">
                    匯入人員資料
                </h2>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] mb-3 leading-relaxed tracking-wide">
                從人事名冊複製貼上，系統自動識別<span className="text-[var(--accent)] font-medium">行編</span>與<span className="text-[var(--accent)] font-medium">姓名</span>
            </p>

            <div className="relative">
                <textarea
                    id="staff-input"
                    value={rawText}
                    onChange={(e) => { setRawText(e.target.value); setError(''); }}
                    placeholder={'行編\t姓名\t性別\t電話\nA001\t王小明\t男\t0912...\nA002\t李美麗\t女\t0923...'}
                    rows={7}
                    className="w-full bg-[var(--bg)] border border-[var(--border-light)] px-3 py-2.5 text-xs text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:border-[var(--border)] transition-colors resize-none leading-relaxed"
                />
                {rawText && (
                    <button
                        onClick={() => setRawText('')}
                        className="absolute top-2 right-2 text-[var(--text-light)] hover:text-[var(--text)] transition-colors text-xs"
                    >
                        ✕
                    </button>
                )}
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 mt-2 text-[var(--danger)] text-[11px]"
                >
                    <AlertCircle className="w-3 h-3" strokeWidth={1.5} />
                    {error}
                </motion.div>
            )}

            <div className="flex gap-3 mt-4">
                <button
                    id="parse-btn"
                    onClick={handleParse}
                    className="btn-primary flex-1 justify-center"
                >
                    <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
                    解析資料
                </button>

                <button
                    id="sample-btn"
                    onClick={handleLoadSample}
                    className="btn-outline"
                >
                    <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
                    載入範例
                </button>
            </div>

            {candidateCount > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 mt-3 text-[var(--accent)] text-[11px]"
                >
                    <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} />
                    已成功解析 {candidateCount} 位人員
                </motion.div>
            )}
        </motion.div>
    );
}
