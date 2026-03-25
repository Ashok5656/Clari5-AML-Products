import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Network_4, 
  User, 
  Enterprise, 
  UserProfile, 
  Identification, 
  Email, 
  Document, 
  Purchase, 
  Building,
  Warning,
  Money,
  ZoomIn,
  ZoomOut,
  FitToScreen,
  Reset,
  Download
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";

// Types
type EntityType = 'Corporate' | 'Retail' | 'Staff';
type SearchType = 'CIF' | 'VAT' | 'Customer id' | 'Email id' | 'Passport number';

interface Node {
  id: string;
  label: string;
  type: string;
  category: 'primary' | 'secondary' | 'tertiary';
  riskScore?: number;
  details?: Record<string, string>;
  x: number;
  y: number;
}

interface Link {
  source: string;
  target: string;
  label?: string;
  type: 'transaction' | 'relation' | 'ownership';
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface GraphicalNetworkAnalysisProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

export function GraphicalNetworkAnalysis({ breadcrumbs, onBreadcrumbNavigate }: GraphicalNetworkAnalysisProps) {
  const [entityType, setEntityType] = useState<EntityType>('Corporate');
  const [searchBy, setSearchBy] = useState<string>('CIF');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Generate Mock Data based on search
  const handleSearch = () => {
    if (!searchValue) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const centerX = 400;
      const centerY = 300;
      
      const newNodes: Node[] = [];
      const newLinks: Link[] = [];

      // Central Node
      const mainNodeId = "root";
      newNodes.push({
        id: mainNodeId,
        label: searchValue,
        type: entityType,
        category: 'primary',
        riskScore: Math.floor(Math.random() * 100),
        details: {
          "Name": entityType === 'Corporate' ? "Acme Corp Ltd." : "John Doe",
          "Type": entityType,
          [searchBy]: searchValue,
          "Status": "Active",
          "Risk Level": "High"
        },
        x: centerX,
        y: centerY
      });

      // Level 1 Nodes (Direct connections)
      const level1Count = 5 + Math.floor(Math.random() * 3);
      const radius1 = 150;
      
      for (let i = 0; i < level1Count; i++) {
        const angle = (i / level1Count) * 2 * Math.PI;
        const id = `l1-${i}`;
        const type = Math.random() > 0.5 ? 'Account' : 'Party';
        
        newNodes.push({
          id,
          label: type === 'Account' ? `ACC-${1000 + i}` : `Party ${String.fromCharCode(65 + i)}`,
          type,
          category: 'secondary',
          riskScore: Math.floor(Math.random() * 80),
          x: centerX + radius1 * Math.cos(angle),
          y: centerY + radius1 * Math.sin(angle),
          details: {
            "Relation": "Direct",
            "Since": "2020-01-01"
          }
        });

        newLinks.push({
          source: mainNodeId,
          target: id,
          type: 'relation',
          label: 'Owner'
        });

        // Level 2 Nodes (connected to some level 1 nodes)
        if (Math.random() > 0.6) {
           const level2Count = 1 + Math.floor(Math.random() * 2);
           const radius2 = 80;
           for (let j = 0; j < level2Count; j++) {
             const angle2 = angle + (j === 0 ? 0.2 : -0.2); // Offset slightly
             const id2 = `l2-${i}-${j}`;
             const x2 = (centerX + radius1 * Math.cos(angle)) + radius2 * Math.cos(angle2);
             const y2 = (centerY + radius1 * Math.sin(angle)) + radius2 * Math.sin(angle2);
             
             newNodes.push({
               id: id2,
               label: `Txn-${100 + j}`,
               type: 'Transaction',
               category: 'tertiary',
               x: x2,
               y: y2,
               details: {
                 "Amount": "$50,000",
                 "Date": "2024-03-15"
               }
             });

             newLinks.push({
                source: id,
                target: id2,
                type: 'transaction'
             });
           }
        }
      }

      setGraphData({ nodes: newNodes, links: newLinks });
      setIsAnalyzing(false);
      setTranslate({ x: 0, y: 0 });
      setScale(1);
    }, 1500);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAdjustment = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(0.5, scale + scaleAdjustment), 3);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setTranslate(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 shadow-sm z-10">
        <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Entity Type Selector */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Entity Type</Label>
              <div className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                 {(['Corporate', 'Retail', 'Staff'] as EntityType[]).map((type) => (
                   <button
                     key={type}
                     onClick={() => setEntityType(type)}
                     className={cn(
                       "px-4 py-2 text-sm font-medium rounded-md transition-all",
                       entityType === type 
                         ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                         : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                     )}
                   >
                     <div className="flex items-center gap-2">
                       {type === 'Corporate' && <Enterprise className="w-4 h-4" />}
                       {type === 'Retail' && <User className="w-4 h-4" />}
                       {type === 'Staff' && <UserProfile className="w-4 h-4" />}
                       {type}
                     </div>
                   </button>
                 ))}
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800" />

            {/* Search Controls */}
            <div className="flex-1 flex flex-col gap-2 w-full">
               <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Search Parameters</Label>
               <div className="flex items-center gap-2 w-full">
                   <Select value={searchBy} onValueChange={setSearchBy}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-gray-950 border border-[#C6C6C6] !h-[46px]">
                      <SelectValue placeholder="Select criteria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CIF">CIF</SelectItem>
                      <SelectItem value="VAT">VAT</SelectItem>
                      <SelectItem value="Customer id">Customer ID</SelectItem>
                      <SelectItem value="Email id">Email ID</SelectItem>
                      <SelectItem value="Passport number">Passport Number</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative w-[320px]">
                    <Input 
                      placeholder={`Enter ${searchBy}...`}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-950 border border-[#C6C6C6] !h-[46px]"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>

                 <Button 
                   onClick={handleSearch} 
                   disabled={!searchValue || isAnalyzing}
                   className="bg-[#2A53A0] hover:bg-[#1f3d7a] text-white min-w-[120px]"
                 >
                   {isAnalyzing ? (
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                     >
                       <Network_4 className="w-4 h-4" />
                     </motion.div>
                   ) : (
                     <span className="flex items-center gap-2">
                       <Search className="w-4 h-4" /> Analyze
                     </span>
                   )}
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Graph Canvas */}
        <div 
          className="flex-1 relative bg-gray-50 dark:bg-gray-900 cursor-move overflow-hidden"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
           {/* Grid Background */}
           <div 
             className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(#2A53A0 1px, transparent 1px)`,
               backgroundSize: `${20 * scale}px ${20 * scale}px`,
               backgroundPosition: `${translate.x}px ${translate.y}px`
             }}
           />

           {!graphData && !isAnalyzing && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none select-none">
               <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                 <Network_4 className="w-12 h-12 text-gray-300 dark:text-gray-600" />
               </div>
               <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">Ready to Analyze</h3>
               <p className="max-w-md text-center mt-2 text-sm">
                 Select an entity type and enter search criteria to generate a graphical network analysis of relationships and transactions.
               </p>
             </div>
           )}

           {graphData && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="absolute inset-0 origin-top-left"
               style={{
                 transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
               }}
             >
               <svg className="w-[2000px] h-[2000px] overflow-visible pointer-events-none">
                 {/* Links */}
                 {graphData.links.map((link, i) => {
                   const sourceNode = graphData.nodes.find(n => n.id === link.source);
                   const targetNode = graphData.nodes.find(n => n.id === link.target);
                   if (!sourceNode || !targetNode) return null;

                   return (
                     <motion.g key={`${link.source}-${link.target}-${i}`}
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       transition={{ duration: 1, delay: i * 0.1 }}
                     >
                       <line 
                         x1={sourceNode.x} 
                         y1={sourceNode.y} 
                         x2={targetNode.x} 
                         y2={targetNode.y} 
                         stroke="#94a3b8" 
                         strokeWidth={link.type === 'transaction' ? 1 : 2}
                         strokeDasharray={link.type === 'transaction' ? "4 4" : "0"}
                       />
                     </motion.g>
                   );
                 })}
               </svg>
               
               {/* Nodes */}
               {graphData.nodes.map((node, i) => (
                 <motion.div
                   key={node.id}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ 
                     type: "spring", 
                     stiffness: 260, 
                     damping: 20, 
                     delay: i * 0.05 + 0.5 
                   }}
                   className={cn(
                     "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 shadow-lg cursor-pointer transition-all hover:scale-110 z-10",
                     node.category === 'primary' 
                       ? "w-16 h-16 bg-white border-[#2A53A0] z-20" 
                       : node.category === 'secondary'
                         ? "w-12 h-12 bg-white border-sky-500"
                         : "w-8 h-8 bg-white border-orange-400"
                   )}
                   style={{ left: node.x, top: node.y }}
                   onClick={(e) => {
                     e.stopPropagation();
                     setSelectedNode(node);
                   }}
                 >
                   {node.category === 'primary' && (
                      node.type === 'Corporate' ? <Enterprise className="w-8 h-8 text-[#2A53A0]" /> : <User className="w-8 h-8 text-[#2A53A0]" />
                   )}
                   {node.category === 'secondary' && (
                      node.type === 'Account' ? <Building className="w-5 h-5 text-sky-600" /> : <User className="w-5 h-5 text-sky-600" />
                   )}
                   {node.category === 'tertiary' && (
                      <Money className="w-4 h-4 text-orange-500" />
                   )}
                   
                   {/* Label */}
                   <div className="absolute top-full mt-2 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700 shadow-sm pointer-events-none">
                     {node.label}
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           )}
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <Button variant="secondary" size="icon" onClick={() => setScale(s => Math.min(s + 0.2, 3))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => setScale(s => Math.max(s - 0.2, 0.5))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => { setScale(1); setTranslate({ x: 0, y: 0 }); }}>
            <FitToScreen className="w-4 h-4" />
          </Button>
        </div>

        {/* Details Panel - Slide over */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-30 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-900">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Node Details</h3>
                <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-6">
                 {/* Header Info */}
                 <div className="flex flex-col items-center py-4">
                   <div className={cn(
                     "w-16 h-16 rounded-full flex items-center justify-center mb-3",
                     selectedNode.category === 'primary' ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                   )}>
                      {selectedNode.category === 'primary' ? <Enterprise className="w-8 h-8" /> : <User className="w-8 h-8" />}
                   </div>
                   <h4 className="text-lg font-bold text-gray-900 dark:text-white">{selectedNode.label}</h4>
                   <Badge variant="outline" className="mt-2">{selectedNode.type}</Badge>
                 </div>

                 {/* Key Attributes */}
                 {selectedNode.details && (
                   <div className="space-y-4">
                     <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Attributes</h5>
                     <div className="grid gap-3">
                       {Object.entries(selectedNode.details).map(([key, value]) => (
                         <div key={key} className="flex flex-col bg-gray-50 dark:bg-gray-900 p-2 rounded">
                           <span className="text-xs text-gray-500">{key}</span>
                           <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{value}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Risk Score */}
                 {selectedNode.riskScore !== undefined && (
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Risk Score</h5>
                       <span className={cn(
                         "text-lg font-bold",
                         selectedNode.riskScore > 70 ? "text-red-600" : selectedNode.riskScore > 40 ? "text-amber-600" : "text-green-600"
                       )}>{selectedNode.riskScore}/100</span>
                     </div>
                     <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                       <div 
                         className={cn(
                           "h-full rounded-full",
                           selectedNode.riskScore > 70 ? "bg-red-500" : selectedNode.riskScore > 40 ? "bg-amber-500" : "bg-green-500"
                         )}
                         style={{ width: `${selectedNode.riskScore}%` }}
                       />
                     </div>
                   </div>
                 )}

                 <div className="pt-4 flex gap-2">
                   <Button variant="outline" className="flex-1 text-xs">Full Profile</Button>
                   <Button variant="default" className="flex-1 text-xs bg-[#2A53A0]">Actions</Button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
