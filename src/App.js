// src/App.js

import React from 'react';
import ResumeForm from './components/ResumeForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Builder</h1>
      </header>
      <main>
        <ResumeForm />
      </main>
    </div>
  );
}

export default App;
