import { PhoneCall, PhoneIncoming, FileText, Loader2 } from "lucide-react";

type CallState = "idle" | "calling" | "completed";

interface CallActionsCardProps {
  callState: CallState;
  onStartCall: () => void;
  onCallMe: () => void;
  onPreviewScript: () => void;
}

export function CallActionsCard({
  callState,
  onStartCall,
  onCallMe,
  onPreviewScript,
}: CallActionsCardProps) {
  return (
    <div className="card-elevated">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <PhoneCall className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Call Actions</h2>
          <p className="helper-text">Launch or preview your AI call</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onStartCall}
          disabled={callState === "calling"}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {callState === "calling" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Calling…
            </>
          ) : (
            <>
              <PhoneCall className="w-4 h-4" />
              Start AI Call
            </>
          )}
        </button>

        <button
          onClick={onCallMe}
          disabled={callState === "calling"}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PhoneIncoming className="w-4 h-4" />
          Call Me Now
        </button>

        <button
          onClick={onPreviewScript}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-all"
        >
          <FileText className="w-4 h-4" />
          Preview AI Script
        </button>
      </div>

      <p className="helper-text mt-5 pt-5 border-t border-border">
        The AI uses the provided context to deliver a personalized sales pitch during the call.
      </p>
    </div>
  );
}
