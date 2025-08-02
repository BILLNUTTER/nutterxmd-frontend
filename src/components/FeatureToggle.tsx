import React from 'react';

interface FeatureToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon: React.ReactNode;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({
  label,
  description,
  enabled,
  onChange,
  icon
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="text-blue-400 mt-1">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
            <p className="text-gray-300 text-sm">{description}</p>
          </div>
        </div>

        <button
          onClick={() => onChange(!enabled)}
          aria-pressed={enabled}
          title={enabled ? 'Disable' : 'Enable'}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${enabled ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
            }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      </div>
    </div>
  );
};

export default FeatureToggle;
