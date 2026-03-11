# 🎨 Vibe Code 抽選 App

在 2026 年的開發環境下，我們不再糾結於每一行代碼的語法，而是專注於 **「意圖的傳達」** 與 **「Agent 的調度」**。本次專案選用 **Antigravity IDE**，展示如何從混亂的原始資料中，快速孵化出一個具備日系質感與嚴謹邏輯的工具。

---

## 🛠 開發工具：Antigravity IDE

我們將開發環境架設在 **Antigravity** 上，利用其強大的 **Agent Manager** 實現多代理協作，讓開發過程從「打字」變成了「指揮」。
---

## Step 1. 定義任務意圖（The Mission Script）

**Vibe Coding 的核心：不要過度設計 Prompt。** 我們不需要寫出明確的模組名稱或方法，而是給予「角色」與「明確的目標」，讓 Agent 展現其推理與模式識別能力。

### 原始發信 Prompt：

```markdown
# Role: Senior Full-stack Agent
# Task: Build a Modern Personnel Raffle Web App

1. Data Parsing Logic:
   - Create a smart input area that accepts messy text copy-pasted from the staff directory.
   - Automatically identify and extract the "Employee ID (行編)" and "Name (姓名)". 
   - Note: The source text contains extra tabs, line breaks, and irrelevant fields (e.g., gender, phone). Filter these out and maintain a clean JSON list of candidates.

2. Functional Requirements:
   - User can specify the number of winners via a sleek slider or input field.
   - Prevent duplicate draws if the pool allows.

3. Visual & Vibe (The "Vibe" Part):
   - Style: Dark mode, financial professional yet high-tech (using Tailwind CSS).
   - Core Feature: A high-performance "Spinning Wheel" or "Rolling Name List" animation using Framer Motion.
   - Result: When a winner is selected, display their "ID - Name" with a "Celebration Confetti" effect.

4. Technical Stack: 
   - React, Tailwind CSS, Lucide-react icons. 
   - Ensure the parsing logic is robust against varying copy-paste formats.

```
---

## Step 2. 選擇運行模式與模型

在 Antigravity 中，我們可以根據任務複雜度切換模式。

* **Planning Mode：** 適合處理複雜邏輯（如：資料解析與多重抽選狀態）。
* **Fast Mode：** 適合處理 UI 微調與 CSS 樣式修正。

---

## Step 3. 任務審核與自動化驗測（Agentic Loop）

Agent 會根據 Prompt 拆解出任務清單（Tasks）。雖然 Vibe Coding 講求放手，但我們仍能隨時介入或修改 Task 文件，確保 Agent 的執行路徑符合專業預期。

> **💡 心得：** 其實開發過程中我幾乎沒在看 Code，直接放給 Agent 跑。它可以自動開啟瀏覽器模擬使用者進行功能測試，甚至能錄製操作過程讓我們回放。

### 執行進度與自動化監測

### 瀏覽器模擬測試

---

## Step 4. 美術風格迭代：從「華麗」回歸「質感」

初版生成時，Agent 自由發揮出的畫面可能過於華麗（例如深紫色系）。這正是 Vibe Coding 展現威力的時候——我們不需要重寫 CSS，只需補上一句 Prompt 要求改為 **「日系質感線條風格」**，Agent 即可完成全站重構。

> **💡 進階技巧：** 若要完全精準控速，也可以先在 **Google Stitch**、**Figma** 或 **Lovable** 產出設計稿後匯入，再由 Antigravity 負責實作 HTML 與邏輯，實現設計與代碼的無縫對接。

---

## 🚀 最終成果展示

專案已成功自動部署至 **Vercel**，實現了從「描述意圖」到「上線運行」的完整閉環。

### [點此體驗：Vibe-Draw 抽選系統](https://demo-draw-by-little-air.vercel.app/)
