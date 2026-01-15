import { Building2 } from "lucide-react";

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
  return (
    <div className="card-elevated">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Business Context</h2>
          <p className="helper-text">Define how the AI represents your company</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Corporation"
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            What does your company do?
          </label>
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="We provide enterprise software solutions for..."
            rows={3}
            className="input-field w-full resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sales pitch / talking points
          </label>
          <textarea
            value={salesPitch}
            onChange={(e) => setSalesPitch(e.target.value)}
            placeholder="Key benefits, unique selling points, call-to-action..."
            rows={5}
            className="input-field w-full resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Conversation Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="input-field w-full cursor-pointer"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="sales">Sales-focused</option>
            <option value="casual">Casual</option>
          </select>
        </div>
      </div>

      <p className="helper-text mt-5 pt-5 border-t border-border">
        This context is used to generate a realistic AI sales conversation that represents your business.
      </p>
    </div>
  );
}
