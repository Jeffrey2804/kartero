
export const downloadReportService = {
    convertArrayOfObjectsToCSV,
    downloadCSV,
};

function convertArrayOfObjectsToCSV(array, columns) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    let keys = "";
    let keyCtr = 0;

    while (keyCtr < Object.keys(columns).length) {
        if (columns[keyCtr].omit == false) {

            keys += columns[keyCtr].name + columnDelimiter;
        }
        keyCtr++;
    }

    result = '';
    result += keys.slice(0, -1) + lineDelimiter;
    array.forEach(item => {
        let ctr = 0;
        columns.forEach(key => {

            if (ctr >= 0 && key.omit == false && key.id !== 'fullName' && key.id !== 'downloadId') {
                result += item[key.id];
                result += columnDelimiter;
            }

            if (ctr >= 0 && key.omit === false && key.id === 'fullName' && key.id !== 'downloadId') {

                result += item["firstName"] + " " + item["lastName"];
                result += columnDelimiter;
            }
            ctr++;
        });
        result = result.slice(0, -1);
        result += lineDelimiter;
    });
    return result;
}

function downloadCSV(array, columns, fileName) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array, columns);
    if (csv == null) return;

    const filename = fileName + '.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}