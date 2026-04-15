import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post("https://it-helpdesk-ticket-backend.onrender.com/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    // Decode role from token (quick way)
    const payload = JSON.parse(atob(res.data.token.split(".")[1]));
    localStorage.setItem("role", payload.role);

    if (payload.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert("Login failed");
  }



//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("https://it-helpdesk-ticket-backend.onrender.com/api/auth/login", {
//         email,
//         password
//       });

//       localStorage.setItem("token", res.data.token);
//       alert("Login successful");

//     } catch (err) {
//       alert("Login failed");
//     }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>
            Don't have an account? <Link to="/signup">Signup</Link>
        </p>
    </div>
  );
}

export default Login;