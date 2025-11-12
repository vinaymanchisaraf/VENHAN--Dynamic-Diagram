import React from 'react';
import useDiagramStore from '../../stores/useDiagramStore';
import sampleData from '../../data/sampleData.json';

const Sidebar = () => {
  const {
    nodes,
    edges,
    openModal,
    loadData,
    exportData,
    removeNode,
    removeEdge
  } = useDiagramStore();

  const handleLoadSample = () => {
    loadData(sampleData);
  };

  const handleExport = () => {
    const data = exportData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'diagram-data.json';
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          loadData(data);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{
      width: '300px',
      height: '100vh',
      background: '#f8f9fa',
      padding: '20px',
      borderRight: '1px solid #ddd',
      overflowY: 'auto'
    }}>
      <h3>Diagram Controls</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => openModal('node')}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add New Node
        </button>
        
        <button
          onClick={handleLoadSample}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Load Sample Data
        </button>

        <button
          onClick={handleExport}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            background: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Export Data
        </button>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ width: '100%' }}
          />
          <small>Import JSON file</small>
        </div>
      </div>

      <div>
        <h4>Nodes ({nodes.length})</h4>
        {nodes.map(node => (
          <div key={node.id} style={{
            padding: '10px',
            margin: '5px 0',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{node.data.label}</span>
            <button
              onClick={() => removeNode(node.id)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Edges ({edges.length})</h4>
        {edges.map(edge => (
          <div key={edge.id} style={{
            padding: '10px',
            margin: '5px 0',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{edge.source} → {edge.target}</span>
            <button
              onClick={() => removeEdge(edge.id)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;