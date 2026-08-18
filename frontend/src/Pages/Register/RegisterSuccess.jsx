import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase.jsx';
import '../Home/homepage.css';
import './register.css';

export default function RegisterSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchRegistration = async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .maybeSingle();
      
      if (!error && data) {
        setRegistration(data);
      }
      setLoading(false);
    };

    fetchRegistration();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="main-page rh-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="rh-loading">
          <span className="rh-spinner" aria-hidden="true" />
          <span>Confirming your payment...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-page rh-page">
      <section className="rh-result rh-result--success" style={{ marginTop: '50px' }}>
        <div className="rh-result__card">
          <div className="rh-result__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
              <path d="M4 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="rh-result__title">Registration <em>Successful!</em></h2>
          <p className="rh-result__sub">Welcome to Signature Global Conferences. Your payment has been securely processed.</p>
          
          {registration && (
            <div className="rh-email-notice" aria-label="Email confirmation">
              <span aria-hidden="true">📧</span>
              <div>
                <strong>Confirmation Email Sent</strong><br />
                A confirmation has been sent to <strong>{registration.email}</strong>. Check your inbox and spam folder.
              </div>
            </div>
          )}

          <div className="rh-result__actions" style={{ marginTop: '30px' }}>
            <button className="rh-btn-primary" onClick={() => navigate('/register')}>Register Another</button>
            <button className="rh-btn-ghost" onClick={() => navigate('/')}>Return Home</button>
          </div>
        </div>
      </section>
    </div>
  );
}
