function main() {
    /*
     * 展開先のスプシURL : https://docs.google.com/spreadsheets/d/1o417W6XPp1q9s8A1IORjysuCFkX_84iF2pDt-nKyvS4/edit#gid=94428257
     */

    const distinationBook  = SpreadsheetApp.openById("1o417W6XPp1q9s8A1IORjysuCFkX_84iF2pDt-nKyvS4");
    const distinationSheet = distinationBook.getSheetByName('内訳入力用紙');

    /* スプシのレセプト内訳をクリアする */

    clearList(distinationSheet);
    Logger.log('-> list cleared.');

    /* UKEを読み込む */

    // 👉👉👉👉👉👉👉ここの二重引用符のなかを希望のUKEファイルのものに書き換える👈👈👈👈👈👈👈
    const fileIdOfTargetUke = "1m8zinMHdvR0a_8nOXdonNxMxOTCDp6o_";

    Logger.log('-> start read UKE content.');
    const parser = new UKEParser();
    const lines  = DriveApp.getFileById(fileIdOfTargetUke).getBlob().getDataAsString('cp932').split("\n");

    Logger.log('-> start parsing UKE.');
    const uke = parser.parseLines(lines);
    Logger.log('-> finish parsing UKE.');

    Logger.log('-> parsed UKE info:');
    Logger.log(`    -> ${uke.hospital.code} ${uke.hospital.name}`);
    Logger.log(`    -> ${uke.seikyuuNengetsu}`);
    Logger.log(`    -> ${{'1': '基金', '2': '国保'}[uke.shinsaShiharaiKikan]}`);


    /* 読み込んだUKEを総括表内訳に変換(ただの二次元配列) */

    const soukatsuer    = new Soukatsuer();
    const soukatsuedUke = soukatsuer.soukatsu(uke);
    Logger.log('-> convertion completed.');

    /*
     * 内訳をスプシに展開
     */

    extractList(distinationSheet, soukatsuedUke);
    distinationBook.getRangeByName('請求年月').setValue(uke.seikyuuNengetsu);
    distinationBook.getRangeByName('医療機関名称').setValue(uke.hospital.name);
    distinationBook.getRangeByName('医療機関コード').setValue(uke.hospital.code);

    Logger.log('-> extraction completed.');

    Logger.log('-> 完了！🎉');
    Logger.log('-> スプシURLはこちら : https://docs.google.com/spreadsheets/d/1o417W6XPp1q9s8A1IORjysuCFkX_84iF2pDt-nKyvS4/edit#gid=94428257');
}

function clearList(worksheet) {
    worksheet.getRange("$3:$1500").clearContent();
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
