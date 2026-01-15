import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { BusinessContextCard } from "@/components/BusinessContextCard";
import { CallSetupCard } from "@/components/CallSetupCard";
import { CallActionsCard } from "@/components/CallActionsCard";
import { CallStatusCard } from "@/components/CallStatusCard";
import { Zap } from "lucide-react";

type CallState = "idle" | "calling" | "completed";

const Index = () => {
  // Business context state
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [salesPitch, setSalesPitch] = useState("");
  const [tone, setTone] = useState("professional");

  // Call setup state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callMyNumber, setCallMyNumber] = useState(false);
  const [callType, setCallType] = useState("outbound");

  // Call state
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

  const isReady = companyName && companyDescription && (phoneNumber || callMyNumber);

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
    }, 3000);
  };

  const handleCallMe = () => {
    setCallMyNumber(true);
    handleStartCall();
  };

  const handlePreviewScript = () => {
    // Mock preview action
    console.log("Preview script clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Paradigm Outreach</span>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Campaigns</a>
                <a href="#" className="text-foreground font-medium">AI Calls</a>
                <a href="#" className="hover:text-foreground transition-colors">Analytics</a>
                <a href="#" className="hover:text-foreground transition-colors">Settings</a>
              </nav>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Outbound AI Call Campaign
              </h1>
              <p className="text-muted-foreground">
                Configure and launch AI-powered sales calls that represent your business
              </p>
            </div>
            <StatusBadge status={isReady ? "ready" : "draft"} />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
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

          {/* Right Column */}
          <div className="space-y-6">
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
    </div>
  );
};

export default Index;
