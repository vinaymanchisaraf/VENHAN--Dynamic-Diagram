import { create } from 'zustand';

const useDiagramStore = create((set, get) => ({
  // Initial state
  nodes: [],
  edges: [],
  selectedNode: null,
  selectedEdge: null,
  isModalOpen: false,
  modalType: null, // 'node' or 'edge'
  
  // Actions
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    )
  })),
  
  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    edges: state.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    )
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),
  
  updateEdge: (edgeId, updates) => set((state) => ({
    edges: state.edges.map(edge =>
      edge.id === edgeId ? { ...edge, ...updates } : edge
    )
  })),
  
  removeEdge: (edgeId) => set((state) => ({
    edges: state.edges.filter(edge => edge.id !== edgeId)
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  setSelectedEdge: (edge) => set({ selectedEdge: edge }),
  
  openModal: (modalType, selectedItem = null) => set({ 
    isModalOpen: true, 
    modalType,
    selectedNode: modalType === 'node' ? selectedItem : null,
    selectedEdge: modalType === 'edge' ? selectedItem : null
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    modalType: null,
    selectedNode: null,
    selectedEdge: null 
  }),
  
  // Load data from JSON
  loadData: (data) => set({
    nodes: data.nodes || [],
    edges: data.edges || []
  }),
  
  // Export current state as JSON
  exportData: () => {
    const state = get();
    return {
      nodes: state.nodes,
      edges: state.edges
    };
  }
}));

export default useDiagramStore;