# UKE2Soukatsu

RECEIPTC.UKEファイルから総括表形式への変換ツール

## 実行環境

### Google Apps Script (GAS) 版
Google Sheets上で直接実行する従来版

### Node.js版
コマンドラインで実行するローカル版

## Node.js版 セットアップと実行手順

### 前提条件
- Node.js (v14以上推奨)
- npm

### セットアップ

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd uke2soukatsu
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

### 実行方法

#### 基本的な使い方
```bash
# UKEファイルを指定して実行
npm start <UKEファイルのパス> [出力ファイルパス]

# 例：
npm start ~/Downloads/RECEIPTC.UKE
npm start ~/Downloads/RECEIPTC.UKE result.csv
```

#### 詳細なコマンド
```bash
# 直接node.jsで実行
node src/main-node.js <UKEファイルのパス> [出力ファイルパス]
```

### 出力形式
- **デフォルト**: CSV形式（soukatsu-result.csv）
- **Excel対応**: UTF-8 BOM付きCSVでExcelでも正しく表示
- **メタデータ含む**: 請求年月、医療機関名称、医療機関コードを含む

### 使用例
```bash
# 基本実行
npm start "~/winhome/Downloads/31402006_病院_【匿名化】社保 RECEIPTC.UKE"

# 出力ファイル名を指定
npm start "./data/sample.uke" "./output/result.csv"

# Excel形式で出力（拡張子を.xlsxに）
npm start "./data/sample.uke" "./output/result.xlsx"
```

### 対応機能
- ✅ CP932エンコーディング対応
- ✅ チルダ（~）パス展開
- ✅ ファイル存在チェック
- ✅ CSV/Excel出力
- ✅ メタデータ出力

### エラー対処
```bash
# ファイルが見つからない場合
Error: File not found: /path/to/file

# 依存関係が不足している場合  
npm install

# 権限エラーの場合
chmod +r <UKEファイルのパス>
```

## 開発用TODO

- [ ] enumの定数化
- [ ] 変数が全部 var 問題
- [ ] open index.html and give uke files(kokuho and shaho)
- [ ] press submit button and start this script
- [ ] verify given files are really uke files when start parse uke files
- [ ] clone a new workbook file from the template workbook file
  - [ ] rename the cloned workbook seikyuYm and Hosptal name
  - [ ] open result.html and show url of cloned workbook
  - [ ] if some error raised, rollback process (delete cloned workbook file)
