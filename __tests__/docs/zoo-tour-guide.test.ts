import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const guide = readFileSync('Zoo-tour-guide-mcp-adk-challenge-lab-guide.md', 'utf8');

const section = (heading: string, nextHeading: string) => {
    const match = guide.match(new RegExp(`${heading}([\\s\\S]*?)${nextHeading}`));
    expect(match, `missing guide section: ${heading}`).not.toBeNull();
    return match?.[1] ?? '';
};

describe('Zoo tour guide deployment instructions', () => {
    it('uses the supported google-adk range in both framework constraint entries', () => {
        const frameworkRow = guide
            .split('\n')
            .find((line) => line.includes('フレームワークの制約を事前に把握する'));
        const troubleshootingRow = guide
            .split('\n')
            .find((line) => line.startsWith('| `400 INVALID_ARGUMENT'));

        expect(frameworkRow).toContain('google-adk>=1.17.0,<2.0.0');
        expect(frameworkRow).toContain('Gemini 2.x');
        expect(frameworkRow).toContain('bypass_multi_tools_limit=True');
        expect(troubleshootingRow).toContain('google-adk>=1.17.0,<2.0.0');
        expect(troubleshootingRow).toContain('Gemini 2.x');
        expect(troubleshootingRow).toContain('bypass_multi_tools_limit=True');
    });

    it('documents every executable local setup step in section 7.2', () => {
        const localVerification = section('### 7\\.2 ', '### 7\\.3 ');

        expect(localVerification).toContain("cat <<'EOF' > requirements.txt");
        expect(localVerification).toContain('google-adk>=1.17.0,<2.0.0');
        expect(localVerification).toContain('python --version');
        expect(localVerification).toContain('sys.version_info < (3, 10)');
        expect(localVerification).toContain('sys.exit("Python 3.10以上が必要です。処理を中止します。")');
        expect(localVerification).toContain('python -m venv ../zoo_guide_venv');
        expect(localVerification).toContain('pip install --no-cache-dir -r requirements.txt');
        expect(localVerification).toContain(
            'python -c "from importlib.metadata import version; print(version(\'google-adk\'))"'
        );
    });

    it('documents exact session creation and streaming POST requests in section 7.4', () => {
        const deploymentVerification = section('### 7\\.4 ', '### 7\\.5 ');

        expect(deploymentVerification).not.toContain('Token Streamingを有効化');
        expect(deploymentVerification).toContain('SESSION_ID="verification-$(date +%s)"');
        expect(deploymentVerification).toContain('-X POST');
        expect(deploymentVerification).toContain(
            '"$AGENT_BASE_URL/apps/zoo_guide_agent/users/verification-user/sessions"'
        );
        expect(deploymentVerification).toContain('"session_id": "$SESSION_ID"');
        expect(deploymentVerification).toContain('"state": {}');
        expect(deploymentVerification).toContain('"$AGENT_BASE_URL/run_sse"');
        expect(deploymentVerification).toContain('"app_name": "zoo_guide_agent"');
        expect(deploymentVerification).toContain('"user_id": "verification-user"');
        expect(deploymentVerification).toContain('"streaming": true');
        expect(deploymentVerification).toContain('MCPツール呼び出し');
        expect(deploymentVerification).toContain('Google Search呼び出し');
    });
});
