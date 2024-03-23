import { execSync } from 'child_process';

try {
  execSync('git config commit.template .gitmessage.txt');
  console.log('✅ 커밋 템플릿 설정 완료');

  execSync('husky');
  console.log('✅ Husky 설정 완료');
} catch (error) {
  console.error('❌ 설정 중 오류 발생:', error);
}
