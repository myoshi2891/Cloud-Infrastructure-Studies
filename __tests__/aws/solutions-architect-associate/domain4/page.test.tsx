// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Domain4Guide } from '@/app/aws/solutions-architect-associate/domain4/Domain4Guide';
import { DIAGRAMS } from '@/app/aws/solutions-architect-associate/domain4/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS SAA Domain 4 Guide Page', () => {
    it('renders header, title and main task statements correctly', () => {
        render(<Domain4Guide />);

        expect(screen.getAllByText(/マルチアカウント請求/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Athena や QuickSight \(Amazon Quick Suite\) と連携し/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: 適切なスケーリング方式の判断\(水平 vs 垂直\)/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: コスト効率の良いデータベースタイプの判断\(時系列・列指向\)/i)).toBeInTheDocument();
        expect(screen.getByText(/VPCエンドポイントによるコスト削減/i)).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /Task 4.1: コスト最適化ストレージソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.2: コスト最適化コンピューティングソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.3: コスト最適化データベースソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.4: コスト最適化ネットワークアーキテクチャの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /参考文献/i })).toBeInTheDocument();
    });

    it('contains exactly 29 valid mermaid diagrams in constants', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(29);
    });

    it('renders the expected top-level heading structure', () => {
        const { container } = render(<Domain4Guide />);
        const main = container.querySelector('main.content');
        expect(main).not.toBeNull();

        const h2Ids = Array.from(main!.querySelectorAll('h2')).map((heading) => heading.id);
        expect(h2Ids).toEqual([
            'intro',
            'common-tools',
            'task-4-1',
            'task-4-2',
            'task-4-3',
            'task-4-4',
            'references',
        ]);

        expect(main!.querySelectorAll('h3').length).toBeGreaterThanOrEqual(15);
    });

    it('renders tables correctly with expected headers and row cells', () => {
        const { container } = render(<Domain4Guide />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(10);

        tables.forEach((table) => {
            const ths = table.querySelectorAll('thead th');
            expect(ths.length).toBeGreaterThan(0);
            const trs = table.querySelectorAll('tbody tr');
            expect(trs.length).toBeGreaterThan(0);
        });

        const tableContents = Array.from(tables).map((table) => table.textContent ?? '');
        expect(
            tableContents.some((content) =>
                content.includes('AWS Organizations 連結請求(マルチアカウント請求)')
            )
        ).toBe(true);
        expect(tableContents.some((content) => content.includes('S3 Standard'))).toBe(true);
        expect(tableContents.some((content) => content.includes('Intelligent-Tiering'))).toBe(true);
        expect(tableContents.some((content) => content.includes('Savings Plans'))).toBe(true);
    });

    it('renders all 29 figure IDs and supplementary-skill text correctly', () => {
        render(<Domain4Guide />);
        const diagramElements = screen.getAllByTestId('mermaid');
        expect(diagramElements.length).toBe(29);

        const renderedCharts = diagramElements.map((el) => el.textContent);
        const diagramIds = Object.keys(DIAGRAMS);
        expect(diagramIds.length).toBe(29);

        diagramIds.forEach((id) => {
            expect(DIAGRAMS[id]).toBeDefined();
            expect(typeof DIAGRAMS[id]).toBe('string');
            expect(renderedCharts).toContain(DIAGRAMS[id]);
        });

        expect(screen.getByText(/スキル: 適切なスケーリング方式の判断\(水平 vs 垂直\)/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: コスト効率の良いデータベースタイプの判断\(時系列・列指向\)/i)).toBeInTheDocument();
    });

    it('renders source and reference links with correct href attributes', () => {
        const { container } = render(<Domain4Guide />);
        const references = container.querySelector('#references + .ref-grid');
        expect(references).toBeInTheDocument();

        const expectedReferences = [
            ['AWS Cost Explorer とは', 'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html'],
            ['AWS Budgets を使用したコスト管理', 'https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html'],
            ['AWS Cost and Usage Report とは', 'https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html'],
            ['コスト配分タグの使用', 'https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html'],
            ['AWS Organizations の連結請求', 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_consolidated-billing.html'],
            ['AWS Trusted Advisor', 'https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html'],
            ['AWS Compute Optimizer とは', 'https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is.html'],
            ['AWS Well-Architected Framework - コスト最適化の柱', 'https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html'],
            ['Amazon S3 とは', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html'],
            ['Amazon S3 ストレージクラス', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html'],
            ['S3 オブジェクトライフサイクル管理', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html'],
            ['Requester Pays バケットの使用', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html'],
            ['Amazon EBS ボリュームタイプ', 'https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html'],
            ['Amazon EFS とは', 'https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html'],
            ['Amazon FSx', 'https://aws.amazon.com/fsx/'],
            ['AWS DataSync とは', 'https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html'],
            ['AWS Transfer Family とは', 'https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html'],
            ['AWS Storage Gateway とは', 'https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html'],
            ['AWS Snow Family', 'https://aws.amazon.com/snow/'],
            ['AWS Backup とは', 'https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html'],
            ['S3 Glacier Vault Lock', 'https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html'],
            ['Amazon EC2 インスタンス購入オプション', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html'],
            ['Spotインスタンスの使用', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html'],
            ['Savings Plans とは', 'https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html'],
            ['リザーブドインスタンス', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html'],
            ['Amazon EC2 インスタンスタイプ', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html'],
            ['Amazon EC2 Auto Scaling とは', 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html'],
            ['EC2 インスタンスの休止(Hibernate)', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html'],
            ['AWS Lambda とは', 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html'],
            ['AWS Fargate とは', 'https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html'],
            ['AWS Batch とは', 'https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html'],
            ['Elastic Load Balancing とは', 'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elastic-load-balancing.html'],
            ['Application Load Balancer', 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html'],
            ['Network Load Balancer', 'https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html'],
            ['Gateway Load Balancer', 'https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html'],
            ['AWS Outposts とは', 'https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html'],
            ['AWS Local Zones とは', 'https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html'],
            ['AWS Wavelength とは', 'https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html'],
            ['Amazon RDS とは', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html'],
            ['Amazon Aurora の概要', 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html'],
            ['Amazon DynamoDB とは', 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html'],
            ['DynamoDB の読み込み/書き込みキャパシティモード', 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html'],
            ['Amazon RDS Proxy', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html'],
            ['Amazon RDS の読み取りレプリカの使用', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html'],
            ['Amazon ElastiCache とは', 'https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html'],
            ['DynamoDB Accelerator (DAX)', 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html'],
            ['Amazon RDS の自動バックアップの使用', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html'],
            ['AWS Database Migration Service とは', 'https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html'],
            ['AWS Schema Conversion Tool', 'https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html'],
            ['NATゲートウェイ', 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html'],
            ['AWS Direct Connect とは', 'https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html'],
            ['AWS Site-to-Site VPN', 'https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html'],
            ['AWS Transit Gateway とは', 'https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html'],
            ['VPCピアリングとは', 'https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html'],
            ['VPCエンドポイント', 'https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html'],
            ['Amazon EC2 オンデマンド料金(データ転送)', 'https://aws.amazon.com/ec2/pricing/on-demand/'],
            ['AWSの料金の仕組み: データ転送', 'https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/data-transfer.html'],
            ['Amazon CloudFront とは', 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html'],
            ['AWS Global Accelerator とは', 'https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html'],
            ['Amazon API Gateway でのリクエストスロットリング', 'https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html'],
            ['AWS Certified Solutions Architect - Associate (SAA-C03) Exam Guide', 'https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html'],
            ['Content Domain 4: Design Cost-Optimized Architectures', 'https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html'],
        ] as const;

        for (const [name, href] of expectedReferences) {
            const link = references!.querySelector<HTMLAnchorElement>(`a[href="${href}"]`);
            expect(link, name).not.toBeNull();
            expect(link!.closest('li'), name).toHaveTextContent(name);
        }
    });
});
