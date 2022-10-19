/**
 * TODO:
 *  - enumの定数化
 *  - 変数が全部 var 宣言
 */


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
function main() {
    const distinationSheet = SpreadsheetApp.openById("1o417W6XPp1q9s8A1IORjysuCFkX_84iF2pDt-nKyvS4").getSheetByName('内訳入力用紙');

    clearList(distinationSheet);
    Logger.log('-> list cleared.');

    const soukatsuedUke = uke2soukatsu(DriveApp.getFileById("1vpIcI8yJtUOnytQwjw-Ab3OsPd6lgqy6"));
    Logger.log("-> convertion completed.");

    extractList(distinationSheet, soukatsuedUke);
    Logger.log("-> extraction completed.");
}

function uke2soukatsu(file) {
    Logger.log('-> start read UKE content.');
    const parser     = new UKEParser();
    const soukatsuer = new Soukatsuer();
    const lines      = file.getBlob().getDataAsString('cp932').split("\n");

    Logger.log('-> start parsing UKE.');
    const uke = parser.parseLines(lines);
    Logger.log('-> finish parsing UKE.');

    return soukatsuer.soukatsu(uke);
}

function clearList(worksheet) {
    worksheet.getRange("$3:$200").clearContent();
}

function extractList(worksheet, soukatsuedUke) {

    const startingCell = worksheet.getRange("$A$3");
    worksheet.getRange(
        startingCell.getRow(), startingCell.getColumn(), soukatsuedUke.length, soukatsuedUke[0].length
    ).setValues(soukatsuedUke);
}


function doGet(_e) {
    const file            = DriveApp.getFileById("1vpIcI8yJtUOnytQwjw-Ab3OsPd6lgqy6");
    const template        = HtmlService.createTemplateFromFile("index");
    template.ukeName      = file.getName();
    template.soukatsuedUke = null;

    return template.evaluate();
}

function doPost(_e){
    const file             = DriveApp.getFileById("1vpIcI8yJtUOnytQwjw-Ab3OsPd6lgqy6");
    const template         = HtmlService.createTemplateFromFile("index");
    template.ukeName       = file.getName();
    template.soukatsuedUke = uke2soukatsu(file)

    return template.evaluate();
}
