import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const slider = document.getElementById("slider");
const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeText = document.getElementById("welcomeText");

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// 🎨 Enhanced UI animations
const animateSlide = (targetPosition) => {
  slider.style.transition = '0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
  slider.style.transform = `translateX(${targetPosition}%)`;
};

// 🔄 Navigation Functions
window.goSignup = () => {
  animateSlide(0);
  updateWelcome("Welcome ", "Create your account");
};

window.goEmailVerification = () => {
  animateSlide(-33.33);
  updateWelcome("Check Email", "Verify your account");
};

window.goLogin = () => {
  animateSlide(-66.66);
  updateWelcome("Welcome Back ", "Login to your account");
};

// 📝 Form Validation Helper
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pass) => pass.length >= 6;
const validateName = (name) => name.trim().length >= 2;

// 🎉 UI Update Helper
const updateWelcome = (title, text) => {
  welcomeTitle.innerText = title;
  welcomeText.innerText = text;
};

// 🚀 Enhanced SIGNUP with validation & loading
window.signup = async () => {
  const name = suName.value.trim();
  const email = suEmail.value.trim();
  const password = suPass.value;

  if (!validateName(name)) return alert("Name must be at least 2 characters");
  if (!validateEmail(email)) return alert("Please enter valid email");
  if (!validatePassword(password)) return alert("Password must be 6+ characters");

  try {
    const btn = event.target;
    btn.innerText = "Creating...";
    btn.disabled = true;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await sendEmailVerification(userCredential.user);

    updateWelcome(`Hi, ${name} 👋`, "Verify your email");
    goEmailVerification();

    suName.value = suEmail.value = suPass.value = '';
    
  } catch (error) {
    console.error("Signup error:", error);
    alert(error.message.includes('already') ? "Email already registered" : "Signup failed. Try again.");
  } finally {
    const btn = event.target;
    btn.innerText = "Sign Up";
    btn.disabled = false;
  }
};

// ✅ Enhanced Email Verification
window.checkVerification = async () => {
  try {
    const btn = event.target;
    btn.innerText = "Checking...";
    btn.disabled = true;

    await auth.currentUser.reload();
    
    if (auth.currentUser.emailVerified) {
      updateWelcome(`Welcome, ${auth.currentUser.displayName} 🎉`, "Account verified!");
      setTimeout(() => goLogin(), 1500);
    } else {
      alert("Email not verified yet. Please check your inbox.");
    }
  } catch (error) {
    alert("Verification check failed");
  } finally {
    const btn = event.target;
    btn.innerText = "I Verified";
    btn.disabled = false;
  }
};

// 🔄 Resend Verification
window.resendVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    alert("Verification email resent! Check your inbox.");
  } catch (error) {
    alert("Failed to resend email");
  }
};

// 🔐 Enhanced LOGIN with validation
window.login = async () => {
  const email = liEmail.value.trim();
  const password = liPass.value;

  if (!validateEmail(email)) return alert("Please enter valid email");
  if (!validatePassword(password)) return alert("Password too short");

  try {
    const btn = event.target;
    btn.innerText = "Logging in...";
    btn.disabled = true;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.emailVerified) {
      alert("Please verify your email first!");
      return;
    }

    updateWelcome(`Welcome back, ${userCredential.user.displayName || "User"} 👋`, "Login successful!");
    alert("🎉 Login successful!");

  } catch (error) {
    console.error("Login error:", error);
    const errorMsg = error.message;
    if (errorMsg.includes('wrong-password')) alert("Incorrect password");
    else if (errorMsg.includes('user-not-found')) alert("No account found with this email");
    else alert("Login failed. Try again.");
  } finally {
    const btn = event.target;
    btn.innerText = "Login";
    btn.disabled = false;
  }
};

// 🔒 Forgot Password with validation
window.forgotPassword = async (inputId) => {
  const email = document.getElementById(inputId).value.trim();
  if (!validateEmail(email)) return alert("Please enter valid email");

  try {
    await sendPasswordResetEmail(auth, email);
    alert("✅ Password reset email sent! Check your inbox.");
  } catch (error) {
    alert("Failed to send reset email");
  }
};

// 🌐 Enhanced Social Login
window.googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    updateWelcome(`Hi, ${result.user.displayName} 👋`, "Welcome!");
    alert("🎉 Google login successful!");
  } catch (error) {
    console.error("Google login error:", error);
    alert("Google login failed");
  }
};

window.facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    updateWelcome(`Hi, ${result.user.displayName} 👋`, "Welcome!");
    alert("🎉 Facebook login successful!");
  } catch (error) {
    console.error("Facebook login error:", error);
    alert("Facebook login failed");
  }
};

// 👁️ Password Toggle
window.togglePass = (id) => {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};

// 👋 Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    updateWelcome(`Hi, ${user.displayName || user.email} 👋`, "You're logged in!");
  } else {
    goLogin();
  }
});

// 🧹 Logout functionality
window.logout = async () => {
  await signOut(auth);
  updateWelcome("Welcome 🌿", "Secure Authentication System");
  alert("Logged out successfully 👋");
};

// 🎯 Form Input Enhancements
document.addEventListener('DOMContentLoaded', () => {
  suName.focus();
  
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const activePanel = Math.abs(parseInt(slider.style.transform || '0')) / slider.offsetWidth * 100;
      if (activePanel === 0) signup();
      if (activePanel === 66.66) login();
    }
  });
});
