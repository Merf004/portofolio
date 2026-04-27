import {
  Brain,
  Code,
  GraduationCap,
  FlaskConical,
  BarChart3,
  Bot,
  Globe,
  Wrench,
} from "lucide-react";

const iconMap = {
  Brain,
  Code,
  GraduationCap,
  FlaskConical,
  BarChart3,
  Bot,
  Globe,
  Wrench,
};

export default function DynamicIcon({ name, size = 20, className = "" }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}