import { Activity, Clock, CheckCircle2, Phone } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type CallState = "idle" | "calling" | "completed";

interface CallLog {
  id: string;
  status: "ready" | "calling" | "completed";
  timestamp: string;
  duration?: string;
  result?: string;
}

interface CallStatusCardProps {
  callState: CallState;
  logs: CallLog[];
}

export function CallStatusCard({ callState, logs }: CallStatusCardProps) {
  return (
    <div className="card-elevated">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Call Status</h2>
          <p className="helper-text">Monitor your call activity</p>
        </div>
      </div>

      {/* Current Status */}
      <div className="p-4 rounded-lg bg-muted/50 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Status</span>
          <StatusBadge
            status={callState === "idle" ? "ready" : callState === "calling" ? "calling" : "completed"}
          />
        </div>
      </div>

      {/* Call Logs */}
      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No calls yet</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-muted">
                  {log.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {log.result || "Outbound Call"}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                    {log.duration && <span>• {log.duration}</span>}
                  </p>
                </div>
              </div>
              <StatusBadge status={log.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
