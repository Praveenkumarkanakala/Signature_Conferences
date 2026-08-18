import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/homepage.css';
import './register.css';

export default function RegisterCancel() {
  const navigate = useNavigate();

  return (
    <div className="main-page rh-page">
      <section className="rh-result rh-result--fail" style={{ marginTop: '50px' }}>
        <div className="rh-result__card">
          <div className="rh-result__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="rh-result__title">Payment <em>Cancelled</em></h2>
          <p className="rh-result__sub">Your payment was cancelled and no charges were made. You can try registering again whenever you are ready.</p>
          
          <div className="rh-result__actions" style={{ marginTop: '30px' }}>
            <button className="rh-btn-primary" onClick={() => navigate('/register')}>Try Again</button>
            <button className="rh-btn-ghost" onClick={() => navigate('/contact')}>Contact Support</button>
          </div>
        </div>
      </section>
    </div>
  );
}
