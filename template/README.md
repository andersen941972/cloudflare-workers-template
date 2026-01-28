# Cloudflare Workers Development Template

DevPod + Antigravity Server対応のCloudflare Workers開発テンプレートです。

> **📌 このリポジトリはテンプレートです**  
> 新規プロジェクト作成方法は [TEMPLATE_USAGE.md](TEMPLATE_USAGE.md) をご覧ください。

## 🖥️ 開発環境

- **リモート接続**: DevPod経由のSSH接続
- **開発サーバー**: Antigravity Server (v1.15.8)
- **OS**: Debian Linux (x86_64)
- **ユーザー**: node
- **作業ディレクトリ**: `/workspaces/`

## 🎯 テンプレートの特徴

- ✅ **ポート自動割り当て**: 複数プロジェクトの同時開発が可能
- ✅ **独立した依存関係**: プロジェクトごとに異なるバージョンを使用可能
- ✅ **DevPod最適化**: Codespaces専用設定を削除し、DevPod環境に最適化

## 🚀 クイックスタート

### このテンプレートから新規プロジェクトを作成

```bash
# 1. テンプレートをコピー
cp -r /workspaces/template /workspaces/your-project-name

# 2. プロジェクトディレクトリに移動
cd /workspaces/your-project-name

# 3. プロジェクト名を変更（wrangler.toml と package.json）
# name = "your-project-name"

# 4. 依存関係をインストール
npm install

# 5. 開発サーバー起動（ポート自動割り当て）
npm run dev
```

詳細は [TEMPLATE_USAGE.md](TEMPLATE_USAGE.md) をご覧ください。

## 📁 プロジェクト構造

```
├── .devcontainer/
│   ├── devcontainer.json   # Dev Container設定
│   └── Dockerfile          # 開発環境イメージ
├── src/
│   └── index.ts            # Workerエントリーポイント
├── wrangler.toml           # Cloudflare Workers設定
├── package.json
├── TEMPLATE_USAGE.md       # テンプレート使用ガイド
└── README.md
```

## ⚙️ Cloudflare R2連携

### 1. R2バケットの作成

```bash
wrangler r2 bucket create my-bucket
```

### 2. wrangler.toml にバインディングを追加

```toml
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
```

### 3. Workerコードでの使用

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // ファイルをアップロード
    await env.MY_BUCKET.put("example.txt", "Hello, R2!");
    
    // ファイルを取得
    const object = await env.MY_BUCKET.get("example.txt");
    
    return new Response(object?.body);
  }
}
```

## 🛠️ 開発コマンド

```bash
# ローカル開発サーバー起動（ポート自動割り当て）
npm run dev

# 本番環境にデプロイ
npm run deploy

# ログの確認
npm run tail

# R2バケット一覧
wrangler r2 bucket list
```

## 🔧 開発環境の詳細

### Antigravity Server

- **サーバーパス**: `/home/node/.antigravity-server/`
- **ログファイル**: `/home/node/.antigravity-server/.7a8657542180fb8440c8dcc20d83285fe11360ed.log`
- **リモートポート**: 36631

### ポート設定

- **Wrangler開発サーバー**: 自動割り当て（port = 0）
- 起動時のログでポート番号が表示されます
- 複数プロジェクトの同時起動が可能

## 💡 Tips

- **SSH接続**: DevPod CLI経由で自動的に接続されます
- **ポート転送**: 必要なポートは自動的にフォワーディングされます
- **リモート開発**: すべてのコマンドはリモート環境(Debian)で実行されます
- **複数プロジェクト**: 各プロジェクトは独立した依存関係を持ちます

## 📚 参考リンク

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 ドキュメント](https://developers.cloudflare.com/r2/)
- [DevPod ドキュメント](https://devpod.sh/docs/getting-started/install)
- [Antigravity Server について](https://developers.google.com/antigravity)
