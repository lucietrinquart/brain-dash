import React, { useState } from 'react';
import './App.css';

// Composant Widget réutilisable
const Widget = ({ title, icon, children, className = "" }) => (
  <div className={`widget ${className}`}>
    <div className="widget-header">
      {icon}
      <h3>{title}</h3>
    </div>
    <div className="widget-content">
      {children}
    </div>
  </div>
);

// Dashboard - Page d'accueil
const Dashboard = () => {
  const [mood, setMood] = useState(null);
  
  const moods = [
    { emoji: '😊', label: 'Excellent', color: 'mood-excellent' },
    { emoji: '🙂', label: 'Bien', color: 'mood-good' },
    { emoji: '😐', label: 'Neutre', color: 'mood-neutral' },
    { emoji: '😕', label: 'Fatigué', color: 'mood-tired' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Bonjour 👋</h1>
        <p className="subtitle">Comment va ton cerveau aujourd'hui ?</p>
      </div>

      <Widget title="Météo du cerveau" icon="🧠">
        <div className="mood-grid">
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => setMood(m.label)}
              className={`mood-btn ${m.color} ${mood === m.label ? 'active' : ''}`}
            >
              <div className="mood-emoji">{m.emoji}</div>
              <div className="mood-label">{m.label}</div>
            </button>
          ))}
        </div>
      </Widget>

      <Widget title="Défi du jour" icon="🎯">
        <div className="challenge-card">
          <p className="challenge-text">
            🧩 Trouve 5 objets rouges autour de toi en 60 secondes
          </p>
          <button className="btn btn-primary">Commencer le défi</button>
        </div>
      </Widget>

      <Widget title="Tes statistiques" icon="📊">
        <div className="stats-list">
          {[
            { label: 'Concentration', value: 75, color: 'stat-teal' },
            { label: 'Curiosité', value: 60, color: 'stat-emerald' },
            { label: 'Énergie', value: 85, color: 'stat-orange' },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${stat.color}`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget title="Mode Focus" icon="🎯">
        <div className="focus-mode">
          <div className="focus-info">
            <p className="focus-title">Session de concentration</p>
            <p className="focus-subtitle">25 min de travail profond</p>
          </div>
          <button className="btn btn-secondary">Démarrer</button>
        </div>
      </Widget>
    </div>
  );
};

// Page Statistiques
const Statistics = () => (
  <div className="page-content">
    <h1 className="page-title">Statistiques</h1>
    <Widget title="Vue d'ensemble" icon="📊">
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <p>Tes statistiques apparaîtront ici</p>
      </div>
    </Widget>
  </div>
);

// Page Journal
const Journal = () => (
  <div className="page-content">
    <h1 className="page-title">Journal mental</h1>
    <Widget title="Réflexion du jour" icon="📖">
      <textarea
        className="journal-textarea"
        rows="5"
        placeholder="Qu'as-tu appris aujourd'hui ?"
      />
      <button className="btn btn-primary">Enregistrer</button>
    </Widget>
  </div>
);

// Page Défis
const Challenges = () => (
  <div className="page-content">
    <h1 className="page-title">Défis cognitifs</h1>
    <Widget title="Exercices disponibles" icon="🧠">
      <div className="challenges-list">
        {[
          { title: 'Observation', desc: 'Trouve les différences', difficulty: 'Facile' },
          { title: 'Mémoire', desc: 'Séquence de nombres', difficulty: 'Moyen' },
          { title: 'Logique', desc: 'Casse-tête du jour', difficulty: 'Difficile' },
        ].map((challenge, i) => (
          <div key={i} className="challenge-item">
            <div className="challenge-info">
              <h4>{challenge.title}</h4>
              <p>{challenge.desc}</p>
            </div>
            <span className="difficulty-badge">{challenge.difficulty}</span>
          </div>
        ))}
      </div>
    </Widget>
  </div>
);

// Page Paramètres
const SettingsPage = () => (
  <div className="page-content">
    <h1 className="page-title">Paramètres</h1>
    <Widget title="Préférences" icon="⚙️">
      <div className="settings-list">
        <div className="setting-item">
          <span>Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <span>Mode sombre</span>
          <input type="checkbox" />
        </div>
      </div>
    </Widget>
  </div>
);

// Application principale
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pages = {
    home: <Dashboard />,
    stats: <Statistics />,
    journal: <Journal />,
    challenges: <Challenges />,
    settings: <SettingsPage />,
  };

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Accueil' },
    { id: 'stats', icon: '📊', label: 'Stats' },
    { id: 'journal', icon: '📖', label: 'Journal' },
    { id: 'challenges', icon: '🧠', label: 'Défis' },
    { id: 'settings', icon: '⚙️', label: 'Réglages' },
  ];

  return (
    <div className="app-container">
      <div className="main-content">
        {pages[currentPage]}
      </div>

      <nav className="bottom-nav">
        <div className="nav-container">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}