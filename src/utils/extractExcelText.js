import * as XLSX from 'xlsx';

/**
 * Extract structured data from an Excel file.
 * Returns an array of objects: { sheetName, headers, rows }
 * Each row is an array of cell values (strings).
 * @param {File} file - The uploaded Excel file
 * @returns {Promise<{ sheetName: string, headers: string[], rows: string[][] }[]>}
 */
export async function extractExcelData(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheets = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    // Convert to array of arrays (raw rows)
    const rawRows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: '',
      blankrows: false,
    });

    if (rawRows.length === 0) continue;

    // Convert all cell values to strings
    const allRows = rawRows.map((row) =>
      row.map((cell) => String(cell ?? '').trim())
    );

    // Find the maximum column count
    const maxCols = Math.max(...allRows.map((r) => r.length));

    // Pad rows to uniform length
    const paddedRows = allRows.map((row) => {
      while (row.length < maxCols) row.push('');
      return row;
    });

    // Use first row as headers if it looks like a header row,
    // otherwise generate column letters (A, B, C…)
    const firstRow = paddedRows[0];
    const hasHeaders = firstRow.some((cell) => cell.length > 0);

    let headers;
    let dataRows;

    if (hasHeaders) {
      headers = firstRow.map((cell, i) =>
        cell || String.fromCharCode(65 + (i % 26))
      );
      dataRows = paddedRows.slice(1);
    } else {
      headers = Array.from({ length: maxCols }, (_, i) =>
        String.fromCharCode(65 + (i % 26))
      );
      dataRows = paddedRows;
    }

    sheets.push({ sheetName, headers, rows: dataRows });
  }

  return sheets;
}
