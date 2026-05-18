# megastsu

個人のブログ兼ポートフォリオとして作成している静的サイトです。  
研究・学習ノート、日々の記録、書評、技術メモなどを長期的に蓄積するために運用しています。

公開している理由は、サイトの構成やコードを誰かが参考にできるようにするためです。未公開または書きかけの記事も含まれる場合があります。

公開サイト: https://meganestudio.sakura.ne.jp/

## サイト構成

- `Profile`: 筆者のプロフィール、このサイトについて、連絡先、SNSリンク
- `Notes`: 研究・学習内容など、比較的整理されたノート
- `Journal`: 日々の活動、随想、趣味などの雑多な記録

## 技術スタック

- [Astro](https://astro.build/)
- Astro Content Collections
- Markdown / MDX
- TypeScript
- GitHub Actions
- rsync + SSH によるさくらのレンタルサーバへのデプロイ

Astroを採用している理由は、Markdown中心のコンテンツ管理と静的サイト生成の相性がよく、クライアント側のJavaScriptを最小限に抑えられるためです。

## ディレクトリ構成

```text
.
├── .github/workflows/deploy.yml    # CI/CD設定
├── public/                         # favicon、フォントなどの静的ファイル
├── src/
│   ├── assets/                     # OGP等で使用する画像
│   ├── components/                 # 共通コンポーネント
│   ├── content/
│   │   ├── notes/                  # Notesの記事
│   │   └── journal/                # Journalの記事
│   ├── layouts/                    # 記事レイアウト
│   ├── lib/                        # 記事一覧取得などの補助処理
│   ├── pages/                      # ルーティング
│   ├── styles/                     # グローバルCSS
│   ├── consts.ts                   # サイト名・説明文
│   └── content.config.ts           # Content Collectionsのスキーマ
├── astro.config.mjs
├── package.json
└── README.md
```

## ローカル開発

Node.js 20系を想定しています。

```bash
npm install
npm run dev
```

開発サーバー起動後、通常は以下で確認できます。

```text
http://localhost:4321/
```

## よく使うコマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用の静的ファイルを `dist/` に生成 |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run astro` | Astro CLIを実行 |

## 記事の追加

記事はAstro Content Collectionsで管理しています。

Notesの記事は以下に追加します。

```text
src/content/notes/
```

Journalの記事は以下に追加します。

```text
src/content/journal/
```

frontmatterの基本形は以下です。

```md
---
title: "記事タイトル"
description: "記事の説明"
date: 2026-02-25
draft: false
---

# 見出し

本文を書く。
```

frontmatterの項目は以下の通りです。

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `title` | 必須 | 記事タイトル |
| `date` | 必須 | 投稿日または記録日 |
| `description` | 任意 | 記事一覧やメタ情報に使う説明文 |
| `draft` | 任意 | `true` の場合は一覧・詳細ページに表示しない。省略時は `false` |

記事一覧は日付の新しい順に表示されます。

## 公開・非公開

公開する記事:

```md
draft: false
```

非公開にする記事:

```md
draft: true
```

`draft: true` の記事は、`notes` / `journal` の一覧と詳細ページ生成対象から除外されます。

## デプロイ

GitHub Actionsでビルドとデプロイを行います。

- `pull_request` to `master`: 依存関係のインストール、ビルド、`dist/index.html` の存在確認
- `push` to `master`: 上記に加えて、SSH + rsyncでさくらのレンタルサーバへデプロイ

デプロイには以下のGitHub Secretsを使用します。

| Secret | 用途 |
| --- | --- |
| `SAKURA_HOST` | デプロイ先ホスト |
| `SAKURA_USER` | SSHユーザー |
| `SAKURA_DEPLOY_DIR` | デプロイ先ディレクトリ |
| `SAKURA_SSH_PRIVATE_KEY` | デプロイ用SSH秘密鍵 |
| `SAKURA_KNOWN_HOSTS` | 接続先ホスト鍵 |

誤配備を防ぐため、デプロイ先には `.deploy-root` というマーカーファイルが必要です。rsync時にはこのファイルを削除しないよう除外しています。

## 運用方針

- コンテンツはMarkdown / MDXで管理する
- レイアウトや表示ロジックはAstroコンポーネント側に寄せる
- 記事の公開制御はfrontmatterの `draft` で行う
- 余計なクライアントサイド処理を増やさず、静的サイトとして軽く保つ
- `master` ブランチへの反映を本番公開の契機にする

## 今後の予定

- 記事のカテゴリ・タグ機能
- 記事検索
- 記事一覧のページング
- TypstまたはLaTeXを使った記事執筆への対応

## 注意点

- RSSフィードは `notes` / `journal` の公開記事を日付の新しい順にまとめて出力します。

## ライセンス

現時点では明示的なライセンスを設定していません。コードや構成を参考にすることは構いませんが、記事本文や画像などのコンテンツの扱いについては、必要に応じて事前に確認してください。
