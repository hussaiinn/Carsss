import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = ({setamdin, setuser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validUsers = [
    { username: 'Quadiro', password: 'pass123' },
    { username: 'Hussain', password: 'pass321' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Username:", username);
    console.log("Password:", password);

    const userAccess = validUsers.find(user => user.username === username && user.password === password);

    if(username == "admin" && password == "123123123"){
        // alert("Admin Login Success");
        navigate('/dash/admin');
        setamdin();
    } else if(userAccess){
        // alert("User Login Success");
        navigate('/dash/user');
        setuser();
    }
     else{
        alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
        <h2 className="text-4xl font-bold mb-4 text-center pb-12" style={{color: "#360d8a"}}>Assignment for 
        Quadiro Technologies</h2>
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md pt-12" style={{height: "30rem", width:"50rem"}}>
        <h2 className="text-4xl font-bold mb-4 text-center pb-12" style={{color: "#360d8a"}}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pt-5 pb-5 mb-3 text-black"
              style={{background: "#eaebeb"}}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 pt-5 pb-5 mb-5 text-black"
              style={{background: "#eaebeb"}}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-bold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{background: "#3e059b"}}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
