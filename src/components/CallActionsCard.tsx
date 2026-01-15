import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, PhoneIncoming, FileText, Check, Zap } from "lucide-react";

type CallState = "idle" | "calling" | "completed";

interface CallActionsCardProps {
  callState: CallState;
  onStartCall: () => void;
  onCallMe: () => void;
  onPreviewScript: () => void;
}

function WaveformAnimation() {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary-foreground rounded-full"
          animate={{
            height: ["8px", "16px", "8px"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function CallActionsCard({
  callState,
  onStartCall,
  onCallMe,
  onPreviewScript,
}: CallActionsCardProps) {
  return (
    <motion.div
      className="card-elevated card-glow relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -2 }}
    >
      {/* Glow effect when calling */}
      <AnimatePresence>
        {callState === "calling" && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            animate={
              callState === "calling"
                ? {
                    boxShadow: [
                      "0 0 0px hsl(var(--primary) / 0)",
                      "0 0 30px hsl(var(--primary) / 0.4)",
                      "0 0 0px hsl(var(--primary) / 0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h2 className="section-title">Call Actions</h2>
            <p className="helper-text">Launch or preview your AI call</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={onStartCall}
            disabled={callState === "calling"}
            className="btn-primary min-w-[140px]"
            whileHover={{ scale: callState === "calling" ? 1 : 1.02 }}
            whileTap={{ scale: callState === "calling" ? 1 : 0.98 }}
          >
            <AnimatePresence mode="wait">
              {callState === "idle" && (
                <motion.span
                  key="idle"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <PhoneCall className="w-4 h-4" />
                  Start AI Call
                </motion.span>
              )}
              {callState === "calling" && (
                <motion.span
                  key="calling"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <WaveformAnimation />
                  <span className="ml-1">Calling…</span>
                </motion.span>
              )}
              {callState === "completed" && (
                <motion.span
                  key="completed"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                  Complete
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={onCallMe}
            disabled={callState === "calling"}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <PhoneIncoming className="w-4 h-4" />
            Call Me Now
          </motion.button>

          <motion.button
            onClick={onPreviewScript}
            className="btn-ghost"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            Preview AI Script
          </motion.button>
        </div>

        <motion.p
          className="helper-text mt-6 pt-5 border-t border-border/50"
          animate={{ opacity: callState === "calling" ? 1 : 0.7 }}
        >
          {callState === "calling"
            ? "AI agent is currently on the call..."
            : "The AI uses the provided context to deliver a personalized sales pitch during the call."}
        </motion.p>
      </div>
    </motion.div>
  );
}
