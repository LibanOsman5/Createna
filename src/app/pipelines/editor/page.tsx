"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  type Node,
  type Edge,
  type Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

// ═══ Custom Pipeline Node ═══
function PipelineNode({ data, selected }: { data: { label: string; model: string; icon: string; stageIndex: number }; selected: boolean }) {
  return (
    <div
      className={`min-w-[140px] rounded-[10px] border px-4 py-4 text-center transition-colors ${
        selected
          ? "border-[#3B82F6] bg-[#1C1C1F]"
          : "border-[#2A2A30] bg-[#1C1C1F]"
      }`}
    >
      <div className="text-2xl mb-2">{data.icon}</div>
      <div className="text-[13px] font-semibold text-[#EDEDEF]">{data.label}</div>
      <div className="text-[11px] text-[#888891] mt-1">{data.model}</div>
      <div className="mt-2 inline-block rounded-full bg-[#3B82F6]/15 px-2 py-0.5 font-mono text-[10px] text-[#3B82F6]">
        Stage {data.stageIndex + 1}
      </div>
    </div>
  );
}

const nodeTypes = { pipelineNode: PipelineNode };

// ═══ Default Pipeline Stages ═══
const defaultStages = [
  { icon: "📋", label: "Brief Intake", model: "Manual / CSV / API" },
  { icon: "🖼", label: "Image Gen", model: "Flux Pro" },
  { icon: "🎥", label: "Video Gen", model: "Veo 3.1" },
  { icon: "✂", label: "Compositing", model: "Remotion" },
  { icon: "🔍", label: "QC Inspect", model: "GPT-4o Vision" },
  { icon: "✅", label: "Approval", model: "Human Review" },
  { icon: "🚀", label: "Publish", model: "Meta / TikTok" },
];

function createNodes(stages: typeof defaultStages): Node[] {
  return stages.map((stage, i) => ({
    id: `stage-${i}`,
    type: "pipelineNode",
    position: { x: i * 200, y: 80 },
    data: { ...stage, stageIndex: i },
  }));
}

function createEdges(stages: typeof defaultStages): Edge[] {
  return stages.slice(0, -1).map((_, i) => ({
    id: `edge-${i}-${i + 1}`,
    source: `stage-${i}`,
    target: `stage-${i + 1}`,
    animated: true,
    style: { stroke: "#2A2A30", strokeWidth: 2 },
  }));
}

const modelOptions = [
  "Auto (quality-optimized)",
  "Auto (cost-optimized)",
  "Auto (speed-optimized)",
  "Seedance 2.0",
  "Veo 3.1",
  "Kling 3.0",
  "Sora 2",
  "Wan 2.5",
];

const stageConfigs: Record<number, { title: string; fields: Array<{ label: string; type: string; options?: string[] }> }> = {
  0: { title: "Brief Intake", fields: [{ label: "Intake Method", type: "select", options: ["Manual Form", "CSV Upload", "API Webhook", "AI Brief Generator"] }] },
  1: { title: "Image Generation", fields: [{ label: "Model", type: "select", options: ["Flux Pro", "DALL-E 4", "Stable Diffusion", "Midjourney (proxy)"] }, { label: "Variants", type: "number" }] },
  2: { title: "Video Generation", fields: [{ label: "Model Router", type: "select", options: modelOptions }, { label: "Duration", type: "select", options: ["5s", "10s", "15s", "30s", "60s"] }, { label: "Resolution", type: "select", options: ["720p", "1080p", "4K"] }, { label: "Style Preset", type: "select", options: ["Product Demo", "Lifestyle UGC", "Animated Explainer", "Cinematic Premium", "Fast Draft"] }] },
  3: { title: "Compositing", fields: [{ label: "Engine", type: "select", options: ["Remotion", "HyperFrames"] }, { label: "Template", type: "select", options: ["Ad Creative 9:16", "Social 1:1", "Landscape 16:9", "Custom"] }] },
  4: { title: "QC Inspection", fields: [{ label: "AI Model", type: "select", options: ["GPT-4o", "Claude Vision"] }, { label: "Auto-approve threshold", type: "select", options: ["> 90%", "> 85%", "> 80%", "Disabled"] }] },
  5: { title: "Approval Gate", fields: [{ label: "Approval Mode", type: "select", options: ["Manual Review", "Auto-approve (QC > threshold)", "Skip"] }] },
  6: { title: "Publishing", fields: [{ label: "Platforms", type: "select", options: ["Meta Ads", "TikTok Ads", "YouTube", "Google Ads", "All"] }] },
};

export default function PipelineEditorPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes(defaultStages));
  const [edges, setEdges, onEdgesChange] = useEdgesState(createEdges(defaultStages));
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [pipelineName, setPipelineName] = useState("Product Ad Factory");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedStage((node.data as { stageIndex: number }).stageIndex);
    },
    []
  );

  const config = selectedStage !== null ? stageConfigs[selectedStage] : null;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-[13px] text-[#888891] hover:text-[#EDEDEF] transition-colors flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Pipelines
        </Link>
        <span className="font-semibold">{pipelineName}</span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#888891]">Export</Button>
          <Button size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save Pipeline
          </Button>
        </div>
      </div>

      {/* Pipeline Canvas */}
      <Card className="flex-1 overflow-hidden border-[#2A2A30] bg-[#141416]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          defaultEdgeOptions={{ animated: true, style: { stroke: "#2A2A30", strokeWidth: 2 } }}
          proOptions={{ hideAttribution: true }}
        >
          <Controls className="!bg-[#1C1C1F] !border-[#2A2A30] !fill-[#888891]" />
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#2A2A30" />
        </ReactFlow>
      </Card>

      {/* Stage Configuration Panel */}
      {config && (
        <Card className="border-[#2A2A30] bg-[#1C1C1F]">
          <div className="border-b border-[#2A2A30] px-4 py-3 text-sm font-semibold">
            Stage Configuration: {config.title}
          </div>
          <div className="grid grid-cols-4 gap-3 p-4">
            {config.fields.map((field) => (
              <div key={field.label}>
                <label className="mb-1 block text-xs text-[#888891]">{field.label}</label>
                {field.type === "select" ? (
                  <Select>
                    <SelectTrigger className="h-9 border-[#2A2A30] bg-[#141416] text-[13px] text-[#EDEDEF]">
                      <SelectValue placeholder={field.options?.[0]} />
                    </SelectTrigger>
                    <SelectContent className="border-[#2A2A30] bg-[#1C1C1F] text-[#EDEDEF]">
                      {field.options?.map((opt) => (
                        <SelectItem key={opt} value={opt} className="text-[13px]">{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input type="number" className="h-9 border-[#2A2A30] bg-[#141416] text-[13px] text-[#EDEDEF]" />
                )}
              </div>
            ))}
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-xs text-[#888891] cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#3B82F6]" />
                Enable fallback chain
              </label>
              <label className="flex items-center gap-2 text-xs text-[#888891] cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#3B82F6]" />
                Auto-retry on fail
              </label>
            </div>
          </div>
        </Card>
      )}

      {!config && (
        <div className="flex items-center justify-center rounded-[10px] border border-[#2A2A30] bg-[#141416] py-4 text-[13px] text-[#5C5C66]">
          Click a stage node to configure it
        </div>
      )}
    </div>
  );
}
