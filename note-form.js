// ==========================================
// MY NOTES - FORM INPUT COMPONENT
// Web Component dengan Validasi Real-time
// ==========================================

class FormInput extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .input-wrapper {
                    margin-bottom: 25px;
                }
                
                .input-wrapper label {
                    display: block;
                    margin-bottom: 10px;
                    color: #1a1a1a;
                    font-weight: 600;
                    font-size: 15px;
                }
                
                .input-wrapper input,
                .input-wrapper textarea {
                    width: 100%;
                    padding: 14px 18px;
                    border: 2px solid #d1d5db;
                    border-radius: 12px;
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    transition: all 0.25s ease;
                    background: #fafafa;
                }
                
                .input-wrapper input:focus,
                .input-wrapper textarea:focus {
                    outline: none;
                    border-color: #2193b0;
                    background: #ffffff;
                    box-shadow: 0 0 0 4px rgba(33, 147, 176, 0.08);
                }
                
                .input-wrapper textarea {
                    resize: vertical;
                    min-height: 130px;
                    line-height: 1.6;
                }
                
                .validation-msg {
                    color: #dc2626;
                    font-size: 13px;
                    margin-top: 6px;
                    display: none;
                    font-weight: 500;
                }
                
                .validation-msg.active {
                    display: block;
                }
                
                .input-wrapper input.invalid,
                .input-wrapper textarea.invalid {
                    border-color: #dc2626;
                    background: #fef2f2;
                }
                
                .counter {
                    text-align: right;
                    font-size: 13px;
                    color: #6b7280;
                    margin-top: 6px;
                    font-weight: 500;
                }
                
                .counter.alert {
                    color: #ea580c;
                }
                
                .counter.danger {
                    color: #dc2626;
                }
                
                .add-button {
                    background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
                    color: white;
                    padding: 14px 35px;
                    border: none;
                    border-radius: 12px;
                    font-size: 17px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    width: 100%;
                    box-shadow: 0 4px 12px rgba(33, 147, 176, 0.3);
                }
                
                .add-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(33, 147, 176, 0.4);
                }
                
                .add-button:active {
                    transform: translateY(-1px);
                }
                
                .add-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }
            </style>
            <form id="addNoteForm">
                <div class="input-wrapper">
                    <label for="titleInput">Judul Catatan</label>
                    <input 
                        type="text" 
                        id="titleInput" 
                        placeholder="Ketik judul catatan di sini..." 
                        required
                        maxlength="50"
                        autocomplete="off"
                    >
                    <div class="counter" id="titleCounter">0/50</div>
                    <div class="validation-msg" id="titleValidation">Judul minimal 3 karakter</div>
                </div>
                <div class="input-wrapper">
                    <label for="contentInput">Isi Catatan</label>
                    <textarea 
                        id="contentInput" 
                        placeholder="Tulis isi catatan Anda..." 
                        required
                        maxlength="500"
                    ></textarea>
                    <div class="counter" id="contentCounter">0/500</div>
                    <div class="validation-msg" id="contentValidation">Isi catatan minimal 10 karakter</div>
                </div>
                <button type="submit" class="add-button">➕ Tambahkan Catatan</button>
            </form>
        `;

        this.initValidation();
    }

    initValidation() {
        const formElement = this.querySelector('#addNoteForm');
        const titleField = this.querySelector('#titleInput');
        const contentField = this.querySelector('#contentInput');
        const titleValidation = this.querySelector('#titleValidation');
        const contentValidation = this.querySelector('#contentValidation');
        const titleCounter = this.querySelector('#titleCounter');
        const contentCounter = this.querySelector('#contentCounter');

        // Validasi real-time untuk judul
        titleField.addEventListener('input', () => {
            const trimmedValue = titleField.value.trim();
            const currentLength = titleField.value.length;

            titleCounter.textContent = `${currentLength}/50`;

            if (currentLength > 40) {
                titleCounter.classList.add('alert');
            } else {
                titleCounter.classList.remove('alert');
            }

            if (currentLength === 50) {
                titleCounter.classList.add('danger');
            } else {
                titleCounter.classList.remove('danger');
            }

            if (trimmedValue.length > 0 && trimmedValue.length < 3) {
                titleField.classList.add('invalid');
                titleValidation.classList.add('active');
            } else {
                titleField.classList.remove('invalid');
                titleValidation.classList.remove('active');
            }
        });

        // Validasi real-time untuk konten
        contentField.addEventListener('input', () => {
            const trimmedValue = contentField.value.trim();
            const currentLength = contentField.value.length;

            contentCounter.textContent = `${currentLength}/500`;

            if (currentLength > 450) {
                contentCounter.classList.add('alert');
            } else {
                contentCounter.classList.remove('alert');
            }

            if (currentLength === 500) {
                contentCounter.classList.add('danger');
            } else {
                contentCounter.classList.remove('danger');
            }

            if (trimmedValue.length > 0 && trimmedValue.length < 10) {
                contentField.classList.add('invalid');
                contentValidation.classList.add('active');
            } else {
                contentField.classList.remove('invalid');
                contentValidation.classList.remove('active');
            }
        });

        // Handler submit form
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const titleValue = titleField.value.trim();
            const contentValue = contentField.value.trim();

            if (titleValue.length < 3 || contentValue.length < 10) {
                if (titleValue.length < 3) {
                    titleField.classList.add('invalid');
                    titleValidation.classList.add('active');
                }
                if (contentValue.length < 10) {
                    contentField.classList.add('invalid');
                    contentValidation.classList.add('active');
                }
                return;
            }

            const newNoteData = {
                id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                title: titleValue,
                body: contentValue,
                createdAt: new Date().toISOString(),
                archived: false
            };

            notesData.unshift(newNoteData);
            displayAllNotes();

            formElement.reset();
            titleCounter.textContent = '0/50';
            contentCounter.textContent = '0/500';
            titleCounter.classList.remove('alert', 'danger');
            contentCounter.classList.remove('alert', 'danger');
        });
    }
}

customElements.define('form-input', FormInput);