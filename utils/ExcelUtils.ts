import ExcelJs from 'exceljs';

class ExcelUtils {
    private workbook: ExcelJs.Workbook;

    constructor() {
        this.workbook = new ExcelJs.Workbook();
    }

    async readExcel(filePath: string): Promise<void> {
        try {
            this.workbook = new ExcelJs.Workbook();
            await this.workbook.xlsx.readFile(filePath);
        } catch (error) {
            console.error(`Error reading Excel file: ${error}`);
            throw error;
        }
    }

    getSheet(sheetName: string): ExcelJs.Worksheet | undefined {
        const sheet = this.workbook.getWorksheet(sheetName);
        if (!sheet) {
            console.error(`Sheet "${sheetName}" not found`);
            return undefined;
        }
        return sheet;
    }

    getRow(sheetName: string, rowNumber: number): ExcelJs.Row | undefined {
        const sheet = this.getSheet(sheetName);
        if (!sheet) return undefined;
        
        const row = sheet.getRow(rowNumber);
        if (!row) {
            console.error(`Row ${rowNumber} not found in sheet "${sheetName}"`);
            return undefined;
        }
        return row;
    }

    getColumn(sheetName: string, columnName: string): ExcelJs.Column | undefined {
        const sheet = this.getSheet(sheetName);
        if (!sheet) return undefined;
        
        const column = sheet.getColumn(columnName);
        if (!column) {
            console.error(`Column "${columnName}" not found in sheet "${sheetName}"`);
            return undefined;
        }
        return column;
    }

    getColumnData(sheetName: string, columnName: string): any {
        const cols = this.getColumn(sheetName, columnName);
        return cols?.values;
    }

    getCell(sheetName: string, row: number, columnName: string): ExcelJs.Cell | undefined {
        const sheet = this.getSheet(sheetName);
        if (!sheet) return undefined;
        
        try {
            return sheet.getCell(row, columnName);
        } catch (error) {
            console.error(`Error getting cell at row ${row}, column ${columnName}: ${error}`);
            return undefined;
        }
    }

    getCellData(sheetName: string, row: number, columnName: string): any {
        const cell = this.getCell(sheetName, row, columnName);
        return cell?.value;
    }
}

export { ExcelUtils };

