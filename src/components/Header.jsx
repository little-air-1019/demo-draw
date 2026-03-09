import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-4 pb-8"
        >
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.15em] text-[var(--text)]">
                人員抽獎系統
            </h1>
            <div className="mt-3 h-px w-16 bg-[var(--border)] mx-auto" />
            <p className="mt-3 text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase">
                Personnel Raffle System
            </p>
        </motion.header>
    );
}
