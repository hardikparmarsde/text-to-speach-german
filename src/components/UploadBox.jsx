import { useState, useRef } from 'react';

// Accepted Excel MIME types
const EXCEL_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
];

const EXCEL_EXTENSIONS = ['.xlsx', '.xls', '.csv'];

/**
 * UploadBox – drag-and-drop or click-to-upload Excel component.
 */
export default function UploadBox({ onFileSelect, loading }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!EXCEL_TYPES.includes(file.type) && !EXCEL_EXTENSIONS.includes(ext)) {
      alert('Please upload an Excel file (.xlsx, .xls, or .csv).');
      return;
    }
    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div
      id="upload-box"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`
        relative cursor-pointer
        w-full max-w-lg mx-auto
        rounded-2xl border-2 border-dashed
        transition-all duration-300 ease-out
        ${dragOver
          ? 'border-primary-400 bg-primary-500/10 shadow-[0_0_40px_rgba(99,102,241,0.15)] scale-[1.02]'
          : 'border-surface-600/60 bg-surface-800/30 hover:border-primary-500/50 hover:bg-surface-800/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]'
        }
        backdrop-blur-xl
        p-10
        group
      `}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
        onChange={handleInputChange}
        className="hidden"
        id="excel-input"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          transition-all duration-300
          ${loading
            ? 'bg-primary-500/20 animate-pulse'
            : 'bg-surface-700/50 group-hover:bg-primary-600/20 group-hover:scale-110'
          }
        `}>
          {loading ? (
            <svg className="w-8 h-8 text-primary-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-surface-400 group-hover:text-primary-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          )}
        </div>

        {/* Text */}
        {loading ? (
          <>
            <p className="text-sm font-medium text-primary-300">Processing Excel…</p>
            <p className="text-xs text-surface-500">{fileName}</p>
          </>
        ) : (
          <>
            <div>
              <p className="text-base font-medium text-surface-200 group-hover:text-surface-50 transition-colors">
                {fileName ? 'Drop another file or click to replace' : 'Drop your Excel file here'}
              </p>
              <p className="text-sm text-surface-500 mt-1">
                or <span className="text-primary-400 underline underline-offset-2">browse files</span>
              </p>
            </div>
            {fileName && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-700/50 text-xs text-surface-300">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {fileName}
              </span>
            )}
            <p className="text-[11px] text-surface-600">.xlsx, .xls, .csv • Processed in-browser</p>
          </>
        )}
      </div>
    </div>
  );
}
