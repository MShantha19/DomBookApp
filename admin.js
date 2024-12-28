const baseUrl ="https://glitch.com/edit/#!/imminent-reliable-wizard"
document.addEventListener("DOMContentLoaded",()=>{
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if(!loginData || loginData.role !== "admin"){
        alert("Admin Not Logged In")
        window.location.href="index.html";
    }
    const form = document.querySelector("#addBookForm");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const title = document.querySelector("#title").Value;
        const author = document.querySelector("#author").Value;
        const category = document.querySelector("#category").Value;
        fetch(baseUrl,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                title,
                author,
                category,
                isAvailable: true,
                isVerified: false,
                borrowedDays:null,
                imageUrl:"https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg"
            }),

        }).then(()=>{
            alert("Book added Successfully");
            fetchBooks();
        });

    });
    function fetchBooks(){
        fetch(baseUrl)
        .then((res)=> res.json())
        .then((books)=>{
            const bookGrid = document.querySelector("#bookGrid");
            bookGrid.innerHTML=books
            .map(
                (book)=>`
                <div class="card">
                <img src="${book.imageUrl}" alt="${book.title}" width="100">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p> Category:${book.category}</p>
                <button onclick="verifyBook(${book.id})"${
                    book.isVerified ? "disabled" : ""
                }> Verify</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
                </div>
                `
            )
            .join("");
    });
}
    window.verifyBook = (id) =>{
        fetch(`${baseUrl}/${id}`,{
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({isVerified:true}),
        }).then(()=> fetchBooks());
    };
    window.deleteBook =(id)=>{
        fetch(`${baseUrl}/${id}`,{method:"DELETE"})
        .then(()=>fetchBooks());
    };
    fetchBooks();
});