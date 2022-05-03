let users = []

function register() {
    let fullname = document.getElementById("fname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(fullname, email, password)
    console.log("We here now")
    let user = {
        email: email,
        fullname: fullname,
        password: password
    }

    console.log(user)

    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))

    // if (fullname == fullname && email == email && password == password)

        // location.href = "dashboard.html"
}


function getUser() {
         

         let user = JSON.parse(localStorage.getItem("users"))
         let email = document.getElementById("email").value
         let password = document.getElementById("password").value   

         console.log(email, password)
    let list = user.length &&
    JSON.parse(localStorage.getItem('users')).some(data => data.email == email && data.password == password);
    
    if(!list){
        alert("Enter Correct Info or Sign Up");
    }
    else{
        alert("Welcome !")
        location.href = "dashboard.html";
    }

}