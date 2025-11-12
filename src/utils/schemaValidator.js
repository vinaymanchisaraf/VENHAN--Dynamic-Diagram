export const validateNodeSchema = (node) => {
  const required = ['id', 'type', 'position', 'data'];
  const hasAllRequired = required.every(field => field in node);
  
  if (!hasAllRequired) {
    throw new Error(`Node missing required fields: ${required.join(', ')}`);
  }
  
  if (typeof node.data !== 'object' || !('label' in node.data)) {
    throw new Error('Node data must contain a label');
  }
  
  return true;
};

export const validateEdgeSchema = (edge) => {
  const required = ['id', 'source', 'target'];
  const hasAllRequired = required.every(field => field in edge);
  
  if (!hasAllRequired) {
    throw new Error(`Edge missing required fields: ${required.join(', ')}`);
  }
  
  return true;
};

export const validateDiagramData = (data) => {
  if (!data.nodes || !Array.isArray(data.nodes)) {
    throw new Error('Data must contain a nodes array');
  }
  
  if (!data.edges || !Array.isArray(data.edges)) {
    throw new Error('Data must contain an edges array');
  }
  
  data.nodes.forEach(validateNodeSchema);
  data.edges.forEach(validateEdgeSchema);
  
  return true;
};