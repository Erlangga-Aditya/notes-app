// ==========================================
// MY NOTES - MAIN APPLICATION
// Core Logic & Functions
// ==========================================

// Fungsi untuk menampilkan semua catatan
function displayAllNotes() {
    const displayContainer = document.getElementById('cardDisplay');
    displayContainer.innerHTML = '';

    notesData.forEach(noteData => {
        const cardElement = document.createElement('card-item');

        // Set custom attributes - KRITERIA OPSIONAL 3
        cardElement.setAttribute('data-id', noteData.id);
        cardElement.setAttribute('data-title', noteData.title);
        cardElement.setAttribute('data-content', noteData.body);
        cardElement.setAttribute('data-timestamp', noteData.createdAt);

        displayContainer.appendChild(cardElement);
    });
}

// Fungsi untuk menghapus catatan berdasarkan ID
function removeNoteById(noteId) {
    const confirmDelete = confirm('Yakin ingin menghapus catatan ini?');

    if (confirmDelete) {
        const noteIndex = notesData.findIndex(item => item.id === noteId);

        if (noteIndex !== -1) {
            notesData.splice(noteIndex, 1);
            displayAllNotes();
        }
    }
}

// Inisialisasi aplikasi saat DOM loaded
document.addEventListener('DOMContentLoaded', function () {
    displayAllNotes();
    console.log('✅ My Notes App berhasil dimuat!');
    console.log(`📊 Total catatan: ${notesData.length}`);
});