document.addEventListener("DOMContentLoaded", async () => {
  // Function to load HTML content dynamically
  async function loadHtml(url, elementId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(elementId).innerHTML = html;
    } catch (error) {
      console.error(`Could not load ${url}:`, error);
    }
  }

  // Load header, main content, and footer
  await loadHtml('header.html', 'header-placeholder');
  await loadHtml('main-content.html', 'main-content-placeholder');
  await loadHtml('footer.html', 'footer-placeholder');

  // Original script.js content starts here
        const tabs = document.querySelectorAll(".tab");
        const tabContents = document.querySelectorAll(".tab-content");

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            tabs.forEach((item) => item.classList.remove("active"));
            tabContents.forEach((item) => item.classList.remove("active"));

            tab.classList.add("active");
            const target = document.querySelector(tab.dataset.target);
            target.classList.add("active");
          });
        });

        // Activate the first tab by default
        if (tabs.length > 0) {
          tabs[0].click();
        }

        // Notepad functionality
        const noteTitleInput = document.getElementById("note-title");
        const noteContentTextarea = document.getElementById("note-content");
        const saveNoteBtn = document.getElementById("save-note");
        const deleteNoteBtn = document.getElementById("delete-note");
        const newNoteBtn = document.getElementById("new-note");
        const notesList = document.getElementById("notes-list");

        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        let activeNoteId = null;

        function renderNotes() {
          notesList.innerHTML = "";
          notes.forEach((note) => {
            const li = document.createElement("li");
            li.dataset.id = note.id;
            li.textContent = note.title;
            if (note.id === activeNoteId) {
              li.classList.add("active");
            }
            notesList.appendChild(li);
          });
        }

        function selectNote(id) {
          activeNoteId = id;
          const note = notes.find((n) => n.id === id);
          if (note) {
            noteTitleInput.value = note.title;
            noteContentTextarea.value = note.content;
            deleteNoteBtn.style.display = "inline-block";
          } else {
            noteTitleInput.value = "";
            noteContentTextarea.value = "";
            deleteNoteBtn.style.display = "none";
          }
          renderNotes();
        }

        function saveNote() {
          const title = noteTitleInput.value.trim();
          const content = noteContentTextarea.value.trim();

          if (title === "" || content === "") {
            alert("Note title and content cannot be empty.");
            return;
          }

          if (activeNoteId) {
            // Update existing note
            notes = notes.map((note) =>
              note.id === activeNoteId ? { ...note, title, content } : note
            );
          } else {
            // Create new note
            const newNote = {
              id: Date.now().toString(),
              title,
              content,
            };
            notes.push(newNote);
            activeNoteId = newNote.id;
          }
          localStorage.setItem("notes", JSON.stringify(notes));
          renderNotes();
        }

        function deleteNote() {
          if (activeNoteId) {
            notes = notes.filter((note) => note.id !== activeNoteId);
            localStorage.setItem("notes", JSON.stringify(notes));
            activeNoteId = null;
            selectNote(null);
          }
        }

        saveNoteBtn.addEventListener("click", saveNote);
        deleteNoteBtn.addEventListener("click", deleteNote);
        newNoteBtn.addEventListener("click", () => selectNote(null));
        notesList.addEventListener("click", (e) => {
          if (e.target.tagName === "LI") {
            selectNote(e.target.dataset.id);
          }
        });

        renderNotes();
        selectNote(null); // Start with a blank note

        // Word Counter functionality
        const counterTextarea = document.getElementById("counter-textarea");
        const wordCountSpan = document.getElementById("word-count");
        const charCountSpan = document.getElementById("char-count");
        const sentenceCountSpan = document.getElementById("sentence-count");
        const paragraphCountSpan = document.getElementById("paragraph-count");

        function updateWordCount() {
          const text = counterTextarea.value;
          const words = text.match(/\b\w+\b/g);
          wordCountSpan.textContent = words ? words.length : 0;
          charCountSpan.textContent = text.length;
          sentenceCountSpan.textContent = text.split(/[.!?]/g).filter(Boolean).length;
          paragraphCountSpan.textContent = text.split(/\n\s*\n/g).filter(Boolean).length;
        }

        if (counterTextarea) {
          counterTextarea.addEventListener("input", updateWordCount);
          updateWordCount(); // Initial count
        }

        // Accounting functionality
        const entryForm = document.getElementById("entry-form");
        const entryDateInput = document.getElementById("entry-date");
        const entryDescriptionInput = document.getElementById("entry-description");
        const entryAmountInput = document.getElementById("entry-amount");
        const entryTypeInput = document.getElementById("entry-type");
        const entryCategoryInput = document.getElementById("entry-category");
        const entriesListUl = document.getElementById("entries-list-ul");
        const totalIncomeSpan = document.getElementById("total-income");
        const totalExpenseSpan = document.getElementById("total-expense");
        const balanceSpan = document.getElementById("balance");

        let entries = JSON.parse(localStorage.getItem("accountingEntries")) || [];

        function renderEntries() {
          entriesListUl.innerHTML = "";
          let totalIncome = 0;
          let totalExpense = 0;

          entries.forEach((entry) => {
            const li = document.createElement("li");
            li.classList.add("entry-item");
            li.innerHTML = `
              <div>
                <div class="entry-date">${entry.date}</div>
                <div>${entry.description}</div>
                <div class="entry-category">${entry.category}</div>
              </div>
              <div class="entry-amount ${entry.type}">
                ${entry.type === "expense" ? "-" : ""}￥${entry.amount.toFixed(2)}
              </div>
            `;
            entriesListUl.appendChild(li);

            if (entry.type === "income") {
              totalIncome += entry.amount;
            } else {
              totalExpense += entry.amount;
            }
          });

          totalIncomeSpan.textContent = totalIncome.toFixed(2);
          totalExpenseSpan.textContent = totalExpense.toFixed(2);
          balanceSpan.textContent = (totalIncome - totalExpense).toFixed(2);
        }

        function addEntry(e) {
          e.preventDefault();

          const newEntry = {
            id: Date.now().toString(),
            date: entryDateInput.value,
            description: entryDescriptionInput.value.trim(),
            amount: parseFloat(entryAmountInput.value),
            type: entryTypeInput.value,
            category: entryCategoryInput.value,
          };

          if (
            newEntry.date === "" ||
            newEntry.description === "" ||
            isNaN(newEntry.amount) ||
            newEntry.amount <= 0
          ) {
            alert("Please fill in all valid entry fields.");
            return;
          }

          entries.push(newEntry);
          localStorage.setItem("accountingEntries", JSON.stringify(entries));
          renderEntries();
          entryForm.reset();
        }

        if (entryForm) {
          entryForm.addEventListener("submit", addEntry);
          // Set current date as default
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          entryDateInput.value = `${year}-${month}-${day}`;
          renderEntries(); // Initial render
        }
      });