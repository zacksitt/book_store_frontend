import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Customer from "./pages/Customer"
import Book from "./pages/Book";
import Sale from "./pages/Sale"
import Feedback from "./pages/Feedback";
export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if the user is already authenticated based on the presence of a token in localStorage
    const token = localStorage.getItem('token');
    console.log("token",token);

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {
        loggedIn ? 
        <BrowserRouter>
          <Routes>
              <Route path="customers" element={<Customer />} />
              <Route path="books" element={<Book />} />
              <Route path="sales" element={<Sale />} />
              <Route path="feedbacks" element={<Feedback />} />
              <Route path="/" element={<Book />}>
            </Route>
          </Routes>
      </BrowserRouter> : (
        <Login></Login>
      )
      }
        
    </div>
    
  
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

