/**
 * Smart parser for messy copy-pasted staff directory data.
 * Extracts Employee ID (行編) and Name (姓名) from various formats.
 *
 * Handles:
 *  - Tab-separated fields
 *  - Multiple line breaks
 *  - Extra columns (gender, phone, etc.)
 *  - Various ID formats
 */

/**
 * Parse raw text and extract an array of { id, name } objects.
 * @param {string} rawText - The messy copy-pasted text
 * @returns {{ id: string, name: string }[]}
 */
export function parseStaffData(rawText) {
    if (!rawText || typeof rawText !== 'string') return [];

    const results = [];
    const seen = new Set();

    // Split by newlines, filter empty
    const lines = rawText
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);

    for (const line of lines) {
        // Split by tabs or multiple spaces
        const fields = line
            .split(/\t+|\s{2,}/)
            .map(f => f.trim())
            .filter(Boolean);

        if (fields.length === 0) continue;

        // Skip header lines
        if (isHeaderLine(fields)) continue;

        // Try to find ID + Name from the fields
        const extracted = extractIdAndName(fields);
        if (extracted && !seen.has(extracted.id)) {
            seen.add(extracted.id);
            results.push(extracted);
        }
    }

    return results;
}

function isHeaderLine(fields) {
    const headerKeywords = ['行編', '姓名', '員工編號', '員工姓名', '性別', '電話', 'ID', 'Name', 'Gender', 'Phone', '編號', '部門', '職稱'];
    const lowerFields = fields.map(f => f.toLowerCase());
    const matchCount = headerKeywords.filter(kw =>
        lowerFields.some(f => f.includes(kw.toLowerCase()))
    ).length;
    return matchCount >= 2;
}

function extractIdAndName(fields) {
    // Strategy 1: Look for a numeric/alphanumeric ID pattern
    // Employee IDs are usually alphanumeric, e.g., "A001", "12345", "EMP-001"
    const idPattern = /^[A-Za-z]?\d{2,8}$/;
    const idPatternDash = /^[A-Za-z]{1,4}-?\d{2,8}$/;

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (idPattern.test(field) || idPatternDash.test(field)) {
            // The name is likely the next field
            const nameCandidate = fields[i + 1];
            if (nameCandidate && isValidName(nameCandidate)) {
                return { id: field, name: nameCandidate };
            }
            // Or try the previous field
            if (i > 0 && isValidName(fields[i - 1])) {
                return { id: field, name: fields[i - 1] };
            }
        }
    }

    // Strategy 2: First field is ID-like (pure numbers or short alpha-num), second is name-like (Chinese/alpha)
    if (fields.length >= 2) {
        const f0 = fields[0];
        const f1 = fields[1];

        if (looksLikeId(f0) && isValidName(f1)) {
            return { id: f0, name: f1 };
        }
        // Reversed case
        if (isValidName(f0) && looksLikeId(f1)) {
            return { id: f1, name: f0 };
        }
    }

    // Strategy 3: Single field with "ID Name" or "ID-Name" or "ID　Name"
    if (fields.length === 1) {
        const single = fields[0];
        const match = single.match(/^([A-Za-z]?\d{2,8})\s+([\u4e00-\u9fff\w]+)/);
        if (match) {
            return { id: match[1], name: match[2] };
        }
    }

    return null;
}

function looksLikeId(str) {
    return /^\d{1,10}$/.test(str) || /^[A-Za-z]{1,4}\d{1,8}$/.test(str) || /^[A-Za-z]{1,4}-\d{1,8}$/.test(str);
}

function isValidName(str) {
    if (!str || str.length < 1 || str.length > 20) return false;
    // Chinese names (2-5 chars)
    if (/^[\u4e00-\u9fff]{2,5}$/.test(str)) return true;
    // English names
    if (/^[A-Za-z][A-Za-z\s.'-]{1,30}$/.test(str)) return true;
    // Mixed
    if (/^[\u4e00-\u9fffA-Za-z\s]{2,20}$/.test(str)) return true;
    return false;
}

/**
 * Get display text for a candidate
 */
export function formatCandidate(candidate) {
    return `${candidate.id} — ${candidate.name}`;
}
