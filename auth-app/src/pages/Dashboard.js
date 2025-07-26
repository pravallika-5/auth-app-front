import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
     const res = await axios.get(`${process.env.REACT_APP_API_URL}
/api/profile`, {
        headers: { Authorization: token },
      });
      setUser(res.data);
    } catch (err) {
      alert("Session expired or unauthorized");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      {user ? (
        <div style={styles.card}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    textAlign: "center"
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px"
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default Dashboard;
