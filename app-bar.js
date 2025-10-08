// ==========================================
// MY NOTES - HEADER COMPONENT
// Custom Web Component untuk Header
// ==========================================

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        const appTitle = this.getAttribute('app-title') || 'My Notes';

        this.innerHTML = `
            <style>
                .main-header {
                    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
                    padding: 30px 35px;
                    border-radius: 16px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    text-align: center;
                    border: 2px solid rgba(33, 147, 176, 0.1);
                }
                
                .main-header h1 {
                    color: #2193b0;
                    font-size: 36px;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                }
                
                @media screen and (max-width: 480px) {
                    .main-header {
                        padding: 25px;
                    }
                    
                    .main-header h1 {
                        font-size: 28px;
                    }
                }
            </style>
            <header class="main-header">
                <h1>📒 ${appTitle}</h1>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);