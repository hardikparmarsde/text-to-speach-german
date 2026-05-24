import { useNavigate } from 'react-router-dom';
import SentenceTable from '../components/SentenceTable';

/**
 * Viewer – displays the full Excel table with German TTS buttons.
 */
export default function Viewer({ sheets }) {
  const navigate = useNavigate();

  // If no data (e.g. user navigated directly), show empty state
  if (!sheets || sheets.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <svg
            className="w-20 h-20 mx-auto text-surface-600 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.2}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-surface-300 mb-2">No File Loaded</h2>
          <p className="text-surface-500 text-sm mb-8">Upload an Excel file first to view its contents.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go to Upload
          </button>
        </div>
      </div>
    );
  }

  // Count total rows across all sheets
  const totalRows = sheets.reduce((sum, s) => sum + s.rows.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-surface-950/70 border-b border-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-surface-400 hover:text-surface-200 transition-colors text-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <span className="text-surface-700">|</span>
            <h1 className="text-sm font-semibold text-surface-200 tracking-tight">
              Excel Viewer
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-surface-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {totalRows} rows • {sheets.length} sheet{sheets.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg bg-surface-800/60 hover:bg-surface-700/60 text-surface-300 text-xs font-medium transition-all border border-surface-700/50 hover:border-surface-600/50 cursor-pointer"
            >
              Upload New
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <SentenceTable sheets={sheets} />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-surface-600 border-t border-surface-800/30">
        Data is stored temporarily in browser memory only • Click 🔊 to hear German text
      </footer>
    </div>
  );
}
