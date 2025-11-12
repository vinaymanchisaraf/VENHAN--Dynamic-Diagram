import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useDiagramStore from '../../stores/useDiagramStore';
import CustomNode from './CustomNode';

const nodeTypes = {
  default: CustomNode,
};

const DiagramFlow = () => {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    setEdges,
    addEdge: addStoreEdge,
    setSelectedNode,
    setSelectedEdge,
    openModal
  } = useDiagramStore();

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges);

  // Sync local state with store
  React.useEffect(() => {
    setNodesState(storeNodes);
  }, [storeNodes, setNodesState]);

  React.useEffect(() => {
    setEdgesState(storeEdges);
  }, [storeEdges, setEdgesState]);

  // Update store when local state changes
  React.useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  React.useEffect(() => {
    setEdges(edges);
  }, [edges, setEdges]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: 'smoothstep',
      };
      addStoreEdge(newEdge);
    },
    [addStoreEdge]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    openModal('node', node);
  }, [setSelectedNode, openModal]);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    openModal('edge', edge);
  }, [setSelectedEdge, openModal]);

  const onPaneClick = useCallback(() => {
    // Open modal for new node when clicking on empty space
    openModal('node');
  }, [openModal]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default DiagramFlow;