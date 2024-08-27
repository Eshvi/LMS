import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedeemPoints.css'; // Custom CSS file
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function RedeemPoints({ username }) {
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const navigate = useNavigate();

  return (
    <>
    <Header/>
    <div className="redeem-points-container d-flex align-items-center justify-content-center">
      <div className="card redeem-points-card shadow-lg">
        <div className="card-body">
          <h4 className="card-title text-center">Redeem Your Rewards</h4>
          <div className="form-group mt-4">
            <label htmlFor="pointsToRedeem">Rewards to Redeem</label>
            <input 
              type="number" 
              className="form-control form-control-lg" 
              id="pointsToRedeem" 
              value={pointsToRedeem} 
              onChange={e => setPointsToRedeem(e.target.value)} 
              placeholder="Enter points" 
              />
          </div>
          <button className="btn btn-danger btn-block mt-4" onClick={()=>navigate("/catalog")}>Redeem Now</button>
        </div>
      </div>
    </div>
              </>
  );
}

export default RedeemPoints;
