import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Domain4Page from '../../../../app/gcl/associate-cloud-engineer/domain4/page';

describe('ACE Domain 4 Page', () => {
    it('renders the page title and hero section correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText('アクセスとセキュリティの構成')).toBeDefined();
        expect(screen.getByText(/試験比重: 約20%/i)).toBeDefined();
    });

    it('renders Chapter 1 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText(/Chapter 1: セキュリティの基本概念と設計原則/)).toBeDefined();
        expect(screen.getByText(/最小特権の原則（Principle of Least Privilege）/)).toBeDefined();
    });

    it('renders Chapter 2 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText(/Chapter 2: IAM の基本アーキテクチャ/)).toBeDefined();
        expect(screen.getByText(/IAM ポリシー = 主体 \+ ロール \+ リソース の組み合わせ/)).toBeDefined();
    });

    it('renders Chapter 3 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText('Chapter 3: ロールの 3 種類：基本 / 事前定義 / カスタム')).toBeDefined();
        expect(screen.getByText('roles/storage.objectAdmin')).toBeDefined();
    });

    it('renders Chapter 4 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText('Chapter 4: IAM ポリシーの設定と管理')).toBeDefined();
        expect(screen.getByText('Policy Recommender（IAM 推奨事項）')).toBeDefined();
    });

    it('renders Chapter 5 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText(/条件付きロールバインディング（IAM Conditions）/)).toBeDefined();
        expect(screen.getByText(/特定の状況でのみ権限を有効にする/)).toBeDefined();
        expect(screen.getAllByText(/request\.time\.getHours/)[0]).toBeDefined();
    });

    it('renders Chapter 6 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText(/サービスアカウントの基本概念と種類/)).toBeDefined();
        expect(screen.getByText(/人間のアカウント vs サービスアカウント/)).toBeDefined();
        expect(screen.getAllByText(/権限の重要性/)[0]).toBeDefined();
    });

    it('renders Chapter 7 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText(/サービスアカウントキーのリスクと代替手法/)).toBeDefined();
        expect(screen.getByText(/SA JSON キーの使用はセキュリティ上の重大なアンチパターン/)).toBeDefined();
        expect(screen.getByText(/gcloud auth application-default login/)).toBeDefined();
    });

    it('renders Chapter 8 content correctly', () => {
        render(<Domain4Page />);
        expect(screen.getAllByText(/Workload Identity Federation/)[0]).toBeDefined();
        expect(screen.getAllByText(/Google Cloud API にアクセスするための仕組みです/)[0]).toBeDefined();
        expect(screen.getAllByText(/GitHub Actions との Workload Identity Federation 設定/)[0]).toBeDefined();
    });
});
