# テンプレート使用ガイド

このディレクトリはCloudflare Workersプロジェクトのテンプレートです。

## 🚀 新規プロジェクトの作成方法

### 1. テンプレートをコピー

```bash
# /workspaces/ ディレクトリで実行
cp -r template your-project-name
cd your-project-name
```

### 2. プロジェクト固有の設定を変更

#### `wrangler.toml`

```toml
# プロジェクト名を変更
name = "your-project-name"

# ポートは自動割り当て（変更不要）
[dev]
port = 0
```

#### `package.json`

```json
{
  "name": "your-project-name",
  ...
}
```

### 3. 依存関係をインストール

```bash
npm install
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

Wranglerが自動的に空いているポートを割り当てて起動します。
起動時のログでポート番号が表示されます:

```
[wrangler:inf] Ready on http://localhost:xxxxx
```

### 5. Gitリポジトリを初期化（オプション）

```bash
git init
git add .
git commit -m "Initial commit from template"
git remote add origin <your-repo-url>
git push -u origin main
```

## 📁 推奨ディレクトリ構造

```
/workspaces/
├── template/              ← このテンプレート（変更しない）
├── project-1/             ← テンプレートからコピー
├── project-2/             ← テンプレートからコピー
└── project-3/             ← テンプレートからコピー
```

## 💡 複数プロジェクトの同時開発

各プロジェクトは独立しているため、複数のターミナルで同時に起動可能:

```bash
# ターミナル1
cd /workspaces/project-1
npm run dev  # 自動的にポート割り当て

# ターミナル2
cd /workspaces/project-2
npm run dev  # 別のポートが自動割り当て
```

## 🔧 主要コマンド

```bash
# 開発サーバー起動（ポート自動割り当て）
npm run dev

# 本番環境にデプロイ
npm run deploy

# ログの確認
npm run tail
```

## ⚠️ 注意事項

- テンプレートディレクトリ自体は変更しないでください
- 各プロジェクトは独立した`node_modules/`を持ちます
- ポートは自動割り当てなので、起動時のログで確認してください
- プロジェクト名は必ず変更してください（Cloudflare Workers名が重複します）

## 📝 チェックリスト

新規プロジェクト作成時:

- [ ] テンプレートをコピー
- [ ] `wrangler.toml`の`name`を変更
- [ ] `package.json`の`name`を変更
- [ ] `npm install`を実行
- [ ] `npm run dev`で動作確認
- [ ] README.mdをプロジェクト固有の内容に更新
