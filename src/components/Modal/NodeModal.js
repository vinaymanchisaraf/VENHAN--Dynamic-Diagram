import React, { useState, useEffect } from 'react';
import useDiagramStore from '../../stores/useDiagramStore';

const NodeModal = () => {
  const {
    isModalOpen,
    modalType,
    selectedNode,
    selectedEdge,
    addNode,
    updateNode,
    addEdge,
    updateEdge,
    closeModal
  } = useDiagramStore();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (modalType === 'node') {
      if (selectedNode) {
        // Edit existing node
        setFormData({
          id: selectedNode.id,
          label: selectedNode.data.label,
          description: selectedNode.data.description || '',
          color: selectedNode.data.color || '#ffffff',
          x: selectedNode.position.x,
          y: selectedNode.position.y
        });
      } else {
        // New node
        setFormData({
          id: `node-${Date.now()}`,
          label: '',
          description: '',
          color: '#ffffff',
          x: 100,
          y: 100
        });
      }
    } else if (modalType === 'edge') {
      if (selectedEdge) {
        // Edit existing edge
        setFormData({
          id: selectedEdge.id,
          source: selectedEdge.source,
          target: selectedEdge.target,
          label: selectedEdge.label || ''
        });
      } else {
        // New edge (you might want to handle this differently)
        setFormData({
          id: `edge-${Date.now()}`,
          source: '',
          target: '',
          label: ''
        });
      }
    }
  }, [modalType, selectedNode, selectedEdge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'node') {
      const node = {
        id: formData.id,
        type: 'default',
        position: { x: parseInt(formData.x), y: parseInt(formData.y) },
        data: {
          label: formData.label,
          description: formData.description,
          color: formData.color
        }
      };

      if (selectedNode) {
        updateNode(formData.id, node);
      } else {
        addNode(node);
      }
    } else if (modalType === 'edge') {
      const edge = {
        id: formData.id,
        source: formData.source,
        target: formData.target,
        label: formData.label,
        type: 'smoothstep'
      };

      if (selectedEdge) {
        updateEdge(formData.id, edge);
      } else {
        addEdge(edge);
      }
    }

    closeModal();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isModalOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        <h3>
          {selectedNode || selectedEdge ? 'Edit' : 'Add New'} 
          {modalType === 'node' ? ' Node' : ' Edge'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          {modalType === 'node' ? (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label>Label:</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label || ''}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', height: '60px' }}
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Color:</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color || '#ffffff'}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>X Position:</label>
                <input
                  type="number"
                  name="x"
                  value={formData.x || 0}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label>Y Position:</label>
                <input
                  type="number"
                  name="y"
                  value={formData.y || 0}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label>Source Node ID:</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source || ''}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <label>Target Node ID:</label>
                <input
                  type="text"
                  name="target"
                  value={formData.target || ''}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label>Edge Label:</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label || ''}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </>
          )}
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={closeModal}
              style={{
                padding: '10px 20px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {selectedNode || selectedEdge ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NodeModal;