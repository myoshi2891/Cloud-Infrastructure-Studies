import React from 'react';
import { SectionCard } from '../index';

export const Section3: React.FC = () => (
    <div id="s3" className="sgap">
        <div className="sec-head">
            <div className="sec-num sn3">03</div>
            <div className="sec-head-txt">
                <h2 className="sec-title">クラウドコンピューティングの基礎概念</h2>
                <p className="tdesc">NIST が定義するクラウドの 5 つの本質的特性</p>
            </div>
        </div>

        <SectionCard
            id="cdl-3"
            idNumber="3.1"
            title="クラウドコンピューティングの定義"
            description={
                <>
                    <strong>クラウドコンピューティング</strong>とは、インターネット（クラウド）を通じて、コンピューティングリソース（サーバー・ストレージ・データベース・ネットワーク・ソフトウェア・分析・インテリジェンス）を<strong>オンデマンドで提供するサービスモデル</strong>です。
                </>
            }
        >
            <div className="stitle">📌 ポイント：「クラウド」という名前の由来</div>
            <pre><code>{`昔のネットワーク図では、インターネットを
「雲（クラウド）☁️」の記号で表していました。
その「雲の向こう側」でコンピューティングを行うことから
「クラウドコンピューティング」と呼ばれます。`}</code></pre>

            <div className="stitle">3.2 NIST が定義するクラウドの 5 つの本質的特性</div>
            <p className="tdesc"><strong>NIST（米国国立標準技術研究所）</strong>が定めた、クラウドの必須要件です。試験では「これはクラウドの特性か？」を判断する問題が出ます。</p>

            <div className="stitle">特性 ① オンデマンド・セルフサービス（On-demand Self-service）</div>
            <pre><code>{`意味: 人間（ベンダー担当者）の介入なしに、
      必要な時に必要なリソースを自動的に調達できる。

具体例:
  - Google Cloud Console でボタンを押すだけで VM が起動
  - API 呼び出しで自動的にサーバーが増設される
  - クレジットカードがあれば今すぐ使い始められる

ビジネス価値: IT 部門への申請・承認待ち時間がゼロ`}</code></pre>

            <div className="stitle">特性 ② 幅広いネットワークアクセス（Broad Network Access）</div>
            <pre><code>{`意味: 標準的なネットワーク（インターネット）を通じて、
      様々なデバイスからアクセス可能。

具体例:
  - スマートフォン・タブレット・PC・どこからでもアクセス
  - 自宅・オフィス・カフェ・世界中どこでも同じ環境
  - 特殊なソフトウェアやプロトコル不要

ビジネス価値: 場所・端末に縛られない働き方の実現（リモートワーク対応）`}</code></pre>

            <div className="stitle">特性 ③ リソースのプーリング（Resource Pooling）</div>
            <pre><code>{`意味: 複数のユーザーが物理リソースを共有する
      マルチテナント型のモデル。ユーザーは
      物理的な場所を気にする必要がない。

具体例:
  - 世界中の顧客が Google のデータセンターを共有使用
  - 顧客ごとに仮想的に分離された環境を提供
  - 物理サーバーの場所はユーザーが指定できない
    （リージョンは選べる）

ビジネス価値: 規模の経済によるコスト削減`}</code></pre>

            <div className="stitle">特性 ④ 迅速な弾力性（Rapid Elasticity）</div>
            <pre><code>{`意味: 需要に応じて自動的にリソースを増減（スケール）できる。
      ユーザーからは「無限にリソースがある」ように見える。

具体例:
  - EC サイトがセール時に自動でサーバーを 10 倍に増設
  - 深夜の閑散時間にはサーバーを自動縮小
  - 需要に応じて数分以内にスケールアップ/ダウン

ビジネス価値: 急なアクセス増でもサービス停止なし
             かつ普段は無駄なコストをかけない`}</code></pre>

            <div className="stitle">特性 ⑤ 計測されたサービス（Measured Service）</div>
            <pre><code>{`意味: リソースの使用量を自動的に計測し、
      使った分だけ課金される従量制モデル。

具体例:
  - VM を 1 時間使えば 1 時間分だけ課金
  - ストレージを 100GB 使えば 100GB 分だけ課金
  - 使用量はリアルタイムで可視化・監視できる

ビジネス価値: 無駄なコストがなく、透明性の高い費用管理が可能`}</code></pre>

            <div className="stitle">✅ ベストプラクティス: 5 つの特性の活用</div>
            <pre><code>{`俊敏性の最大化:
  - プロトタイプは「まず小さく始める」
  - 本番移行前に低コストで実験・検証する
  - 失敗しても損失を最小化できる

弾力性の活用:
  - 自動スケーリングポリシーを設定する
  - 負荷テストで最大容量を事前に確認する
  - スケールダウンルールも忘れずに設定する

コスト透明性の確保:
  - ラベル（タグ）でリソースをチーム・プロジェクト別に分類
  - 予算アラートを必ず設定する
  - Cloud Billing レポートで定期的に使用量を確認する`}</code></pre>
            <p className="tdesc">📎 <strong>参照</strong>: NIST クラウドコンピューティングの定義<br />
            <a href="https://csrc.nist.gov/publications/detail/sp/800-145/final" target="_blank" rel="noreferrer">https://csrc.nist.gov/publications/detail/sp/800-145/final</a><br />
            <a href="https://cloud.google.com/learn/what-is-cloud-computing" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-cloud-computing</a></p>
        </SectionCard>
    </div>
);
