/**
 * TODO:
 *  - enumの定数化
 *  - 変数が全部 var 宣言
 */


function main() {
    /*
     * - ?? open index.html and give uke files(kokuho and shaho)
      * - press submit button and start this script
      * - verify given files are really uke files
      * - start parse uke files
      * - clone a new workbook file from the template workbook file
      *  - ?? rename the cloned workbook seikyuYm and Hosptal name
      *  - open result.html and show url of cloned workbook
      * 
      *  - if some error raised, rollback process (delete cloned workbook file)
      * 
     */
    const distinationSheet = SpreadsheetApp.openById("1o417W6XPp1q9s8A1IORjysuCFkX_84iF2pDt-nKyvS4").getSheetByName('内訳入力用紙');

    clearList(distinationSheet);

    Logger.log('-> list cleared.');

    const file = DriveApp.getFileById("1vpIcI8yJtUOnytQwjw-Ab3OsPd6lgqy6");

    Logger.log(file.getName());

    const sokatsuedUke = uke2sokatsu(file);

    Logger.log("-> convertion completed.");

    extractList(distinationSheet, sokatsuedUke);

    Logger.log("-> extraction completed.");
}

function uke2sokatsu(file) {
    Logger.log('-> start read UKE content.');

    const parser    = new UKEParser();
    const sokatsuer = new Sokatsuer();
    const lines     = file.getBlob().getDataAsString('cp932').split("\n");

    Logger.log('-> start parsing UKE.');

    const uke = parser.parseLines(lines);

    Logger.log('-> finish parsing UKE.');

    return sokatsuer.sokatsu(uke);
}

function clearList(worksheet) {
    worksheet.getRange("$3:$200").clearContent();
}

function extractList(worksheet, sokatsuedUke) {

    const startingCell = worksheet.getRange("$A$3");
    worksheet.getRange(
        startingCell.getRow(), startingCell.getColumn(), sokatsuedUke.length, sokatsuedUke[0].length
    ).setValues(sokatsuedUke);
}


function doGet() {
    return HtmlService.createTemplateFromFile("index").evaluate();
}

function doPost(e){
    const name = e.parameters.ukeFilePath.toString();
    Logger.log(name);
    return name;
}
