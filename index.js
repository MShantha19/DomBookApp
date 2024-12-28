document.querySelector("#loginform").addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.querySelector("#email").Value;
    const password = document.querySelector("#password").Value;

    if(email=="admin@empher.com" && Password=="empher@123"){
        localStorage.setItem("loginData", JSON.stringify({email,role:"admin"}));
        alert("Logged in as Admin.");
        window.Location.href="admin.html";
    }
    else if(email=="user@empher.com" && Password=="user@123"){
        localStorage.setItem("loginData", JSON.stringify({email,role:"user"}));
        alert("Logged in as User.");
        window.Location.href="books.html";
    }else{
        alert("Invalid credentials");
    }

});