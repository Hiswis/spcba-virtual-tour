import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBpk6Co0zDIEsZwKYru4BYjukbxgR6yFDw",
  authDomain: "school-tour-3cf8f.firebaseapp.com",
  projectId: "school-tour-3cf8f",
  storageBucket: "school-tour-3cf8f.appspot.com",
  messagingSenderId: "675420455699",
  appId: "1:675420455699:web:5b180391d6702ce985d0e6",
  measurementId: "G-L3TNZY8D4E"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Register new user
window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: "user",
      verified: false,
      createdAt: new Date()
    });

    status.innerText = "✅ Registered! Check your email.";
  } catch (error) {
    status.innerText = "❌ Error: " + error.message;
  }
};

// ✅ Login
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      status.innerText = "⚠️ Please verify your email first.";
      await signOut(auth);
      return;
    }
    status.innerText = "✅ Login successful!";
    window.location.href = "tour.html";
  } catch (error) {
    status.innerText = "❌ Error: " + error.message;
  }
};

// ✅ Guest login
window.guestLogin = function () {
  localStorage.setItem("guest", "true");
  window.location.href = "tour.html";
};
