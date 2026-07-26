import { X, Info, User, Cloud, MessageSquare } from "lucide-react";
import { appInfo } from "../../data/appInfo";

export default function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-300/50 dark:border-white/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            About
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Version */}
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Version
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {appInfo.version}
              </p>
            </div>
          </div>

          {/* Developer */}
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Developer
              </p>
              <p className="text-sm text-slate-900 dark:text-white">
                {appInfo.developer.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {appInfo.developer.role}
              </p>
            </div>
          </div>

          {/* API used */}
          <div className="flex items-start gap-3">
            <Cloud className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                APIs Used
              </p>
              <div className="flex flex-col gap-1">
                {appInfo.apiUsed.map((api) => (
                  <div key={api.name}>
                    <p className="text-sm text-slate-900 dark:text-white">
                      {api.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {api.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="flex items-start gap-3">
            <MessageSquare className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Feedback
              </p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${appInfo.feedbackEmail}&su=${encodeURIComponent("Feedback on your Weather App")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-500 dark:text-amber-400 hover:underline"
              >
                {appInfo.feedbackEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
