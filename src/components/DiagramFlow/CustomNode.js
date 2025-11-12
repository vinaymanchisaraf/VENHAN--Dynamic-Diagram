import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, selected }) => {
  const nodeStyle = {
    background: data.color || '#fff',
    border: `2px solid ${selected ? '#ff6b6b' : '#ddd'}`,
    borderRadius: '10px',
    padding: '10px',
    minWidth: '150px',
    boxShadow: selected ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label}</strong>
        {data.description && (
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            {data.description}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;