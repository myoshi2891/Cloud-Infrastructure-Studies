// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import CcnaNetworkFundamentalsGuide from '@/app/cisco/ccna/network-fundamentals-guide/CcnaNetworkFundamentalsGuide';
import Page, { metadata } from '@/app/cisco/ccna/network-fundamentals-guide/page';

describe('CcnaNetworkFundamentalsGuide Page & Component', () => {
  it('renders page metadata correctly', () => {
    expect(metadata.title).toBe(
      'Cisco CCNA試験対策：ネットワークの基礎 入門ガイド'
    );
    expect(metadata.description).toBe(
      'Cisco CCNA（200-301）認定試験の「ネットワークの基礎」領域を、OSI参照モデル、TCP/IP、IPv4/IPv6、機器の動作などの完全図解と詳細表でわかりやすく解説します。'
    );
  });

  it('renders the page component', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders all 10 chapters and reference headers accurately', () => {
    const { container } = render(<CcnaNetworkFundamentalsGuide />);

    expect(container.querySelectorAll('a[aria-current="location"]')).toHaveLength(1);

    expect(screen.getByRole('heading', { level: 1, name: /Cisco CCNA試験対策：.*ネットワークの基礎 入門ガイド/i })).toBeInTheDocument();

    const expectedChapters = [
      '第1章CCNA認定試験とは',
      '第2章ネットワークとは何か（基礎概念）',
      '第3章OSI参照モデルとTCP/IPモデル',
      '第4章ネットワーク機器の基礎',
      '第5章イーサネットと物理層／データリンク層',
      '第6章IPv4アドレッシングの基礎',
      '第7章IPv6の基礎',
      '第8章TCP/UDPとポート番号',
      '第9章学習の進め方（ロードマップ）',
      '第10章2026年の重要な最新情報：CCNA 200-301 V2.0への移行',
      '参考文献・出典',
    ];

    expectedChapters.forEach((chapterText) => {
      expect(screen.getByRole('heading', { name: new RegExp(chapterText.replace(/[（）/]/g, '.*'), 'i') })).toBeInTheDocument();
    });
  });

  it('renders key tables and detailed content across all chapters without omission', () => {
    render(<CcnaNetworkFundamentalsGuide />);

    // Section 1 details
    expect(screen.getByText(/200-301（Implementing and Administering Cisco Solutions）/i)).toBeInTheDocument();
    expect(screen.getByText(/取得後3年間（出典①）/i)).toBeInTheDocument();
    expect(screen.getByText(/ネットワークの基礎（Network Fundamentals）/i)).toBeInTheDocument();
    expect(screen.getByText(/自動化とプログラマビリティ（Automation and Programmability）/i)).toBeInTheDocument();

    // Section 2 details
    expect(screen.getByText(/Local Area Network/i)).toBeInTheDocument();
    expect(screen.getAllByText(/スター型トポロジー/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/メッシュ型トポロジー/i).length).toBeGreaterThan(0);

    // Section 3 details
    expect(screen.getAllByText(/アプリケーション層/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/物理層/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/データ → セグメント → パケット → フレーム → ビット/i)).toBeInTheDocument();

    // Section 4 details
    expect(screen.getByText(/受信した信号を全ポートへそのまま流す/i)).toBeInTheDocument();
    expect(screen.getByText(/MACアドレスを学習し、必要なポートのみへフレームを転送/i)).toBeInTheDocument();
    expect(screen.getByText(/IPアドレスに基づき経路を選択/i)).toBeInTheDocument();

    // Section 5 details
    expect(screen.getByText(/シングルモード（SMF）/i)).toBeInTheDocument();
    expect(screen.getByText(/00:1A:2B:3C:4D:5E/i)).toBeInTheDocument();
    expect(screen.getAllByText(/CSMA\/CD/i).length).toBeGreaterThan(0);

    // Section 6 details
    expect(screen.getByText(/192.168.1.10/i)).toBeInTheDocument();
    expect(screen.getByText(/255.255.255.252/i)).toBeInTheDocument();
    expect(screen.getByText(/10.0.0.0 〜 10.255.255.255/i)).toBeInTheDocument();

    // Section 7 details
    expect(screen.getByText(/2001:0db8:0000:0000:0000:ff00:0042:8329/i)).toBeInTheDocument();
    expect(screen.getByText(/リンクローカルアドレス（fe80::\/10）/i)).toBeInTheDocument();

    // Section 8 details
    expect(screen.getAllByText(/3ウェイハンドシェイク/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/コネクション型（事前に接続確立）/i)).toBeInTheDocument();
    expect(screen.getByText(/暗号化されたリモート接続/i)).toBeInTheDocument();

    // Section 10 details
    expect(screen.getAllByText(/2026年5月20日/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CCNA 200-301 V2.0への移行/i).length).toBeGreaterThan(0);

    // References
    expect(screen.getByText(/Cisco公式 CCNA認定ページ（日本語）/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/www.cisco.com\/go\/certroadmap/i)).toBeInTheDocument();
  });

  it('renders all 10 Mermaid diagrams with proper aria labels', () => {
    render(<CcnaNetworkFundamentalsGuide />);

    const expectedLabels = [
      '図1-1：CCNA 200-301 出題ドメイン別の配点比率',
      '図1-2：CCNA認定取得までの8ステップ',
      '図2-1：スター型トポロジーとメッシュ型トポロジーの比較',
      '図3-1：OSI参照モデル 7層の構造',
      '図3-2：カプセル化のプロセスとPDU名称の変化',
      '図4-1：スイッチとルーターの転送判断ロジックの違い',
      '図6-1：192.168.1.0/24 を /26 で4分割するサブネッティング例',
      '図8-1：TCPの3ウェイハンドシェイク',
      '図9-1：ネットワークの基礎からCCNA受験までの学習ロードマップ',
      '図10-1：CCNA 200-301 V1.1からV2.0への移行タイムライン',
    ];
    const diagrams = screen.getAllByRole('img');

    expect(diagrams).toHaveLength(10);
    expect(diagrams.map((diagram) => diagram.getAttribute('aria-label'))).toEqual(expectedLabels);
  });

  it('renders all nine source URLs as keyboard-accessible links', () => {
    const { container } = render(<CcnaNetworkFundamentalsGuide />);
    const sourceLinks = container.querySelectorAll('.source-list a.src-url');

    expect(sourceLinks).toHaveLength(9);
    sourceLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', link.textContent);
    });
  });
});
