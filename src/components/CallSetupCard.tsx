import { Phone } from "lucide-react";

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
    <div className="card-elevated">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Call Setup</h2>
          <p className="helper-text">Configure the outbound call settings</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone number to call
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="input-field w-full"
            disabled={callMyNumber}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={callMyNumber}
            onClick={() => setCallMyNumber(!callMyNumber)}
            className={`relative w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
              callMyNumber
                ? "bg-primary border-primary"
                : "border-muted-foreground hover:border-foreground"
            }`}
          >
            {callMyNumber && (
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <label
            onClick={() => setCallMyNumber(!callMyNumber)}
            className="text-sm text-foreground cursor-pointer select-none"
          >
            Call my number instead (demo mode)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Call Type
          </label>
          <select
            value={callType}
            onChange={(e) => setCallType(e.target.value)}
            className="input-field w-full cursor-pointer"
          >
            <option value="outbound">Outbound Call</option>
            <option value="inbound-demo">Inbound Demo</option>
          </select>
        </div>
      </div>

      <p className="helper-text mt-5 pt-5 border-t border-border">
        The AI will place the call using an AI-managed phone number and speak on behalf of your business.
      </p>
    </div>
  );
}
