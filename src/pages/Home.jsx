import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { extractExcelData } from '../utils/extractExcelText';

/**
 * Home – the Excel upload page.
 */
export default function Home({ onDataExtracted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = async (file) => {
    setLoading(true);
    setError('');

    try {
      const sheets = await extractExcelData(file);

      if (!sheets || sheets.length === 0 || sheets.every((s) => s.rows.length === 0)) {
        setError('The Excel file appears to be empty or contains no data.');
        setLoading(false);
        return;
      }

      onDataExtracted(sheets);
      navigate('/viewer');
    } catch (err) {
      console.error('Excel processing error:', err);
      setError(
        err.message?.includes('Invalid')
          ? 'This file does not appear to be a valid Excel file.'
          : 'An error occurred while processing the file. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-medium mb-5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
          Frontend Only • No Data Stored
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-surface-50 via-primary-200 to-primary-400 bg-clip-text text-transparent">
          German Excel Reader
        </h1>

        <p className="mt-3 text-surface-400 max-w-md mx-auto text-sm leading-relaxed">
          Upload an Excel file to view its contents as a table.
          German cells get a speaker button for text-to-speech.
        </p>
      </div>

      {/* Upload card */}
      <UploadBox onFileSelect={handleFileSelect} loading={loading} />

      {/* Error message */}
      {error && (
        <div className="mt-6 max-w-lg w-full mx-auto px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-16 text-center text-xs text-surface-600 space-y-1">
        <p>Supports: .xlsx, .xls, .csv • German text detection via character & word analysis</p>
        <p>Powered by SheetJS & Web Speech API</p>
      </div>
    </div>
  );
}
