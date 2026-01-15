"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, RefreshCw, Save, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface AIScriptPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
  companyDescription: string;
  salesPitch: string;
  tone: string;
}

export function AIScriptPreviewModal({
  open,
  onOpenChange,
  companyName,
  companyDescription,
  salesPitch,
  tone,
}: AIScriptPreviewModalProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Generate initial script based on context
  const generateScript = () => {
    const company = companyName || "Your Company";
    const description = companyDescription || "innovative solutions";
    const pitch = salesPitch || "our amazing products and services";
    
    const toneIntros: Record<string, string> = {
      professional: `Good [morning/afternoon], this is calling from ${company}.`,
      friendly: `Hey there! This is from ${company}. How are you doing today?`,
      sales: `Hi! I'm reaching out from ${company} with an exciting opportunity.`,
      casual: `Hey! Quick call from ${company}. Got a minute?`,
    };
    
    const intro = toneIntros[tone] || toneIntros.professional;
    
    return `${intro}

I wanted to reach out because ${description}.

${pitch}

I'd love to share how we can help you achieve [specific benefit]. 

Would you be interested in learning more about how ${company} can support your goals?

[If yes]: That's great! Let me tell you more about...

[If no/not now]: I completely understand. Would it be okay if I sent you some information via email instead?

Thank you for your time today. Have a wonderful [day/evening]!`;
  };

  const [script, setScript] = useState(generateScript());

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate AI regeneration
    setTimeout(() => {
      setScript(generateScript());
      setIsRegenerating(false);
      toast.success("Script regenerated successfully!");
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Script saved to campaign!");
      onOpenChange(false);
    }, 800);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setIsCopied(true);
      toast.success("Script copied to clipboard!");
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy script");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                AI-Generated Call Script
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Review and customize your AI conversation script
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Context Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2"
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Company:</span>
            <span className="text-foreground font-medium">
              {companyName || "Not specified"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Tone:</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-medium capitalize">
              {tone}
            </span>
          </div>
        </motion.div>

        {/* Script Editor */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground">
              Call Script
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 gap-2"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="w-4 h-4 text-success" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
          
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="flex-1 min-h-[300px] font-mono text-sm resize-none bg-input border-border focus:border-primary/50"
            placeholder="Your AI script will appear here..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <Button
            variant="outline"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="gap-2"
          >
            <motion.div
              animate={isRegenerating ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRegenerating ? Infinity : 0, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            {isRegenerating ? "Regenerating..." : "Regenerate Script"}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
