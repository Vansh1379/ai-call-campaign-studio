import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type StatusType = "draft" | "ready" | "calling" | "completed";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "status-badge-draft",
  },
  ready: {
    label: "Ready",
    className: "status-badge-ready",
  },
  calling: {
    label: "Calling…",
    className: "status-badge-calling",
  },
  completed: {
    label: "Completed",
    className: "status-badge-success",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <motion.span 
      className={cn(config.className, className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {status === "calling" && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
      {status === "completed" && (
        <motion.span 
          className="w-2 h-2 rounded-full bg-success mr-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        />
      )}
      {status === "ready" && (
        <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
      )}
      {config.label}
    </motion.span>
  );
}
