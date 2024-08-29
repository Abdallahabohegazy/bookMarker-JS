
var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');
var addBtn = document.getElementById('addBtn');
var tableBody = document.getElementById('tableBody');
var bookMarks = [];



if(localStorage.getItem('containerBookMark') != null){
    bookMarks = JSON.parse(localStorage.getItem('containerBookMark'));
    displayBook(bookMarks);
}




function isValidHttpUrl(urlInput) {
    try {
        const newUrl = new URL(urlInput);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
        return false;
    }
}



function addBook(){
        if(addBtn.innerHTML == 'Update'){
            addBtn.innerHTML ='Submit';
            addBtn.classList.replace( 'btn-warning' , 'btn-primary');
            var bookMark = {
                name : nameInput.value , 
                url  : urlInput.value
            }
            bookMarks.splice(mainIndex , 1 , bookMark);
        }else{
            var bookMark = {
                name : nameInput.value , 
                url  : urlInput.value
            }
            bookMarks.push(bookMark);
        }
        localStorage.setItem('containerBookMark',JSON.stringify(bookMarks));
        displayBook(bookMarks);
        clearBook();
}



function displayBook(arr){
    var marks = ``;
    for(var i = 0 ; i < arr.length ; i++){
        marks += `<tr>
            <td class="fw-bold">${arr[i].name}</td>
            <td><a target="blank" href="${arr[i].url}"><button class = "btn btn-primary">Visit</button></a></td>
            <td><button  onclick="updateBook(${i})" class = "btn btn-warning">Update</button></td>
            <td><button  onclick="deleteBook(${i})" class = "btn btn-danger">Delete</button></td>
        </tr>`
    } 
    tableBody.innerHTML = marks ;
    
}


function clearBook(){
    nameInput.value = ''; 
    urlInput.value = '';
}


function deleteBook(index){
    bookMarks.splice(index , 1);
    localStorage.setItem('containerBookMark',JSON.stringify(bookMarks));
    displayBook(bookMarks);
}



var mainIndex = 0;
function updateBook(index){
    nameInput.value = bookMarks[index].name; 
    urlInput.value = bookMarks[index].url;
    addBtn.innerHTML = 'Update';
    addBtn.classList.replace('btn-primary' , 'btn-warning');
    mainIndex = index;
}



function searchBook(term) {
    var matchBook = [];
    for( var i = 0 ; i < bookMarks.length ; i++){
        if(bookMarks[i].name.toLowerCase().includes(term.toLowerCase()) === true){
            matchBook.push(bookMarks[i]);
        }
    }
    displayBook(matchBook);
}



function validateBookName(){
    var regex = /^[A-Za-z_]{3,}$/;
    return regex.test(nameInput.value); 
}
function validateBookUrl(){
    var regex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9_]{3,}\.com$/;
    return regex.test(urlInput.value);
}

nameInput.onkeyup = function(){
    if(validateBookName()  && validateBookUrl() ){
        addBtn.removeAttribute('disabled');
    }else{
        addBtn.disabled ='true'
    }
}
urlInput.onkeyup = function(){
    if(validateBookName()  && validateBookUrl() ){
        addBtn.removeAttribute('disabled');
    }else{
        addBtn.disabled ='true'
    }
}