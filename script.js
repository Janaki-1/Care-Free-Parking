// ----------- Dynamic Navbar -----------
function updateNavbar() {
  const navLinks = document.getElementById("navLinks");
  if(!navLinks) return;

  navLinks.innerHTML = "";
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if(user){
    navLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="find_parking.html">Find Parking</a></li>
      <li class="nav-item"><a class="nav-link" href="account.html">My Account</a></li>
      <li class="nav-item"><a class="nav-link" href="#" id="logoutNav">Logout</a></li>
    `;
    document.getElementById("logoutNav").addEventListener("click", function(e){
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      updateNavbar();
      window.location.href = "login.html";
    });
  } else {
    navLinks.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="find_parking.html">Find Parking</a></li>
      <li class="nav-item"><a class="nav-link" href="account.html">My Account</a></li>
      <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
      <li class="nav-item"><a class="nav-link" href="signup.html">Signup</a></li>
    `;
  }
}
document.addEventListener("DOMContentLoaded", updateNavbar);

// ----------- Signup -----------
const signupForm = document.getElementById("signupForm");
if(signupForm){
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if(users.find(u => u.email === email)){
      document.getElementById("signupError").innerText = "Email already exists!";
      document.getElementById("signupError").style.color = "red";
      return;
    }

    users.push({name,email,password});
    localStorage.setItem("users", JSON.stringify(users));

    const signupError = document.getElementById("signupError");
    signupError.style.color = "green";
    signupError.innerHTML = "Signup successful! <a href='login.html'>Click here to login</a>";

    signupForm.reset();
  });
}

// ----------- Login -----------
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if(users.length === 0){
      document.getElementById("loginError").innerText = "No accounts found! Please signup first.";
      return;
    }

    const user = users.find(u => u.email === email);

    if(!user){
      document.getElementById("loginError").innerText = "Email not registered! Please signup first.";
    } else if(user.password !== password){
      document.getElementById("loginError").innerText = "Incorrect password! Try again.";
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "find_parking.html";
    }
  });
}

// ----------- Logout Function -----------
function logout(){
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}