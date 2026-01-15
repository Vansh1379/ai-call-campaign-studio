import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface BusinessContextCardProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  companyDescription: string;
  setCompanyDescription: (value: string) => void;
  salesPitch: string;
  setSalesPitch: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
}

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "sales", label: "Sales" },
  { value: "casual", label: "Casual" },
];

export function BusinessContextCard({
  companyName,
  setCompanyName,
  companyDescription,
  setCompanyDescription,
  salesPitch,
  setSalesPitch,
  tone,
  setTone,
}: BusinessContextCardProps) {
  const [showHelper, setShowHelper] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (companyName || companyDescription || salesPitch) {
      setShowHelper(true);
    }
  }, [companyName, companyDescription, salesPitch]);

  return (
    <motion.div
      className="card-elevated card-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -2 }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h2 className="section-title flex items-center gap-2">
              Business Context
              <Sparkles className="w-4 h-4 text-primary/60" />
            </h2>
            <p className="helper-text">
              Define how the AI represents your company
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div
            className={`input-glow ${
              focusedField === "companyName" ? "relative" : ""
            }`}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Name
            </label>
            <motion.input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={() => setFocusedField("companyName")}
              onBlur={() => setFocusedField(null)}
              placeholder="Acme Corporation"
              className="input-field w-full"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <div
            className={`input-glow ${
              focusedField === "description" ? "relative" : ""
            }`}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              What does your company do?
            </label>
            <motion.textarea
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              onFocus={() => setFocusedField("description")}
              onBlur={() => setFocusedField(null)}
              placeholder="We provide enterprise software solutions for..."
              rows={3}
              className="input-field w-full resize-none"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <div
            className={`input-glow ${
              focusedField === "pitch" ? "relative" : ""
            }`}
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Sales pitch / talking points
            </label>
            <div className="relative">
              <motion.textarea
                value={salesPitch}
                onChange={(e) => setSalesPitch(e.target.value)}
                onFocus={() => setFocusedField("pitch")}
                onBlur={() => setFocusedField(null)}
                placeholder="Key benefits, unique selling points, call-to-action..."
                rows={5}
                className="input-field w-full resize-none"
                whileFocus={{ scale: 1.01 }}
              />
              {focusedField === "pitch" && !salesPitch && (
                <motion.span
                  className="absolute top-3 left-4 text-muted-foreground pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="inline-block w-0.5 h-4 bg-primary animate-pulse" />
                </motion.span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Conversation Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {toneOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`tone-pill ${
                    tone === option.value ? "active" : ""
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
          className="helper-text mt-6 pt-5 border-t border-border/50 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHelper ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary/60" />
          This context trains the AI voice agent in real time.
        </motion.p>
      </div>
    </motion.div>
  );
}
