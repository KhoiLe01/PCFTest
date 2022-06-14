"use strict";
exports.__esModule = true;
function CollectData() {
    return new Promise(function (resolve) {
        var XLSX = require('xlsx');
        var parseExcel = function (filename) {
            var excelData = XLSX.readFile(filename);
            return Object.keys(excelData.Sheets).map(function (name) { return ({
                name: name,
                data: XLSX.utils.sheet_to_json(excelData.Sheets[name])
            }); });
        };
        var serverUS = [];
        var serverEU = [];
        var data = { "None": [""], "US": [], "EU": [] };
        var rawData = parseExcel("C:/Users/Khoi.Le/PCF/Testing/dropdownData/Project.xlsx")[0].data;
        rawData.forEach(function (element) {
            if (element.Server == "EU") {
                serverEU.push(element.Project);
            }
            else if (element.Server == "US") {
                serverUS.push(element.Project);
            }
        });
        data.US = serverUS;
        data.EU = serverEU;
        resolve(data);
    });
}
exports["default"] = CollectData;
var data = CollectData().then(function (resolve) { return resolve; });
// setTimeout(() => {console.log(data)}, 2000)
console.log(data);
