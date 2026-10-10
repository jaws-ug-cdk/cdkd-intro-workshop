<!-- TODO: ワークショップのタイトル・説明文に置き換える -->
# cdkd Intro Workshop

cdkd を初めて学ぶ人向けのワークショップリポジトリです。

## Codespaces

ワークショップの参加者は、このリポジトリから GitHub Codespaces を開いて進めます。
起動時に [.devcontainer/](.devcontainer/) の設定で Node.js と AWS CLI が用意され、[code/](code/) の依存もインストールされます。
ワークショップの本文は GitHub Pages で読むため、Codespaces には hugo や Nix は入れていません。

## Developer Guide

このワークショップは [hugo](http://gohugo.io) で markdown を静的 HTML サイトとしてビルドします。
執筆者の開発環境は [Nix](https://nixos.org/) で再現します（参加者は使いません）。

```bash
# 未導入なら Nix をインストール
$ curl -sSfL https://artifacts.nixos.org/nix-installer | sh -s -- install

# 開発環境に入る
$ nix develop
```

> [!NOTE]
> Nix を使わない場合は、以下の手順で hugo をインストールします。
>
> ```bash
> brew install hugo
> ```

ワークショップの内容は [workshop/](workshop/) ディレクトリにあります。
ローカル開発サーバは次のように起動します。

```bash
$ hugo server -D --source workshop
$ open http://localhost:1313/
```

## Deploy

`main` への push で [GitHub Actions](.github/workflows/gh-pages.yml) が GitHub Pages へ公開します。

## License Summary

This project is released under the MIT License. See the [LICENSE](./LICENSE) file.
リポジトリの構成は [aws-cdk-coding-beginner-workshop](https://github.com/jaws-ug-cdk/aws-cdk-coding-beginner-workshop) を基にしています。
同梱テーマ [hugo-theme-learn](https://github.com/matcornic/hugo-theme-learn) は MIT ライセンス（`workshop/themes/learn/LICENSE.md`）です。
