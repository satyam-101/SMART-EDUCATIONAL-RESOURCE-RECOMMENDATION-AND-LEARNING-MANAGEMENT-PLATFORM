import { BarChart3, Bot, Brain, CircuitBoard, Cloud, Code2, Cpu, Database, Layers, Monitor, PieChart, Server, Shield, Smartphone, Workflow, type LucideIcon } from 'lucide-react';
import type { CareerPath } from '../../data/careers';

const ICONS: Record<string, LucideIcon> = {
  Brain,
  Cpu,
  BarChart3,
  Database,
  Code2,
  Layers,
  Server,
  Cloud,
  Workflow,
  Shield,
  PieChart,
  Bot,
  Monitor,
  Smartphone,
  CircuitBoard,
};

export function careerIcon(p: Pick<CareerPath, 'icon'>): LucideIcon {
  return ICONS[p.icon] ?? Brain;
}