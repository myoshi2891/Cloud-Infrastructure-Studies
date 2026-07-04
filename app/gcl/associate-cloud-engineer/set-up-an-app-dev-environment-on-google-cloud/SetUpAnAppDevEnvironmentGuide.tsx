'use client';

import NavBar from './NavBar';

/**
 * Set Up an App Dev Environment on Google Cloud ガイドのクライアントコンポーネント。
 */
export default function SetUpAnAppDevEnvironmentGuide() {
    return (
        <div className="app-dev-environment-page">
            <div className="shell">
                <NavBar />
                <main>
                    <div className="wrap">
                        <section className="hero">
                            <h1>保存・権限・処理・通知</h1>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
