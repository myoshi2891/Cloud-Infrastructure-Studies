---
name: test-coverage-progress-sync
description: Standardizes the workflow to sync test specifications, execution progress, dashboard reports, and next session prompts inside docs/TEST_COVERAGE_PROGRESS.md after test implementation. Triggered on: "テスト進捗の同期", "テストカバレッジ同期", "テストドキュメント更新", "テスト進捗更新".
---

# Test Coverage and Progress Synchronization Skill

This skill ensures that whenever you finish implementing or refactoring tests, you consistently update all related specifications, dashboards, progress sheets, and next-action prompts without omission.

## Prerequisites

Ensure you have successfully completed the test implementations and typechecks.
- All vitest and playwright tests must pass.
- Typecheck (`npx tsc --project tsconfig.json --noEmit`) must succeed with 0 errors.

## Workflow Steps

### Step 1: Re-generate the Coverage Dashboard HTML
Run the coverage dashboard generation script to sync the local test files scanning:
```bash
node scripts/generate-coverage-dashboard.mjs
```
Verify that the output shows the correct number of sources, covered files, and test files.

### Step 2: Extract the Latest Dashboard Data
Examine the newly generated `docs/coverage-dashboard.html` to extract the updated JSON statistics.
Locate the script tag with `id="dashboard-data"` (typically near the bottom of the HTML file):
```html
<script type="application/json" id="dashboard-data">
{
  "totals": { "sources": 177, "covered": 60, "testFiles": 65 },
  "domains": [...]
}
</script>
```

### Step 3: Update `docs/TEST_COVERAGE_PROGRESS.md`
Update the following sections in `docs/TEST_COVERAGE_PROGRESS.md` with the extracted data:

1. **Overall Summary (全体サマリー)**
   - Update `ソースファイル総数` (Total source files), `テストカバー済みソース数` (Covered source files), `全体カバレッジ達成率` (Overall coverage rate), and `テストファイル総数` (Total test files).
2. **Domain Coverage Matrix (ドメイン別カバレッジマトリクス)**
   - Update the coverage rate and matrix percentages for the domains that were changed.
   - If a domain's coverage rate reaches **80%** or higher, upgrade its indicator from `⚠️` to `✅` (Implemented) and bold the domain name.
3. **Integration & Category Analysis (テストカテゴリ別の網羅性と課題)**
   - Review and update current coverage rate details in the text for Unit, Integration, E2E, Smoke, and horizontal quality metrics.
4. **Next Actions Task List (優先度別ネクストアクション)**
   - Mark completed items as `[x]`.
   - Update task descriptions if necessary.
5. **Next Session Prompt (次回セッションでのテスト追加再開プロンプト)**
   - Adjust the target priorities under "4. 対象優先度".
   - Shift the starting recommendation at the end of the prompt (e.g. from P0 to P1) to reflect the next high-priority task.

### Step 4: Verify and Commit
1. Run `git diff` to verify the modifications inside `docs/TEST_COVERAGE_PROGRESS.md` and `docs/coverage-dashboard.html`.
2. Commit the changes:
   ```bash
   git add docs/TEST_COVERAGE_PROGRESS.md docs/coverage-dashboard.html
   git commit -m "docs: update test coverage dashboard and progress report for [Task/Priority] completion"
   ```
