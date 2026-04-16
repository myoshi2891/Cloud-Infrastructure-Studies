import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { STRUCTURED_DATA_EXAMPLES, UNSTRUCTURED_DATA_EXAMPLES, DATA_FORMAT_COMPARISON } from '../../constants';

export const Section3: React.FC = () => {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2 className="sec-title">データの種類と特性</h2>
                </div>
            </div>
            <SectionCard id="cdl-2-3" idNumber="3" title="データの種類と特性">
                <h3 className="stitle">3.1 3 種類のデータ形式</h3>
                <p className="tdesc">データは形式によって 3 種類に分類されます。
                試験では「どのデータ形式にどのサービスが適切か」が問われます。</p>
                <pre className="code-block"><code className="language-text">{`世界中のデータの内訳（概算）:
  構造化データ:    約 10〜20%
  半構造化データ:  約 10〜15%
  非構造化データ:  約 70〜80%   ← 最も多い！`}</code></pre>

                <h3 className="stitle mt-6">3.2 構造化データ（Structured Data）</h3>
                <h4 className="stitle mt-4">定義と特徴</h4>
                <pre className="code-block"><code className="language-text">{`構造化データとは:

  - 行と列（表形式）で整理されたデータ
  - スキーマ（型定義）が明確に定まっている
  - SQL などで簡単に検索・集計できる
  - 全データの約 10〜20% を占める

特徴:
  ✅ 検索・集計・結合が簡単
  ✅ データ品質の管理がしやすい
  ❌ 非構造化データのような柔軟な表現は難しい`}</code></pre>

                <h4 className="stitle mt-4">構造化データの具体例</h4>
                <TableComponent
                    headers={['データ種別', '具体例', '格納先（GCP）']}
                    rows={STRUCTURED_DATA_EXAMPLES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td>{row.type}</td>
                            <td>{row.example}</td>
                            <td>{row.storage}</td>
                        </tr>
                    )}
                />

                <h3 className="stitle mt-6">3.3 非構造化データ（Unstructured Data）</h3>
                <h4 className="stitle mt-4">定義と特徴</h4>
                <DiagramSVG viewBox="0 0 600 200">
                    <rect x="10" y="10" width="580" height="180" rx="8" strokeWidth="2" stroke="var(--color-primary, currentColor)" fill="var(--color-background, transparent)" />
                    <text x="30" y="40" fill="currentColor" fontWeight="bold">非構造化データとは:</text>
                    <text x="40" y="65" fill="currentColor" fontSize="14">- 特定のフォーマット・スキーマがないデータ</text>
                    <text x="40" y="85" fill="currentColor" fontSize="14">- テキスト・画像・動画・音声などの形式</text>
                    <text x="40" y="105" fill="currentColor" fontSize="14">- 全データの約 70〜80% を占める大多数</text>
                    <text x="40" y="125" fill="currentColor" fontSize="14">- 従来は分析が困難 → AI/ML で活用が進む</text>
                    
                    <text x="30" y="155" fill="currentColor" fontWeight="bold">特徴:</text>
                    <text x="40" y="175" fill="currentColor" fontSize="14">✅ 豊富な情報を含む ❌ 直接 SQL で集計・検索できない ❌ AI/ML が必要</text>
                </DiagramSVG>

                <h4 className="stitle mt-4">非構造化データの具体例</h4>
                <TableComponent
                    headers={['データ種別', '具体例', '格納先（GCP）', '分析方法']}
                    rows={UNSTRUCTURED_DATA_EXAMPLES}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td>{row.type}</td>
                            <td>{row.example}</td>
                            <td>{row.storage}</td>
                            <td>{row.analysis}</td>
                        </tr>
                    )}
                />

                <h3 className="stitle mt-6">3.4 半構造化データ（Semi-Structured Data）</h3>
                <h4 className="stitle mt-4">定義と特徴</h4>
                <pre className="code-block"><code className="language-text">{`半構造化データとは:

  - 完全な表形式ではないが、一定の構造を持つデータ
  - JSON・XML・CSV・YAML などの形式
  - Web API のレスポンスや IoT センサーデータに多い

例（JSON 形式）:
  {
    "user_id": "U-12345",
    "name": "田中太郎",
    "purchases": [
      {"item": "シャツ", "price": 3000, "date": "2024-01-15"},
      {"item": "ズボン", "price": 5000, "date": "2024-01-20"}
    ],
    "tags": ["VIP", "リピーター"]
  }

特徴:
  ✅ JSON・XML など標準フォーマットで交換しやすい
  ✅ スキーマが柔軟（フィールドの追加・変更が容易）
  ✅ BigQuery や Firestore で直接扱える`}</code></pre>

                <h3 className="stitle mt-6">3.5 データ形式の比較まとめ</h3>
                <TableComponent
                    headers={['比較項目', '構造化', '半構造化', '非構造化']}
                    rows={DATA_FORMAT_COMPARISON}
                    renderRow={(row, i) => (
                        <tr key={i}>
                            <td><strong>{row.item}</strong></td>
                            <td>{row.structured}</td>
                            <td>{row.semiStructured}</td>
                            <td>{row.unstructured}</td>
                        </tr>
                    )}
                />

                <blockquote className="sec-quote">
                    <p className="tdesc">📎 <strong>参照</strong>:<br/>
                    <a href="https://cloud.google.com/learn/what-is-structured-data">https://cloud.google.com/learn/what-is-structured-data</a><br/>
                    <a href="https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data">https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data</a></p>
                </blockquote>
                <hr className="sec-hr" />
            </SectionCard>
            
            <SectionCard id="gcdl-2-3" idNumber="Deep Dive" title="データの種類と価値創造のアプローチ">
                <h3 className="stitle mt-6">データの種類と価値創造のアプローチ</h3>
                <p className="tdesc">企業がデータから新たな価値を創造するためには、主に3つのアプローチが存在する。一つ目は「現在のデータ（Current Data）」の活用である。既存のトランザクションデータや顧客行動履歴を深掘りすることで、業務の最適化やパーソナライゼーションを実現する。二つ目は「新しいデータ（New Data）」の収集である。これまで取得していなかったウェブサイトのクリックストリームや、製品に組み込まれたセンサーからのテレメトリデータを新たに収集し、未知の顧客ニーズや機器の故障予測モデルを構築する。三つ目は「外部データ（External Data）」の調達である。Google Cloud Public Datasetsなどを通じて公開されている気象データ、人口統計、市場トレンドなどの外部データセットを自社の内部データと結合することで、分析のコンテキストを劇的に拡張し、より精度の高い予測を可能にする。</p>
            </SectionCard>
        </div>
    );
};