import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RewardPoints.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
// import rewardImage from "/image/rewardImage.png"

function RewardPoints({ username }) {
  const [points, setPoints] = useState(6);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/rewards/${username}`)
      .then(response => setPoints(response.data.rewardPoints))
      .catch(error => console.error('Error fetching points:', error));
  }, [username]);

  return (<>
    <Header />
    <div className="reward-points-container d-flex align-items-center justify-content-center">
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "#ffffff" }}>
        <div className="reward-points-card shadow-lg">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Reward Points</h4>
            {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fshopping-rewards&psig=AOvVaw1ULURIPsMN_dPefiNHS5bJ&ust=1724408066932000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC-reOuiIgDFQAAAAAdAAAAABAE" alt="Reward Icon" className="reward-icon" /> */}
          </div>
          <div className="card-body text-center">
            <p className="points-display">{points}</p>
            <p className="points-text">Available Points</p>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={()=>navigate("/catalog")}>Check Rewards</button>
          </div>
        </div>
        <img src="/image/rewardImage.png" style={{ height: "200px", width: "280px" }} alt="Reward Icon" className="reward-icon" />
      </div>
    </div>
  </>
  );
}

export default RewardPoints;
