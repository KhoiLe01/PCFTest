interface Element {
    Server: string;
    Project: string;
}
export interface DATA {
    "None": string[];
    "US": string[];
    "EU": string[];
}
export default async function CollectData(): Promise<DATA> {
    return new Promise((resolve) => {
        const XLSX = require('xlsx')
        const parseExcel = (filename: string) => {

            const excelData = XLSX.readFile(filename);

            return Object.keys(excelData.Sheets).map(name => ({
                name,
                data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
            }));
        };

        let serverUS: string[] = [];
        let serverEU: string[] = [];
        let data: DATA = {"None": [""], "US": [], "EU": []};
        const rawData = parseExcel("C:/Users/Khoi.Le/PCF/Testing/dropdownData/Project.xlsx")[0].data
        rawData.forEach((element: Element) => {
            if (element.Server == "EU") {
                serverEU.push(element.Project)
            }
            else if (element.Server == "US") {
                serverUS.push(element.Project)
            }
        });
        data.US = serverUS
        data.EU = serverEU
        resolve(data)
    })
}
CollectData().then((val) => console.log)
// export default async function CollectData() {}