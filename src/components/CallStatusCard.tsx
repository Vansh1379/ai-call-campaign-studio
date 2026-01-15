import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, CheckCircle2, Phone, MessageSquare, Mic } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { useState, useEffect } from "react";

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

const mockTranscript = [
  { speaker: "AI", text: "Hi, this is Sarah from Acme Corporation..." },
  { speaker: "AI", text: "I'm calling about our enterprise solutions..." },
  { speaker: "Prospect", text: "Tell me more about your pricing..." },
  { speaker: "AI", text: "Great question! Our plans start at..." },
];

function LiveTranscript({ isActive }: { isActive: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (isActive) {
      setVisibleLines(0);
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= mockTranscript.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setVisibleLines(0);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-4 p-4 rounded-xl bg-muted/30 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-primary uppercase tracking-wide">Live Transcript</span>
      </div>
      <div className="space-y-2 max-h-32 overflow-hidden">
        <AnimatePresence>
          {mockTranscript.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: line.speaker === "AI" ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <span className={`text-xs font-medium ${line.speaker === "AI" ? "text-primary" : "text-muted-foreground"}`}>
                {line.speaker}:
              </span>
              <span className="text-xs text-foreground/80">{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AIIndicator() {
  return (
    <motion.div 
      className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20"
      animate={{ 
        boxShadow: [
          "0 0 0px hsl(var(--primary) / 0)",
          "0 0 20px hsl(var(--primary) / 0.2)",
          "0 0 0px hsl(var(--primary) / 0)"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Mic className="w-4 h-4 text-primary" />
      </motion.div>
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">AI Agent Speaking</div>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-primary rounded-full"
              animate={{ height: ["4px", `${8 + Math.random() * 12}px`, "4px"] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CallStatusCard({ callState, logs }: CallStatusCardProps) {
  return (
    <motion.div 
      className="card-elevated card-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            animate={callState === "calling" ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Activity className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h2 className="section-title flex items-center gap-2">
              Call Status
              {callState === "calling" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-primary font-normal"
                >
                  • Live
                </motion.span>
              )}
            </h2>
            <p className="helper-text">Monitor your call activity</p>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Status</span>
            <StatusBadge
              status={callState === "idle" ? "ready" : callState === "calling" ? "calling" : "completed"}
            />
          </div>
        </div>

        {/* AI Speaking Indicator */}
        <AnimatePresence>
          {callState === "calling" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <AIIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Transcript */}
        <AnimatePresence>
          <LiveTranscript isActive={callState === "calling"} />
        </AnimatePresence>

        {/* Call Logs */}
        <div className="space-y-3">
          {logs.length === 0 ? (
            <motion.div 
              className="text-center py-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Phone className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No calls yet</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="p-1.5 rounded-lg bg-muted"
                      whileHover={{ scale: 1.1 }}
                    >
                      {log.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.div>
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
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}
