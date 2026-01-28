/**
 * Cloudflare Workers エントリーポイント
 *
 * このファイルはWorkerのメインロジックを定義します。
 * R2、KV、D1などのバインディングを使用する場合は、
 * Env interfaceに型定義を追加してください。
 */

/**
 * 環境変数とバインディングの型定義
 */
export interface Env {
    // 環境変数
    ENVIRONMENT: string;

    // R2バケット（wrangler.tomlで設定後にコメント解除）
    // MY_BUCKET: R2Bucket;

    // KVネームスペース（wrangler.tomlで設定後にコメント解除）
    // MY_KV: KVNamespace;

    // D1データベース（wrangler.tomlで設定後にコメント解除）
    // MY_DB: D1Database;
}

/**
 * Workerのエクスポートオブジェクト
 */
export default {
    /**
     * HTTPリクエストを処理するfetchハンドラー
     */
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);

        // ルーティング例
        switch (url.pathname) {
            case "/":
                return new Response("Hello from Cloudflare Workers! 🚀", {
                    headers: { "Content-Type": "text/plain; charset=utf-8" },
                });

            case "/api/health":
                return Response.json({
                    status: "ok",
                    environment: env.ENVIRONMENT,
                    timestamp: new Date().toISOString(),
                });

            // R2を使用する例（バインディング設定後に有効化）
            // case "/api/upload":
            //   if (request.method === "POST") {
            //     const body = await request.text();
            //     await env.MY_BUCKET.put("uploaded-file.txt", body);
            //     return Response.json({ success: true });
            //   }
            //   return new Response("Method not allowed", { status: 405 });

            default:
                return new Response("Not Found", { status: 404 });
        }
    },
};
