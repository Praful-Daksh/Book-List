var addButton = document.getElementById('button');
var table = document.getElementById('book-table');

addButton.addEventListener('click', addBook);
table.addEventListener('click', deleteBook);

function addBook(e) {
  
  e.preventDefault();
  
  var bookTitle = document.getElementById('title').value;
  var bookAuthor = document.getElementById('author').value;
  var bookCode = document.getElementById('book-code').value;
  
// checking input is not empty
  if (bookTitle != '' && bookAuthor != '' && bookCode != '') {
    var newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${bookTitle}</td>
         <td>${bookAuthor}</td>
          <td>${bookCode}</td>
          <td><button class="btn btn-danger">X</button></td>`;
          
    table.appendChild(newRow);
    
// clearing inputs

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('book-code').value= '';
    
// alert of success

    showAlert('Succesfully Added New Book ✓', 'success');
  }
  else {
    showAlert(`⚠️ Fill  required Fields`, 'danger');
  }
}


function showAlert(message, Classname) {
  alertArea = document.getElementById('Notification');
  Alert = document.createElement('div');
  Alert.className = `alert alert-${Classname}`
  Alert.textContent = message;
  alertArea.appendChild(Alert);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function deleteBook(e) {
  if (e.target.classList.contains('btn-danger')) {
    row = e.target.parentElement;
    row = row.parentElement;
    if(confirm('Are You Sure to Remove ? It Will Permanently Deleted And Can not be Restored') == true){
    table.removeChild(row);
    showAlert(`Successfully Deleted`, 'info');
    }
  }
}