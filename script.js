var addButton = document.getElementById('button');
var data = document.getElementById('book-table');
var table = document.querySelector('tbody');

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static addBook() {
        var bookTitle = document.getElementById('title').value;
        var bookAuthor = document.getElementById('author').value;
        var bookCode = document.getElementById('book-code').value;
        if (bookTitle !== '' && bookAuthor !== '' && bookCode !== '') {
            const book = new Book(bookTitle, bookAuthor, bookCode);
            UI.displayOnUi(bookTitle, bookAuthor, bookCode);
            UI.clearFields();
            UI.saveBooks();  
        } else {
            UI.showAlert('⚠️ Fill required Fields', 'danger');
        }
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('book-code').value = '';
    }

    static displayOnUi(bookTitle, bookAuthor, bookCode) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${bookTitle}</td>
             <td>${bookAuthor}</td>
              <td>${bookCode}</td>
              <td><button class="btn btn-danger">X</button></td>`;
        table.appendChild(newRow);  
        UI.showAlert('Successfully Added New Book ✓', 'success');
    }

    static showAlert(message, className) {
        var alertArea = document.getElementById('Notification');
        var Alert = document.createElement('div');
        Alert.className = `alert alert-${className}`;
        Alert.textContent = message;
        alertArea.appendChild(Alert);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static deleteBook(el) {
        if (el.classList.contains('btn-danger')) {
            var row = el.parentElement.parentElement;  
            if (confirm('Are You Sure to Remove? It Will Be Permanently Deleted And Cannot be Restored')) {
                table.removeChild(row);
                UI.showAlert('Successfully Deleted', 'info');
                UI.saveBooks(); 
            }
        }
    }

    static saveBooks() {
        var rows = document.querySelectorAll('tbody tr'); 
        var books = [];
        rows.forEach(row => {
            var cells = row.querySelectorAll('td');
            books.push({
                title: cells[0].textContent,
                author: cells[1].textContent,
                isbn: cells[2].textContent
            });
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    static loadBooks() {
        var books = JSON.parse(localStorage.getItem('books') || '[]');
        if (Array.isArray(books)) {
            books.forEach(book => {
                UI.displayOnUi(book.title, book.author, book.isbn);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', UI.loadBooks); 
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    UI.addBook(); 
});
data.addEventListener('click', function(e) {
    UI.deleteBook(e.target);
});
