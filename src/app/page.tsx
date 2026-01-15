"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { StatusBadge } from "@/components/StatusBadge";
import { BusinessContextCard } from "@/components/BusinessContextCard";
import { CallSetupCard } from "@/components/CallSetupCard";
import { CallActionsCard } from "@/components/CallActionsCard";
import { CallStatusCard } from "@/components/CallStatusCard";
import { AIScriptPreviewModal } from "@/components/AIScriptPreviewModal";
import { Sparkles } from "lucide-react";

type CallState = "idle" | "calling" | "completed";

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [salesPitch, setSalesPitch] = useState("");
  const [tone, setTone] = useState("professional");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [callMyNumber, setCallMyNumber] = useState(false);
  const [callType, setCallType] = useState("outbound");

  const [callState, setCallState] = useState<CallState>("idle");
  const [callLogs, setCallLogs] = useState([
    {
      id: "1",
      status: "completed" as const,
      timestamp: "Today, 2:34 PM",
      duration: "3m 42s",
      result: "Lead qualified - Follow-up scheduled",
    },
    {
      id: "2",
      status: "completed" as const,
      timestamp: "Today, 1:15 PM",
      duration: "1m 28s",
      result: "Voicemail left",
    },
  ]);

  // Modal
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);

  const isReady =
    companyName && companyDescription && (phoneNumber || callMyNumber);

  const handleStartCall = () => {
    if (!isReady) return;
    setCallState("calling");

    // Simulate call completion
    setTimeout(() => {
      setCallState("completed");
      setCallLogs([
        {
          id: Date.now().toString(),
          status: "completed",
          timestamp: "Just now",
          duration: "2m 15s",
          result: "Demo completed successfully",
        },
        ...callLogs,
      ]);
    }, 8000);
  };

  const handleCallMe = () => {
    setCallMyNumber(true);
    handleStartCall();
  };

  const handlePreviewScript = () => {
    setIsScriptModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-dark pointer-events-none" />
      <div className="fixed inset-0 bg-noise pointer-events-none" />

      <motion.div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* navbar */}
      <motion.header
        className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
                <Image
                  src="/image.png"
                  alt="Paradigm Outreach Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <span className="font-bold text-foreground text-lg">
                Paradigm Outreach
              </span>
            </motion.div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8 text-sm">
                {["Campaigns", "AI Calls", "Analytics", "Settings"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      className={`transition-colors relative ${
                        item === "AI Calls"
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ y: -1 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                      {item === "AI Calls" && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          layoutId="activeNav"
                        />
                      )}
                    </motion.a>
                  )
                )}
              </nav>
              <motion.div
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-sm font-semibold text-primary border border-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JD
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Page Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <motion.h1
                className="text-4xl font-extrabold text-foreground mb-3 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-gradient">Outbound AI Call Campaign</span>
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                AI-powered phone calls that sell for you
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <StatusBadge
                status={
                  isReady
                    ? callState === "calling"
                      ? "calling"
                      : callState === "completed"
                      ? "completed"
                      : "ready"
                    : "draft"
                }
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BusinessContextCard
              companyName={companyName}
              setCompanyName={setCompanyName}
              companyDescription={companyDescription}
              setCompanyDescription={setCompanyDescription}
              salesPitch={salesPitch}
              setSalesPitch={setSalesPitch}
              tone={tone}
              setTone={setTone}
            />
          </div>

          <div className="space-y-8">
            <CallSetupCard
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              callMyNumber={callMyNumber}
              setCallMyNumber={setCallMyNumber}
              callType={callType}
              setCallType={setCallType}
            />

            <CallActionsCard
              callState={callState}
              onStartCall={handleStartCall}
              onCallMe={handleCallMe}
              onPreviewScript={handlePreviewScript}
            />

            <CallStatusCard callState={callState} logs={callLogs} />
          </div>
        </div>
      </main>

      <AIScriptPreviewModal
        open={isScriptModalOpen}
        onOpenChange={setIsScriptModalOpen}
        companyName={companyName}
        companyDescription={companyDescription}
        salesPitch={salesPitch}
        tone={tone}
      />
    </div>
  );
}
