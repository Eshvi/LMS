import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RewardsCatalog.css'; // Custom CSS file
import Header from './Header';
import Swal from 'sweetalert2';

const rewards = [
  { id: 1, name: '10% Off Coupon', points: 1, imageUrl: '/image/p1.png' },
  { id: 2, name: 'Free Shipping', points: 2, imageUrl: '/image/p2.png' },
  { id: 3, name: 'Free Product Sample', points: 3, imageUrl: '/image/p8.png' },
  { id: 4, name: 'Free Lipstick', points: 4, imageUrl: '/image/p3.png' },
  { id: 5, name: '12% off On Airpods', points: 5, imageUrl: '/image/p5.png' },
  { id: 6, name: 'BOGO On Tees', points: 6, imageUrl: '/image/p4.png' },
];

function RewardsCatalog() {
  const handleRedeem = (rewardName) => {
    Swal.fire({
      title: 'Reward Redeemed',
      text: `You have successfully redeemed the ${rewardName}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Rewards Catalog</h2>
        <div className="row">
          {rewards.map(reward => (
            <div className="col-lg-4 col-md-6 mb-4" key={reward.id}>
              <div className="card reward-card shadow-sm">
                <img src={reward.imageUrl} height="200px" width="200px" className="card-img-top" alt={reward.name} />
                <div className="card-body">
                  <h5 className="card-title">{reward.name}</h5>
                  <p className="card-text">Requires {reward.points} points</p>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleRedeem(reward.name)}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RewardsCatalog;
