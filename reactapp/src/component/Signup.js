import React, { useState } from 'react';
import { signup, verifyOtp, sendSignupSuccessEmail } from '../utils/api';
import './signup.css';

function SignupForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('signup'); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await signup(formData); 
      setStep('otp'); 
      setMessage('✅ OTP sent to your email. Please verify.');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await verifyOtp(formData.email, otp);

      await sendSignupSuccessEmail(formData.email, formData.username);

      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      savedUsers.push({ id: Date.now(), ...formData });
      localStorage.setItem('users', JSON.stringify(savedUsers));

      setStep('done');
      setMessage('🎉 Signup successful! Your email is verified.');
    } catch (err) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setMessage('');
    try {
      await signup(formData); 
      setMessage('🔄 OTP resent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {step === 'signup' && (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
            </form>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2>Verify OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button>
            </form>
            <p style={{ marginTop: '10px' }}>
              Didn’t get OTP?{' '}
              <button type="button" onClick={handleResendOtp} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                Resend
              </button>
            </p>
          </>
        )}

        {step === 'done' && (
          <div style={{ textAlign: 'center' }}>
            <h2>✅ Signup Complete</h2>
            <p>Your account has been verified successfully.</p>
            <h3 style={{ marginTop: '10px', color: 'green' }}>🎉 Signup successful! Your email is verified.</h3>
          </div>
        )}

        {step !== 'done' && message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default SignupForm;
