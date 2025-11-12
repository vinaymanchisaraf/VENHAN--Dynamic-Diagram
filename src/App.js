import React from 'react';
import DiagramFlow from './components/DiagramFlow/DiagramFlow';
import Sidebar from './components/Sidebar/Sidebar';
import NodeModal from './components/Modal/NodeModal';
import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <DiagramFlow />
      </div>
      <NodeModal />
    </div>
  );
}

export default App;