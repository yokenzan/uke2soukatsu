const fs = require('fs');
const path = require('path');
const os = require('os');
const iconv = require('iconv-lite');
const { createObjectCsvWriter } = require('csv-writer');

// 既存のクラスをrequire（依存関係の順序が重要）
require('./hospital.js');
require('./patient.js');
require('./hoken.js');
require('./receipt.js');
require('./uke.js');
require('./parser.js');
require('./soukatsu.js');

function main() {
    console.log('UKE to Soukatsu Converter (Node.js version)');
    
    // コマンドライン引数からUKEファイルパスを取得
    let ukeFilePath = process.argv[2];
    if (!ukeFilePath) {
        console.error('Usage: node main-node.js <uke-file-path> [output-file-path]');
        process.exit(1);
    }
    
    // チルダ（~）をホームディレクトリに展開
    if (ukeFilePath.startsWith('~/')) {
        ukeFilePath = path.join(os.homedir(), ukeFilePath.slice(2));
    }
    
    // ファイルの存在確認
    if (!fs.existsSync(ukeFilePath)) {
        console.error(`Error: File not found: ${ukeFilePath}`);
        process.exit(1);
    }
    
    // 出力ファイルパス（デフォルトは soukatsu-result.csv）
    const outputFilePath = process.argv[3] || 'soukatsu-result.csv';
    
    try {
        console.log('-> start read UKE content.');
        
        // UKEファイルを読み込み（CP932エンコーディング）
        const fileBuffer = fs.readFileSync(ukeFilePath);
        const fileContent = iconv.decode(fileBuffer, 'cp932');
        const lines = fileContent.split('\n');
        
        console.log('-> start parsing UKE.');
        const parser = new UKEParser();
        const uke = parser.parseLines(lines);
        console.log('-> finish parsing UKE.');
        
        console.log('-> parsed UKE info:');
        console.log(`    -> ${uke.hospital.code} ${uke.hospital.name}`);
        console.log(`    -> ${uke.seikyuuNengetsu}`);
        console.log(`    -> ${{1: '基金', 2: '国保'}[uke.shinsaShiharaiKikan]}`);
        
        console.log('-> start conversion to soukatsu format.');
        const soukatsuer = new Soukatsuer();
        const soukatsuedUke = soukatsuer.soukatsu(uke);
        console.log('-> conversion completed.');
        
        // CSV形式で出力
        console.log('-> start writing CSV file.');
        writeToCsv(soukatsuedUke, uke, outputFilePath);
        console.log('-> CSV file created successfully.');
        
        console.log('-> 完了！🎉');
        console.log(`-> 出力ファイル: ${path.resolve(outputFilePath)}`);
        
    } catch (error) {
        console.error('Error occurred:', error.message);
        process.exit(1);
    }
}

function writeToCsv(soukatsuedUke, uke, outputFilePath) {
    // ヘッダー情報を含むメタデータ
    const metadata = [
        ['請求年月', uke.seikyuuNengetsu],
        ['医療機関名称', uke.hospital.name],
        ['医療機関コード', uke.hospital.code],
        [''], // 空行
        // ここにヘッダー行を追加可能
    ];
    
    // CSVの内容を構築
    const csvContent = [
        ...metadata.map(row => row.join(',')),
        '', // 空行
        // 総括データ
        ...soukatsuedUke.map(row => row.join(','))
    ].join('\n');
    
    // ファイルに書き込み（UTF-8 BOM付きでExcel対応）
    const csvWithBom = '\uFEFF' + csvContent;
    fs.writeFileSync(outputFilePath, csvWithBom, 'utf8');
}

// Excel出力用の関数（オプション）
function writeToExcel(soukatsuedUke, uke, outputFilePath) {
    const XLSX = require('xlsx');
    
    const wb = XLSX.utils.book_new();
    
    // メタデータシート
    const metaData = [
        ['請求年月', uke.seikyuuNengetsu],
        ['医療機関名称', uke.hospital.name],
        ['医療機関コード', uke.hospital.code]
    ];
    const metaSheet = XLSX.utils.aoa_to_sheet(metaData);
    XLSX.utils.book_append_sheet(wb, metaSheet, 'メタデータ');
    
    // 総括データシート
    const soukatsuSheet = XLSX.utils.aoa_to_sheet(soukatsuedUke);
    XLSX.utils.book_append_sheet(wb, soukatsuSheet, '内訳入力用紙');
    
    XLSX.writeFile(wb, outputFilePath);
}

// スクリプトが直接実行された場合のみmain関数を呼び出し
if (require.main === module) {
    main();
}

module.exports = { main, writeToCsv, writeToExcel };