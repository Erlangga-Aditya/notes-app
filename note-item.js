// ==========================================
// MY NOTES - CARD ITEM COMPONENT
// Web Component dengan Custom Attributes
// ==========================================

class CardItem extends HTMLElement {
    // Observasi perubahan custom attributes
    static get observedAttributes() {
        return ['data-id', 'data-title', 'data-content', 'data-timestamp'];
    }

    connectedCallback() {
        this.displayCard();
    }

    attributeChangedCallback() {
        this.displayCard();
    }

    displayCard() {
        const noteId = this.getAttribute('data-id');
        const noteTitle = this.getAttribute('data-title');
        const noteContent = this.getAttribute('data-content');
        const timestamp = this.getAttribute('data-timestamp');

        const dateFormatted = new Date(timestamp).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        this.innerHTML = `
            <style>
                .note-card {
                    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                    border-radius: 16px;
                    padding: 28px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgba(33, 147, 176, 0.1);
                    position: relative;
                    overflow: hidden;
                }
                
                .note-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: linear-gradient(to bottom, #2193b0, #6dd5ed);
                }
                
                .note-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 12px 28px rgba(33, 147, 176, 0.2);
                }
                
                .card-top {
                    margin-bottom: 18px;
                    padding-left: 12px;
                }
                
                .card-heading {
                    color: #2193b0;
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    word-wrap: break-word;
                    line-height: 1.3;
                }
                
                .card-timestamp {
                    color: #64748b;
                    font-size: 13px;
                    font-weight: 500;
                }
                
                .card-text {
                    color: #334155;
                    line-height: 1.7;
                    flex-grow: 1;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    font-size: 15px;
                    padding-left: 12px;
                }
                
                .card-footer {
                    margin-top: 24px;
                    padding-top: 18px;
                    border-top: 2px solid #e2e8f0;
                }
                
                .remove-button {
                    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 600;
                    transition: all 0.25s ease;
                    width: 100%;
                    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
                }
                
                .remove-button:hover {
                    background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                }

                .remove-button:active {
                    transform: translateY(0);
                }
            </style>
            <article class="note-card">
                <div class="card-top">
                    <h3 class="card-heading">${noteTitle}</h3>
                    <p class="card-timestamp">🕐 ${dateFormatted}</p>
                </div>
                <p class="card-text">${noteContent}</p>
                <div class="card-footer">
                    <button class="remove-button" onclick="removeNoteById('${noteId}')">🗑 Hapus Catatan</button>
                </div>
            </article>
        `;
    }
}

customElements.define('card-item', CardItem);