import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer, toast  } from 'react-toastify';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <AuthProvider>
    <Navbar />
    <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable/>
    <Component {...pageProps} />
  </AuthProvider>;
}
