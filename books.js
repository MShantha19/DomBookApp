const baseUrl ="https://glitch.com/edit/#!/imminent-reliable-wizard"
document.addEventListener("DOMContentLoaded",()=>{
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if(!loginData || loginData.role !== "admin"){
        alert("Admin Not Logged In")
        window.location.href="index.html";
    }
   document.querySelector("#showAvailableBooks").addEventListner("click",()=>{
    fetch(`${baseUrl}?isAvailable=true`)
    .then((res)=> res.json())
    .then((books)=>{
        renderBooks(books, true);
    });
    });
    document.querySelector("#showBorrowedBooks").addEventListner("click",()=>{
        fetch(`${baseUrl}?isAvailable=false`)
        .then((res)=> res.json())
        .then((books)=>{
            renderBooks(books, false);
        });
        });
      
    function renderBooks(books, isAvailable){
            const bookGrid = document.querySelector("#bookGrid");
            bookGrid.innerHTML=books
            .map(
                (book)=>`
                <div class="card">
                <img src="${book.imageUrl}" alt="${book.title}" width="100">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p> Category:${book.category}</p>
                <p>Borrowed Days:${book.borrowedDays || "N/A"}</p>
                ${
                    isAvailable
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
                    :`<button onclick="returnBook(${book.id})">Return</button>`
                }</div>   `  
            )
            .join("");
    }
    window.borrowBook = (id) =>{
        const days= prompt("Enter borrowing duration (max 10 days):");
        if(days>0 && days<=10){
        fetch(`${baseUrl}/${id}`,{
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({isAvailable:false, borrowedDays: days}),
        }).then(()=> alert("Book Borrowed Successfully"));
    }else{
        alert("Invalid Duration");
    }
};
    window.returnBook = (id) =>{
        fetch(`${baseUrl}/${id}`,{
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({isAvailable:true, borrowedDays:numm}),
        }).then(()=> alert("Book Returned Successfully"));
    };
  
});