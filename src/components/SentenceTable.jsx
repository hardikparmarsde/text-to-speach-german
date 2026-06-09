import SpeakerButton from './SpeakerButton';

/**
 * ExcelTable – renders the full Excel sheet as a table.
 * Cells that contain German text get a speaker button beside them.
 */
export default function SentenceTable({ sheets }) {
  if (!sheets || sheets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-surface-400">
        <svg
          className="w-16 h-16 mb-4 opacity-40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-medium">No data found</p>
        <p className="text-sm mt-1 text-surface-500">
          The uploaded file appears to be empty.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sheets.map((sheet, sheetIdx) => (
        <div
          key={sheetIdx}
          className="w-full overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-900/40 backdrop-blur-xl shadow-2xl"
        >
          {/* Sheet tab */}
          {sheets.length > 1 && (
            <div className="px-5 py-3 border-b border-surface-800/60 bg-surface-900/60">
              <span className="text-xs font-medium text-primary-300 tracking-wide uppercase">
                📄 {sheet.sheetName}
              </span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left" id={`sheet-table-${sheetIdx}`}>
              {/* Header row */}
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-primary-900/60 via-primary-800/40 to-primary-900/60 backdrop-blur-md border-b border-primary-500/20">
                  {/* Row number column */}
                  <th className="px-4 py-3.5 text-[11px] font-semibold tracking-wider uppercase text-primary-300/70 w-12 text-center">
                    #
                  </th>
                  {sheet.headers.map((header, colIdx) => (
                    <th
                      key={colIdx}
                      className="px-4 py-3.5 text-[11px] font-semibold tracking-wider uppercase text-primary-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-surface-800/40">
                {sheet.rows.map((row, rowIdx) => {
                  // Check if entire row is a section header (bold-looking, like "German Dialogues")
                  const nonEmptyCells = row.filter((c) => c.length > 0);
                  const isSectionHeader =
                    nonEmptyCells.length <= 2 &&
                    nonEmptyCells.some(
                      (c) =>
                        c.includes('Dialogue') ||
                        c.includes('German') ||
                        c.includes('English') ||
                        /^\d+\./.test(c)
                    );

                  return (
                    <tr
                      key={rowIdx}
                      className={`group transition-colors duration-150 ${
                        isSectionHeader
                          ? 'bg-primary-500/8 border-t border-primary-500/15'
                          : 'hover:bg-surface-800/40'
                      }`}
                    >
                      {/* Row number */}
                      <td className="px-4 py-3 text-[11px] font-mono text-surface-600 text-center">
                        {rowIdx + 1}
                      </td>

                      {row.map((cell, colIdx) => {
                        // The third column (index 2) contains German text
                        const isGermanColumn = colIdx === 2 && cell.length > 0;

                        return (
                          <td
                            key={colIdx}
                            className={`px-4 py-3 text-sm leading-relaxed ${
                              isSectionHeader
                                ? 'font-semibold text-primary-200'
                                : isGermanColumn
                                  ? 'text-surface-100'
                                  : 'text-surface-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex-1 min-w-0">{cell}</span>
                              {isGermanColumn && (
                                <div className="flex-shrink-0">
                                  <SpeakerButton sentence={cell} />
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer stats */}
          <div className="px-5 py-3 border-t border-surface-800/60 bg-surface-900/60 flex items-center justify-between text-xs text-surface-500">
            <span>
              {sheet.rows.length} row{sheet.rows.length !== 1 ? 's' : ''} •{' '}
              {sheet.headers.length} column{sheet.headers.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
              🔊 German cells have speaker buttons
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
