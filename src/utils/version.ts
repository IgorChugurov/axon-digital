// Версионирование приложения
export const APP_VERSION = {
  // Эта строка будет автоматически заменяться при деплое
  commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'dev-local',
  timestamp: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
  branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || 'local',
  
  // Версия для отображения
  get displayVersion() {
    return `${this.commit.slice(0, 7)} (${this.branch})`;
  },
  
  // Полная информация о версии
  get fullInfo() {
    return {
      commit: this.commit,
      short: this.commit.slice(0, 7),
      branch: this.branch,
      timestamp: this.timestamp,
      displayVersion: this.displayVersion
    };
  }
};

// Логирование версии при импорте
console.log('🚀 Application Version:', APP_VERSION.displayVersion);
console.log('📅 Build Time:', APP_VERSION.timestamp);
console.log('🌿 Branch:', APP_VERSION.branch);
