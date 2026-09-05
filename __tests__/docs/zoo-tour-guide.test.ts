import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const guide = readFileSync('Challenge-Lab/Zoo-tour-guide-mcp-adk-challenge-lab-guide.md', 'utf8');

/**
 * ガイド内の開始見出し `heading` から終了見出し `nextHeading` までの本文を返す。
 * 両引数はそれぞれ抽出範囲の開始・終了を表す見出しの正規表現文字列である。
 */
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
        const orderedSteps = [
            "cat <<'EOF' > requirements.txt",
            'google-adk>=1.17.0,<2.0.0',
            'python --version',
            "python -c 'import sys; sys.exit",
            'python -m venv ../zoo_guide_venv',
            'source ../zoo_guide_venv/bin/activate',
            'pip install --no-cache-dir -r requirements.txt',
            'python -c "from importlib.metadata import version; print(version(\'google-adk\'))"',
            'adk web',
        ];

        let previousIndex = -1;
        for (const step of orderedSteps) {
            const currentIndex = localVerification.indexOf(step);
            expect(currentIndex, `missing local setup step: ${step}`).toBeGreaterThan(-1);
            expect(currentIndex, `local setup step is out of order: ${step}`).toBeGreaterThan(
                previousIndex
            );
            previousIndex = currentIndex;
        }
        expect(localVerification).toContain('sys.version_info < (3, 10)');
        expect(localVerification).toContain(
            'sys.exit("Python 3.10以上が必要です。処理を中止します。")'
        );
    });

    it('documents exact session creation and streaming POST requests in section 7.4', () => {
        const deploymentVerification = section('### 7\\.4 ', '### 7\\.5 ');
        const requestCode = [...deploymentVerification.matchAll(/```bash\n([\s\S]*?)\n```/g)]
            .map((match) => match[1] ?? '')
            .find((block) => block.includes('/run_sse')) ?? '';
        const curlBlocks = requestCode
            .slice(requestCode.indexOf('curl '))
            .split(/\n\n(?=curl )/);
        const sessionCreation = curlBlocks.find((block) => block.includes('/sessions')) ?? '';
        const runSse = curlBlocks.find((block) => block.includes('/run_sse')) ?? '';

        expect(deploymentVerification).not.toContain('Token Streamingを有効化');
        expect(deploymentVerification).toContain('SESSION_ID="verification-$(date +%s)"');
        expect(sessionCreation).toContain('-X POST');
        expect(sessionCreation).toContain(
            '"$AGENT_BASE_URL/apps/zoo_guide_agent/users/verification-user/sessions"'
        );
        expect(sessionCreation).toContain('"session_id": "$SESSION_ID"');
        expect(sessionCreation).toContain('"state": {}');

        expect(runSse).toContain('-X POST');
        expect(runSse).toContain('"$AGENT_BASE_URL/run_sse"');
        expect(runSse).toContain('"app_name": "zoo_guide_agent"');
        expect(runSse).toContain('"user_id": "verification-user"');
        expect(runSse).toContain('"session_id": "$SESSION_ID"');
        expect(runSse).toContain('"new_message": {');
        expect(runSse).toContain('"role": "user"');
        expect(runSse).toContain('"parts": [{"text":');
        expect(runSse).toContain('"streaming": true');
        expect(deploymentVerification).toContain('MCPツール呼び出し');
        expect(deploymentVerification).toContain('Google Search呼び出し');
    });
});
