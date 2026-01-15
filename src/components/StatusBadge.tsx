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
    <span className={cn(config.className, className)}>
      {status === "calling" && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
        </span>
      )}
      {status === "completed" && (
        <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
      )}
      {config.label}
    </span>
  );
}
