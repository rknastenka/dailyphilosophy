'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './DailyQuestionApp.css';

export default function DailyQuestionApp() {
  const [appState, setAppState] = useState({
    hasAnsweredToday: false,
    userAnswer: null,
    currentDate: new Date().toDateString(),
    currentQuestionId: null
  });

  const [answerText, setAnswerText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Questions data
  const questions = [
    { id: 1, category: "Existence and Identity", question: "Who would you be if you lost all your memories?" },
    { id: 2, category: "Existence and Identity", question: "Is the person you were ten years ago the same person you are today?" },
    { id: 3, category: "Morality and Ethics", question: "Is it better to be kind or to be honest when the two conflict?" },
    { id: 4, category: "Morality and Ethics", question: "Can a good action done for selfish reasons still be considered moral?" },
    { id: 5, category: "Meaning and Purpose", question: "If life has no inherent meaning, does that free you or terrify you?" },
    { id: 6, category: "Meaning and Purpose", question: "What would you do differently if you knew today was your last day?" },
    { id: 7, category: "Knowledge and Truth", question: "Is it better to live in a comforting lie or a harsh truth?" },
    { id: 8, category: "Love and Connection", question: "Can you truly love someone without wanting to change them?" },
    { id: 9, category: "Freedom and Control", question: "Would you give up freedom for guaranteed safety and comfort?" },
    { id: 10, category: "Society and Individuality", question: "Should you prioritize your own happiness or your responsibility to others?" }
  ];

  // Sample responses
  const sampleResponses = [
    { author: "Reflection #1", text: "I think about this often. Memories shape us, but I believe there's something deeper—a core essence that transcends experience. Even without memories, the patterns of how we think and feel might remain. Or maybe we'd become entirely new, shaped only by present moments. Both possibilities are equally beautiful and terrifying.", hoursAgo: 8 },
    { author: "Anonymous Thinker 7", text: "Without memories, you'd be a blank slate. All our fears, joys, preferences—they come from what we've experienced. You wouldn't be 'you' anymore. You'd be potential waiting to be filled.", hoursAgo: 5 },
    { author: "Reflection #14", text: "This reminds me of my grandmother who had Alzheimer's. She forgot names, faces, entire decades. But her kindness remained. Her humor remained. Maybe we're not just our memories—maybe we're the emotional patterns that run deeper than recall.", hoursAgo: 6 },
    { author: "Anonymous Thinker 22", text: "I'd be nobody. Identity IS memory. Take away the story of where you've been and you have no compass for where you're going. We're all just the sum of our experiences, continuously rewriting our own narrative.", hoursAgo: 3 },
    { author: "Reflection #31", text: "Perhaps the question isn't who you'd BE, but who you'd BECOME. Without the weight of past mistakes or achievements, you might finally be free to discover who you were meant to be all along.", hoursAgo: 7 },
    { author: "Anonymous Thinker 45", text: "My values would remain, I think. The way I treat people, what makes me laugh, what moves me to tears. Memories are just data. Character is deeper.", hoursAgo: 2 },
    { author: "Reflection #52", text: "I don't know, and that uncertainty is what makes this question so powerful. It forces us to ask: what makes us US? Is it continuity of experience, or something more fundamental? I'm not sure there's a right answer.", hoursAgo: 4 },
    { author: "Anonymous Thinker 68", text: "We forget most of our childhood, yet we're still shaped by it. We lose memories as we age, but we remain ourselves. So maybe losing ALL memories would be different only in degree, not in kind. We'd still be human. We'd still be someone.", hoursAgo: 1 }
  ];

  // Utility functions
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatShortDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const getTodaysQuestion = () => {
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const questionIndex = dayOfYear % questions.length;
    return questions[questionIndex];
  };

  const formatTimeAgo = (hoursAgo) => {
    if (hoursAgo === 1) return '1 hour ago';
    if (hoursAgo < 1) return 'Just now';
    return `${hoursAgo} hours ago`;
  };

  const todaysQuestion = getTodaysQuestion();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (appState.hasAnsweredToday) {
      showError("You've already shared your reflection today. Come back tomorrow for a new question.");
      return;
    }
    
    const answer = answerText.trim();
    
    if (!answer) {
      showError('Please share your reflection before submitting.');
      return;
    }
    
    if (answer.length < 10) {
      showError('Please share a more thoughtful reflection (at least 10 characters).');
      return;
    }
    
    setAppState({
      ...appState,
      userAnswer: answer,
      hasAnsweredToday: true
    });
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  return (
    <div className="container">
      <header className="header">
        <Link href="/" className="logo">DAILY PHILOSOPHY</Link>
      </header>

      <main className="main-content">
        <>
            <div className="date">Question #{todaysQuestion.id} • {formatShortDate(new Date())}</div>

            <section className="question-section">

              <h1 className="question">{todaysQuestion.question}</h1>
            </section>

            {!appState.hasAnsweredToday ? (
              <section className="answer-section">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <textarea 
                      className="textarea" 
                      placeholder="Write your perspective..."
                      maxLength="1000"
                      required
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    />

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                  </div>
                  <button type="submit" className="submit-btn">
                    Share Your Reflection
                  </button>
                </form>
              </section>
            ) : (
              <>
                <section className="thank-you">
                  <h2>Thank you for your reflection</h2>
                  <p>Your thoughts have been shared. Now see how others have reflected on this question.</p>
                </section>

                <section className="responses-section">
                  <div className="responses-header">
                    <h2 className="responses-title">Shared Reflections</h2>
                    <p className="responses-subtitle">See how others have contemplated today&apos;s question</p>
                  </div>
                  <div className="responses-grid">
                    {appState.userAnswer && (
                      <div className="response-card">
                        <div className="response-author">Your Reflection</div>
                        <div className="response-text">{appState.userAnswer}</div>
                        <div className="response-time">Just submitted</div>
                      </div>
                    )}
                    {sampleResponses.map((response, idx) => (
                      <div key={idx} className="response-card">
                        <div className="response-author">{response.author}</div>
                        <div className="response-text">{response.text}</div>
                        <div className="response-time">{formatTimeAgo(response.hoursAgo)}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
        </>
      </main>

      <footer className="footer">
        <Link href="/archive" className="archive-link">View Archive</Link>
      </footer>
    </div>
  );
}
