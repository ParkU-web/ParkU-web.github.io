import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
  import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBEsgpRXsQNfiywaqxfvchaFhQfhQsf0xs",
    authDomain: "parku-2752f.firebaseapp.com",
    projectId: "parku-2752f",
    storageBucket: "parku-2752f.firebasestorage.app",
    messagingSenderId: "419232977107",
    appId: "1:419232977107:web:4511a435b169c916394426"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  window.loginUser = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (error) {
      window.location.href = "contact.html";
    }
  };

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    const rightHeader = document.querySelector(".header .right");
    if (!rightHeader) return;

    rightHeader.innerHTML = ""; // Clear existing stuff

    if (user) {
      const userMenu = document.createElement("div");
      userMenu.className = "user-menu";

      const toggle = document.createElement("span");
      toggle.className = "user-toggle";
      toggle.textContent = user.email || "Logged in";

      const dropdown = document.createElement("div");
      dropdown.className = "user-dropdown";

      const logout = document.createElement("a");
      logout.href = "#";
      logout.textContent = "Logout";
      logout.id = "logout-btn";

      logout.onclick = (e) => {
        e.preventDefault();
        signOut(auth).then(() => location.reload());
      };

      dropdown.appendChild(logout);
      userMenu.appendChild(toggle);
      userMenu.appendChild(dropdown);
      const aboutLink = document.createElement("a");
      aboutLink.href = "about.html";
      aboutLink.textContent = "About";
      rightHeader.appendChild(aboutLink);
      const contactLink = document.createElement("a");
      contactLink.href = "contact.html";
      contactLink.textContent = "Contact";
      rightHeader.appendChild(contactLink);
      rightHeader.appendChild(userMenu);

      // Toggle dropdown on click
      toggle.addEventListener("click", () => {
        userMenu.classList.toggle("show");
      });

      // Hide dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!userMenu.contains(e.target)) {
          userMenu.classList.remove("show");
        }
      });
    } else {
      const aboutLink = document.createElement("a");
      aboutLink.href = "about.html";
      aboutLink.textContent = "About";
      rightHeader.appendChild(aboutLink);
      const contactLink = document.createElement("a");
      contactLink.href = "contact.html";
      contactLink.textContent = "Contact";
      rightHeader.appendChild(contactLink);
      const loginLink = document.createElement("a");
      loginLink.href = "login.html";
      loginLink.textContent = "Login";
      rightHeader.appendChild(loginLink);
    }
  });
});