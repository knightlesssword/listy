class ChecklistApp {
    constructor() {
        this.checklist = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.loadFromURL();
        this.loadFromStorage();
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        // Add item
        document.getElementById('add-btn').addEventListener('click', () => this.addItem());
        document.getElementById('new-item-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });

        // Share functionality
        document.getElementById('share-btn').addEventListener('click', () => this.shareList());
    }

    addItem() {
        const input = document.getElementById('new-item-input');
        const text = input.value.trim();

        if (text === '') return;

        const newItem = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };

        this.checklist.push(newItem);
        input.value = '';
        this.saveToStorage();
        this.render();
    }

    editItem(id) {
        const item = this.checklist.find(item => item.id === id);
        if (!item) return;

        this.currentEditId = id;
        
        // Create edit interface
        const checklistItem = document.querySelector(`[data-id="${id}"]`);
        const itemText = checklistItem.querySelector('.item-text');
        const editBtn = checklistItem.querySelector('.edit-btn');
        
        // Replace text with input
        itemText.style.display = 'none';
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = item.text;
        editInput.className = 'edit-input';
        itemText.parentNode.insertBefore(editInput, itemText);
        editInput.focus();
        editInput.select();

        // Change button to save/cancel
        editBtn.textContent = 'Save';
        editBtn.onclick = () => this.saveEdit(id, editInput.value);
        
        // Add cancel button
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'edit-btn';
        cancelBtn.style.backgroundColor = '#6c757d';
        cancelBtn.onclick = () => this.cancelEdit();
        
        checklistItem.querySelector('.item-controls').insertBefore(cancelBtn, editBtn);

        // Handle Enter and Escape keys
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveEdit(id, editInput.value);
            if (e.key === 'Escape') this.cancelEdit();
        });

        editInput.addEventListener('blur', () => {
            setTimeout(() => this.cancelEdit(), 100);
        });
    }

    saveEdit(id, newText) {
        const text = newText.trim();
        if (text === '') {
            this.deleteItem(id);
            return;
        }

        const item = this.checklist.find(item => item.id === id);
        if (item) {
            item.text = text;
        }
        
        this.currentEditId = null;
        this.saveToStorage();
        this.render();
    }

    cancelEdit() {
        if (this.currentEditId) {
            this.currentEditId = null;
            this.render();
        }
    }

    deleteItem(id) {
        this.checklist = this.checklist.filter(item => item.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleItem(id) {
        const item = this.checklist.find(item => item.id === id);
        if (item) {
            item.completed = !item.completed;
            this.saveToStorage();
            this.render();
        }
    }

    render() {
        const checklistElement = document.getElementById('checklist');
        const emptyState = document.querySelector('.empty-state');
        
        if (this.checklist.length === 0) {
            checklistElement.style.display = 'none';
            if (!emptyState) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.innerHTML = 'No items yet. Add your first item above!';
                checklistElement.parentNode.insertBefore(emptyDiv, checklistElement);
            } else {
                emptyState.style.display = 'block';
            }
        } else {
            checklistElement.style.display = 'block';
            const existingEmptyState = document.querySelector('.empty-state');
            if (existingEmptyState) {
                existingEmptyState.style.display = 'none';
            }
        }

        checklistElement.innerHTML = this.checklist.map(item => `
            <li class="checklist-item ${item.completed ? 'completed' : ''}" data-id="${item.id}">
                <input type="checkbox" class="checkbox" ${item.completed ? 'checked' : ''} 
                       onchange="app.toggleItem('${item.id}')">
                <span class="item-text">${this.escapeHtml(item.text)}</span>
                <div class="item-controls">
                    <button class="edit-btn" onclick="app.editItem('${item.id}')">Edit</button>
                    <button class="delete-btn" onclick="app.deleteItem('${item.id}')">Delete</button>
                </div>
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveToStorage() {
        localStorage.setItem('checklist', JSON.stringify(this.checklist));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('checklist');
        if (stored) {
            this.checklist = JSON.parse(stored);
        }
    }

    shareList() {
        if (this.checklist.length === 0) {
            alert('Cannot share an empty list. Add some items first!');
            return;
        }

        // Create shareable URL with encoded data
        const shareData = {
            title: 'Listy',
            items: this.checklist.map(item => ({
                text: item.text,
                completed: item.completed
            }))
        };
        
        const encodedData = btoa(JSON.stringify(shareData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?list=${encodedData}`;
        
        // Show the share link
        const shareLinkElement = document.getElementById('share-link');
        shareLinkElement.value = shareUrl;
        shareLinkElement.style.display = 'block';
        shareLinkElement.select();
        
        try {
            // Try to copy to clipboard
            document.execCommand('copy');
            alert('Share link copied to clipboard!');
        } catch (err) {
            // Fallback: just show the link
            console.log('Share URL:', shareUrl);
            alert('Share link displayed below. Copy it to share!');
        }

        // Hide the link after 10 seconds
        setTimeout(() => {
            shareLinkElement.style.display = 'none';
        }, 10000);
    }

    loadFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const listParam = urlParams.get('list');
        
        if (listParam) {
            try {
                const decodedData = JSON.parse(atob(listParam));
                if (decodedData.items && Array.isArray(decodedData.items)) {
                    this.checklist = decodedData.items.map(item => ({
                        ...item,
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
                    }));
                    
                    // Clear URL to avoid confusion
                    window.history.replaceState({}, document.title, window.location.pathname);
                    
                    // Show message that list was loaded
                    setTimeout(() => {
                        alert('Shared list loaded! You can edit, add, or delete items.');
                    }, 500);
                }
            } catch (err) {
                console.error('Failed to load shared list:', err);
                alert('Failed to load shared list. It may be corrupted.');
            }
        }
    }
}

// Initialize the app
const app = new ChecklistApp();
