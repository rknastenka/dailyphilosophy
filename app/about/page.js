'use client';

import Link from 'next/link';
import Header from '../components/Header';


export default function AboutPage() {
  return (
    <div className="container" style={{ fontFamily: "Times New Roman, Georgia, serif"}}>
      <Header />

      <main className="main-content">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <h1 style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '2.2rem', marginBottom: '2rem', color: 'var(--primary-text)' }}>
            About
          </h1>
          
          <div style={{ textAlign: 'left', lineHeight: '1.8', color: 'var(--primary-text)' }}>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Recent research has shown how AI affects the human brain and lessen its bare minimum capabilities. Daily Philosophy is a minimal platform built to encourage people to use their own minds and express their thoughts, with no AI-assistance allowed.
            </p>
            <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>
              Each day at midnight, we present one carefully curated philosophical question. You have 24 hours to reflect and share your thoughts. You must write your own perspective before you can read what others have shared. This simple requirement creates a barrier against passive consumption and demands genuine engagement.
            </p>


          </div>

          <div style={{ fontFamily: "Times New Roman, Georgia, serif", textAlign: 'left', marginTop: '3rem', fontWeight: 'semi-bold', fontSize: '1.05rem', color: 'var(--primary-text)' }}>
            Login and create a username{' '}
            <Link 
              href="/login" 
              style={{ color: 'var(--accent)', textDecoration: 'underline', transition: 'var(--transition)' }}
              onMouseEnter={(e) => e.target.style.color = '#7a8c74'}
              onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
            >
              here
            </Link>
            {' '}to start reflecting and join our community.
          </div>

          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <a 
              href="https://github.com/rknastenka" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--secondary-text)', textDecoration: 'none', fontSize: '0.76rem', transition: 'var(--transition)' }}
              onMouseLeave={(e) => e.target.style.color = 'var(--secondary-text)'}
            >
              @rknastenka
            </a>
          </div>
        </div>
      </main>

    </div>
  );
}
