'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only - no backend yet
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary-text)', textAlign: 'center' }}>
            Login
          </h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-text)', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="textarea"
                placeholder="your@email.com"
                style={{ minHeight: 'auto', padding: '0.75rem 1rem' }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-text)', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="textarea"
                placeholder="••••••••"
                style={{ minHeight: 'auto', padding: '0.75rem 1rem' }}
              />
            </div>

            <button type="submit" className="submit-btn" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>

          <p style={{fontFamily: "Times New Roman, Georgia, serif", textAlign: 'center', marginTop: '1.5rem', color: 'var(--secondary-text)', fontSize: '0.9rem' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>
        </div>
      </main>


    </div>
  );
}
