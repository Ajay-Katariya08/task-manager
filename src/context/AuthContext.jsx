import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ⬅️ New
    const navigate = useNavigate();
  

    const login = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = userCredential.user;
        setUser({ email: userData.email, uid: userData.uid });
        navigate("/tasks");
        toast.success("Login successful!");
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("No account found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format.");
            break;
          case "auth/invalid-credential":
            toast.error("Invalid Credential.");
            break;
          case "auth/too-many-requests":
            toast.error("Too many Requested.");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Check your connection.");
            break;
          default:
            toast.error("Login failed: " + error.message);
        }
      }
    };
    
  
    const register = async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created:", userCredential.user);
        } catch (error) {
            switch (error.code) {
                case  "auth/email-already-in-use" :
                  toast.error("This email is already registered. Try logging in instead.");
                  break;
                case "auth/weak-password":
                  toast.error("Password should be at least 6 characters.");
                  break;
                case "auth/invalid-email":
                  toast.error("Please enter a valid email address.");
                  break;
                default:
                   toast.error("Registration failed: " + error.message);
                }
            }
      };
      
  
    const logout = async () => {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({ email: currentUser.email, uid: currentUser.uid });
        } else {
          setUser(null);
        }
        setLoading(false); // ⬅️ Done loading after auth state checked
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, login, logout, register, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
