'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function AccountPage() {
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Generate streak data for the current month
  const generateMonthStreakData = (monthOffset = 0) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + monthOffset;
    
    // Get first day of month and total days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    
    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, day: null, submitted: false, isToday: false });
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = day === today.getDate() && month === today.getMonth();
      const isPast = date <= today;
      // Mock data: randomly mark some past days as submitted
      const submitted = isPast && Math.random() > 0.3;
      
      days.push({
        date: date,
        day: day,
        submitted: submitted,
        isToday: isToday,
        isPast: isPast
      });
    }
    
    return days;
  };

  // Mock user data - replace with real data from your backend
  const [userData] = useState({
    username: '@banayaus',
    profilePicture: '/api/placeholder/120/120', // Replace with actual profile picture
    joinedDate: 'January 2025',
    totalSubmissions: 8,
    currentStreak: 5,
    longestStreak: 12
  });

  const streakData = useMemo(() => generateMonthStreakData(currentMonthOffset), [currentMonthOffset]);
  
  const displayDate = useMemo(() => {
    const today = new Date();
    const displayMonth = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
    return displayMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [currentMonthOffset]);
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePreviousMonth = () => {
    setCurrentMonthOffset(prev => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthOffset(prev => prev + 1);
  };

  const submittedQuestions = useMemo(() => {
    return [
      {
        id: 1,
        question: "Who would you be if you lost all your memories?",
        date: "Oct 29, 2025",
        answer: "I think about this often. Memories shape us, but I believe there's something deeper—a core essence that transcends experience."
      },
      {
        id: 2,
        question: "Is the person you were ten years ago the same person you are today?",
        date: "Oct 28, 2025",
        answer: "Physically, I'm completely different. But my values remain. Change is constant, yet something persists."
      },
      {
        id: 3,
        question: "Is it better to be kind or to be honest when the two conflict?",
        date: "Oct 27, 2025",
        answer: "I try to find the balance. Honesty without kindness is cruelty, but kindness without honesty is cowardice."
      },
      {
        id: 4,
        question: "Can a good action done for selfish reasons still be considered moral?",
        date: "Oct 26, 2025",
        answer: "Intent matters, but so do consequences. If the outcome is positive, perhaps the motivation is secondary."
      },
      {
        id: 5,
        question: "If life has no inherent meaning, does that free you or terrify you?",
        date: "Oct 25, 2025",
        answer: "It frees me. If there's no predetermined meaning, I'm free to create my own purpose."
      },
    ];
  }, []);

  return (
    <div className="container">
      <Header />

      

      <main className="main-content account-page">

        <div className="account-divider"></div>
        {/* Profile Section */}
        <div className="account-profile-section">
          {/* Left Column: Profile Picture + Info */}
          <div className="account-profile-column">
            <div className="profile-info-row">
              <div className="profile-pic-placeholder">
                {userData.username.charAt(1).toUpperCase()}
              </div>
              <div className="profile-text-info">
                <div className="profile-username">{userData.username}</div>
                <div className="profile-joined-date">Joined {userData.joinedDate}</div>
              </div>
            </div>
            <div className="streak-stats-compact">
              <div className="streak-stat-compact">
                <span className="streak-number-compact">{userData.currentStreak}</span>
                <span className="streak-label-compact">Current Streak</span>
              </div>
              <div className="streak-stat-compact">
                <span className="streak-number-compact">{userData.longestStreak}</span>
                <span className="streak-label-compact">Longest Streak</span>
              </div>
            </div>
          </div>

          {/* Right Column: Streak Calendar */}
          <div className="account-streak-section">
            <div className="streak-header">
              <button 
                className="month-nav-btn" 
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                ←
              </button>
              <h2 className="streak-title">{displayDate}</h2>
              <button 
                className="month-nav-btn" 
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                →
              </button>
            </div>
            
            <div className="streak-calendar-container">
              <div className="streak-calendar-header">
                {weekDays.map((day) => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}
              </div>
              <div className="streak-calendar-grid">
                {streakData.map((day, idx) => (
                  <div 
                    key={idx} 
                    className={`calendar-day ${!day.date ? 'empty' : ''} ${day.submitted ? 'submitted' : ''} ${day.isToday ? 'today' : ''} ${!day.isPast ? 'future' : ''}`}
                  >
                    {day.day && <span className="calendar-day-number">{day.day}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submitted Questions */}
        <div className="account-submissions-section">
          <h2 className="submissions-title">Your Reflections ({userData.totalSubmissions})</h2>
          <div className="submissions-list">
            {submittedQuestions.map((item) => (
              <div key={item.id} className="submission-card">
                <div className="submission-header">
                  <span className="submission-date">{item.date}</span>
                </div>
                <h3 className="submission-question">{item.question}</h3>
                <p className="submission-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <Link href="/about" className="archive-link">About</Link>
        <Link href="/archive" className="archive-link">Archive</Link>
      </footer>
    </div>
  );
}