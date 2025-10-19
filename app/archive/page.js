'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../components/MainPage.css';

export default function ArchivePage() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Archived questions data
  const archivedQuestions = [
    { date: "October 17, 2025", id: 2, category: "Existence and Identity", question: "Is the person you were ten years ago the same person you are today?", response_count: 18 },
    { date: "October 16, 2025", id: 3, category: "Morality and Ethics", question: "Is it better to be kind or to be honest when the two conflict?", response_count: 23 },
    { date: "October 15, 2025", id: 4, category: "Morality and Ethics", question: "Can a good action done for selfish reasons still be considered moral?", response_count: 15 },
    { date: "October 14, 2025", id: 8, category: "Morality and Ethics", question: "Would you sacrifice one innocent person to save a hundred?", response_count: 31 },
    { date: "October 13, 2025", id: 11, category: "Meaning and Purpose", question: "If life has no inherent meaning, does that free you or terrify you?", response_count: 12 },
    { date: "October 12, 2025", id: 12, category: "Meaning and Purpose", question: "What would you do differently if you knew today was your last day?", response_count: 27 },
    { date: "October 11, 2025", id: 13, category: "Meaning and Purpose", question: "Is pursuing happiness a worthy life goal, or should we aim for something else?", response_count: 19 },
    { date: "October 10, 2025", id: 14, category: "Meaning and Purpose", question: "Do we create our own purpose, or do we discover it?", response_count: 14 },
    { date: "October 9, 2025", id: 21, category: "Knowledge and Truth", question: "Can you ever really know anything for certain?", response_count: 21 },
    { date: "October 8, 2025", id: 22, category: "Knowledge and Truth", question: "Is it better to live in a comforting lie or a harsh truth?", response_count: 29 }
  ];

  const archivedResponses = {
    2: [
      { author: "Reflection #3", text: "Physically, no. Mentally, barely. But the thread of consciousness connecting us feels real. I'm both that person and someone entirely new.", hoursAgo: 18 },
      { author: "Anonymous Thinker 12", text: "We're like rivers. Same name, same path, but the water is always different. You're not the same person, but you're the continuation of who you were.", hoursAgo: 15 },
      { author: "Reflection #27", text: "I've changed my beliefs, my values, my entire worldview. The only thing connecting me to my past self is memory. Are we the same? I don't think so.", hoursAgo: 20 },
      { author: "Anonymous Thinker 8", text: "Every cell in my body has been replaced since then, but something essential remains. Maybe it's not about being the same—it's about being continuous.", hoursAgo: 12 },
      { author: "Reflection #45", text: "I look at old photos and feel like I'm looking at a stranger who happened to share my name. Growth isn't just change—it's transformation.", hoursAgo: 9 }
    ]
  };

  const formatArchiveDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTimeAgo = (hoursAgo) => {
    if (hoursAgo === 1) return '1 hour ago';
    if (hoursAgo < 1) return 'Just now';
    return `${hoursAgo} hours ago`;
  };

  const showQuestionDetail = (question) => {
    setSelectedQuestion(question);
  };

  const showArchive = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="container">
      <header className="header">
        <Link href="/" className="logo">DAILY PHILOSOPHY</Link>
      </header>

      <main className="main-content">
        {!selectedQuestion ? (
          <section className="archive-section">
            <div className="archive-header">
              <h2 className="archive-title">Question Archive</h2>
            </div>
            <div className="archive-grid">
              {archivedQuestions.map((question) => (
                <div 
                  key={question.id} 
                  className="archive-card"
                  onClick={() => showQuestionDetail(question)}
                >
                  <div className="archive-card-question">{question.question}</div>
                  <div className="archive-card-meta">
                    <span className="archive-card-number">#{question.id}</span>
                    <span className="archive-card-date-meta">{formatArchiveDate(question.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="question-detail-section">
            <a className="back-button" onClick={(e) => { e.preventDefault(); showArchive(); }}>Back to Archive</a>
            <div className="question-detail-header">
              <h1 className="question-detail-text">{selectedQuestion.question}</h1>
              <div className="question-detail-date">Question #{selectedQuestion.id} • {formatArchiveDate(selectedQuestion.date)}</div>
            </div>
            <div className="responses-section">
              <div className="responses-grid">
                {(archivedResponses[selectedQuestion.id] || []).map((response, idx) => (
                  <div key={idx} className="response-card">
                    <div className="response-author">{response.author}</div>
                    <div className="response-text">{response.text}</div>
                    <div className="response-time">{formatTimeAgo(response.hoursAgo)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
