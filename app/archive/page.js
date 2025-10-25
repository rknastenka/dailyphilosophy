'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';


export default function ArchivePage() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Archived questions data
  const archivedQuestions = [
    { date: "October 17, 2025", id: 2, question: "Is the person you were ten years ago the same person you are today?", response_count: 18 },
    { date: "October 16, 2025", id: 3, question: "Is it better to be kind or to be honest when the two conflict?", response_count: 23 },
    { date: "October 15, 2025", id: 4, question: "Can a good action done for selfish reasons still be considered moral?", response_count: 15 },
    { date: "October 14, 2025", id: 8, question: "Would you sacrifice one innocent person to save a hundred?", response_count: 31 },
    { date: "October 13, 2025", id: 11, question: "If life has no inherent meaning, does that free you or terrify you?", response_count: 12 },
    { date: "October 12, 2025", id: 12, question: "What would you do differently if you knew today was your last day?", response_count: 27 },
    { date: "October 11, 2025", id: 13, question: "Is pursuing happiness a worthy life goal, or should we aim for something else?", response_count: 19 },
    { date: "October 10, 2025", id: 14, question: "Do we create our own purpose, or do we discover it?", response_count: 14 },
    { date: "October 9, 2025", id: 21, question: "Can you ever really know anything for certain?", response_count: 21 },
    { date: "October 8, 2025", id: 22, question: "Is it better to live in a comforting lie or a harsh truth?", response_count: 29 }
  ];

  const archivedResponses = {
    2: [
      { author: "@deepthoughts", text: "Physically, no. Mentally, barely. But the thread of consciousness connecting us feels real. I'm both that person and someone entirely new.", votes: 12 },
      { author: "@riverofchange", text: "We're like rivers. Same name, same path, but the water is always different. You're not the same person, but you're the continuation of who you were.", votes: 8 },
      { author: "@evolvedmind", text: "I've changed my beliefs, my values, my entire worldview. The only thing connecting me to my past self is memory. Are we the same? I don't think so.", votes: 5 },
      { author: "@continuumseeker", text: "Every cell in my body has been replaced since then, but something essential remains. Maybe it's not about being the same—it's about being continuous.", votes: 15 },
      { author: "@transformedself", text: "I look at old photos and feel like I'm looking at a stranger who happened to share my name. Growth isn't just change—it's transformation.", votes: 3 }
    ]
  };

  const formatArchiveDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formatArchiveDateString = (dateString) => {
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
      <Header />

      <main className="main-content">
        {!selectedQuestion ? (
          <section className="archive-section">
            <div className="archive-header">
              <h2 className="archive-title">Archive</h2>
            </div>
            <div className="archive-list">
              {archivedQuestions.map((question) => {
                const dateObj = formatArchiveDate(question.date);
                return (
                  <div 
                    key={question.id} 
                    className="archive-item"
                    onClick={() => showQuestionDetail(question)}
                  >
                    <div className="archive-item-date">
                      <div className="archive-item-date-day">{dateObj.day}</div>
                      <div className="archive-item-date-month">{dateObj.month} {dateObj.year}</div>
                    </div>
                    <div className="archive-item-question">{question.question}</div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="question-detail-section">
            <a className="back-button" onClick={(e) => { e.preventDefault(); showArchive(); }}>Back to Archive</a>
            
            <div className="question-detail-container">
              <div className="question-detail-header">
                <div className="question-detail-meta">
                  <span className="question-detail-date">{formatArchiveDateString(selectedQuestion.date)}</span>
                </div>
                <h1 className="question-detail-text">{selectedQuestion.question}</h1>
                <div className="question-detail-stats">
                  {selectedQuestion.response_count} {selectedQuestion.response_count === 1 ? 'response' : 'responses'}
                </div>
              </div>

              <div className="responses-section">
                <div className="responses-grid">
                  {(archivedResponses[selectedQuestion.id] || []).length > 0 ? (
                    (archivedResponses[selectedQuestion.id] || []).map((response, idx) => (
                      <div key={idx} className="response-card">
                        <div className="response-header">
                          <div className="response-author">{response.author}</div>
                          <div className="response-actions">
                            <button className="vote-button vote-up" onClick={(e) => e.stopPropagation()}>
                              <span>↑</span>
                            </button>
                            <button className="vote-button vote-down" onClick={(e) => e.stopPropagation()}>
                              <span>↓</span>
                            </button>
                          </div>
                        </div>
                        <div className="response-text">{response.text}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-responses">
                      <p>No responses yet for this question.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

    </div>
  );
}
