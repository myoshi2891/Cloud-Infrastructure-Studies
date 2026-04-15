import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section2Page from '../../../../app/gcl/cloud-digital-leader/section2/page';

describe('Section 2 Page (Cloud Digital Leader)', () => {
    it('renders all 13 sections', () => {
        render(<Section2Page />);
        expect(screen.getAllByText(/出題範囲/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データの価値/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データの種類/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/ライフサイクル/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データストレージ/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データベースサービス/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データ分析・BI/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/データパイプライン/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/スマートアナリティクス/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/ガバナンス/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/ユースケース/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/総まとめ/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/リソース/i).length).toBeGreaterThan(0);
    });

    it('renders deep dives properly', () => {
        render(<Section2Page />);
        expect(screen.getAllByText('データの価値 (The Value of Data)').length).toBeGreaterThan(0);
        expect(screen.getAllByText('データの種類と価値創造のアプローチ').length).toBeGreaterThan(0);
        expect(screen.getAllByText('オブジェクトストレージの最適化：Cloud Storage').length).toBeGreaterThan(0);
        expect(screen.getAllByText('リレーショナルデータベースとNoSQLの戦略的活用').length).toBeGreaterThan(0);
        expect(screen.getAllByText('データの有用性とアクセシビリティの向上 / BigQueryとLooker').length).toBeGreaterThan(0);
        expect(screen.getAllByText('ストリーミング分析アーキテクチャ: Pub/Sub と Dataflow').length).toBeGreaterThan(0);
        expect(screen.getAllByText('データガバナンスとセキュリティの基盤').length).toBeGreaterThan(0);
        expect(screen.getAllByText('データからAIへのイノベーション基盤 (Data-to-AI Lifecycle)').length).toBeGreaterThan(0);
    });
});
