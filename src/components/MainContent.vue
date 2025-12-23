<template>
  <main class="main-content">
    <div class="container">
      <nav class="tab-navigation">
        <button class="tab active" data-target="#notepad-tool">记事本</button>
        <button class="tab" data-target="#word-counter-tool">字数统计</button>
        <button class="tab" data-target="#accounting-tool">记账本</button>
      </nav>

      <div id="notepad-tool" class="tab-content active">
        <div class="tool-card">
          <h2>记事本</h2>
          <div class="notepad-controls">
            <input type="text" id="note-title" placeholder="笔记标题" />
            <button id="save-note">保存笔记</button>
            <button id="delete-note" style="display: none">删除笔记</button>
            <button id="new-note">新建笔记</button>
          </div>
          <textarea id="note-content" placeholder="在这里写下你的笔记..."></textarea>
          <ul id="notes-list" class="notes-list"></ul>
        </div>
      </div>

      <div id="word-counter-tool" class="tab-content">
        <div class="tool-card">
          <h2>字数统计</h2>
          <textarea
            id="counter-textarea"
            placeholder="在此处输入文本以进行字数统计..."
          ></textarea>
          <div class="word-count-display">
            <p>字数: <span id="word-count">0</span></p>
            <p>字符数: <span id="char-count">0</span></p>
            <p>句子数: <span id="sentence-count">0</span></p>
            <p>段落数: <span id="paragraph-count">0</span></p>
          </div>
        </div>
      </div>

      <div id="accounting-tool" class="tab-content">
        <div class="tool-card">
          <h2>记账本</h2>
          <form id="entry-form" class="entry-form">
            <input type="date" id="entry-date" required />
            <input
              type="text"
              id="entry-description"
              placeholder="描述"
              required
            />
            <input
              type="number"
              id="entry-amount"
              placeholder="金额"
              required
            />
            <select id="entry-type" required>
              <option value="income">收入</option>
              <option value="expense">支出</option>
            </select>
            <input
              type="text"
              id="entry-category"
              placeholder="类别 (例如: 食物, 交通)"
              required
            />
            <button type="submit">添加条目</button>
          </form>

          <div class="summary-section">
            <h3>最近条目</h3>
            <ul id="entries-list-ul" class="entries-list"></ul>
            <div class="total-summary">
              <p>总收入: <span id="total-income" class="income">0.00</span></p>
              <p>总支出: <span id="total-expense" class="expense">0.00</span></p>
              <p>余额: <span id="balance">0.00</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="tool-card development-notes">
        <h2>开发笔记</h2>
        <p>
          这个工具集旨在提供一个方便的平台，汇集各种实用的网络开发工具。
          我们的目标是简化您的工作流程，提高生产力，并为您提供一个集中管理日常开发任务的场所。
        </p>
        <p>
          未来，我们计划增加更多功能，例如代码格式化工具、颜色选择器、单位转换器等。
          我们还将不断优化用户体验，确保工具的响应速度和易用性。
        </p>
        <p>
          感谢您的使用！如果您有任何建议或反馈，请随时告诉我们。
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'MainContent',
  setup() {
    onMounted(() => {
      // Tab functionality
      const tabs = document.querySelectorAll(".tab");
      const tabContents = document.querySelectorAll(".tab-content");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((item) => item.classList.remove("active"));
          tabContents.forEach((item) => item.classList.remove("active"));

          tab.classList.add("active");
          const target = document.querySelector(tab.dataset.target as string);
          if (target) {
            target.classList.add("active");
          }
        });
      });

      // Activate the first tab by default
      if (tabs.length > 0) {
        (tabs[0] as HTMLElement).click();
      }
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.main-content {
  padding: 2rem 0;
}

.main-content .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

.tab-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab {
  background-color: transparent;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #555;
  position: relative;
  overflow: hidden;
}

.tab::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.tab:hover {
  color: #007bff;
}

.tab.active {
  color: #007bff;
  font-weight: bold;
}

.tab.active::after {
  background-color: #007bff;
}

.tab-content {
  display: none;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-content.active {
  display: block;
}

.tool-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tool-card h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Notepad styles */
.notepad-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.notepad-controls input[type="text"] {
  flex-grow: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.notepad-controls button {
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.notepad-controls button:hover {
  background-color: #0056b3;
}

textarea#note-content {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
}

.notes-list {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
}

.notes-list li {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notes-list li:last-child {
  border-bottom: none;
}

.notes-list li:hover,
.notes-list li.active {
  background-color: #f0f8ff;
  color: #007bff;
}

/* Word Counter styles */
textarea#counter-textarea {
  width: 100%;
  height: 180px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
}

.word-count-display p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.word-count-display span {
  font-weight: bold;
  color: #007bff;
}

/* Accounting styles */
.entry-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 1.5rem;
  align-items: end;
}

.entry-form input,
.entry-form select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

.entry-form button[type="submit"] {
  padding: 0.8rem 1.2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  grid-column: span 1; /* Ensure button takes one column */
}

.entry-form button[type="submit"]:hover {
  background-color: #218838;
}

.summary-section h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.entries-list {
  list-style: none;
  padding: 0;
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.entries-list .entry-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #eee;
}

.entries-list .entry-item:last-child {
  border-bottom: none;
}

.entries-list .entry-item > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.entries-list .entry-date {
  font-size: 0.9rem;
  color: #777;
}

.entries-list .entry-category {
  font-size: 0.9rem;
  color: #555;
  background-color: #e9ecef;
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
}

.entries-list .entry-amount {
  font-weight: bold;
  font-size: 1.1rem;
}

.entries-list .entry-amount.income {
  color: #28a745;
}

.entries-list .entry-amount.expense {
  color: #dc3545;
}

.total-summary {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  border: 1px solid #eee;
}

.total-summary p {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.total-summary p:last-child {
  margin-bottom: 0;
  font-weight: bold;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.total-summary .income {
  color: #28a745;
}

.total-summary .expense {
  color: #dc3545;
}

/* Development Notes styles */
.development-notes h2 {
  color: #007bff;
}

.development-notes p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #555;
}

.development-notes p:last-child {
  margin-bottom: 0;
}
</style>