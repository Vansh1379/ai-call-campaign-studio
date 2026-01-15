import { motion } from "framer-motion";
import { Phone, Radio } from "lucide-react";

interface CallSetupCardProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  callMyNumber: boolean;
  setCallMyNumber: (value: boolean) => void;
  callType: string;
  setCallType: (value: string) => void;
}

export function CallSetupCard({
  phoneNumber,
  setPhoneNumber,
  callMyNumber,
  setCallMyNumber,
  callType,
  setCallType,
}: CallSetupCardProps) {
  return (
    <motion.div
      className="card-elevated card-glow relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -2 }}
    >
      {/* Waveform background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
        >
          <motion.path
            d="M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow:
                callMyNumber || phoneNumber
                  ? [
                      "0 0 0px hsl(var(--primary) / 0)",
                      "0 0 20px hsl(var(--primary) / 0.3)",
                      "0 0 0px hsl(var(--primary) / 0)",
                    ]
                  : "none",
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Phone className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h2 className="section-title flex items-center gap-2">
              Call Setup
              {(phoneNumber || callMyNumber) && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 text-xs text-primary"
                >
                  <Radio className="w-3 h-3" />
                  Armed
                </motion.span>
              )}
            </h2>
            <p className="helper-text">Configure the outbound call settings</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="input-glow">
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone number to call
            </label>
            <motion.input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`input-field w-full ${
                callMyNumber ? "opacity-50" : ""
              }`}
              disabled={callMyNumber}
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <motion.div
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 cursor-pointer"
            onClick={() => setCallMyNumber(!callMyNumber)}
            whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
            whileTap={{ scale: 0.99 }}
          >
            <motion.button
              type="button"
              role="checkbox"
              aria-checked={callMyNumber}
              className={`relative w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                callMyNumber
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/50 hover:border-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {callMyNumber && (
                <motion.svg
                  className="w-3.5 h-3.5 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </motion.button>
            <div>
              <span className="text-sm font-medium text-foreground">
                Call my number instead
              </span>
              <p className="text-xs text-muted-foreground">
                Demo mode - receive the call yourself
              </p>
            </div>
          </motion.div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Call Type
            </label>
            <div className="flex gap-2">
              {[
                { value: "outbound", label: "Outbound Call" },
                { value: "inbound-demo", label: "Inbound Demo" },
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setCallType(option.value)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    callType === option.value
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-muted/50 text-muted-foreground border border-border hover:bg-muted"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          className="helper-text mt-6 pt-5 border-t border-border/50"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: phoneNumber || callMyNumber ? 1 : 0.5 }}
        >
          The AI will place the call using an AI-managed phone number and speak
          on behalf of your business.
        </motion.p>
      </div>
    </motion.div>
  );
}
