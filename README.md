# Sanbo-Sillok FrontEnd React

## 프로젝트 시작하기

1. 해당 프로젝트 `fork`
2. `npm i` (husky 및 커밋 템플릿 자동 설정; 윈도우의 경우 Git Bash 사용 권장)

## IOS 스플래시 이미지 업데이트하기

[무료 생성 사이트 - progressier](https://progressier.com/pwa-icons-and-ios-splash-screen-generator)

1. 위 사이트에 `public/images/산업보안마크_512_512_스플래시.png`를 넣음 (크기 변경 없이)
2. 생성 완료된 전체 zip 압축을 해제하여 `pulic`에 넣음 (원래 있던 splash_screens는 삭제; 기존 형식 참고) - 단, 디렉토리 이름은 바꾸면 안됨
3. zip에 포함 되어있던 `readme.md`의 `<link>` 태그들 전체를 복사해서 `src/components/common/IOSMetaTag.tsx`에 붙여넣기(기존 내용은 제거)
4. `<link>` 태그를 아래와 같이 변경 (끝 부분을 `self-closing` 방식으로 변경해야 함)

```diff
- <link rel="apple-touch-startup-image" media="..." href="...">
+ <link rel="apple-touch-startup-image" media="..." href="..." />
```

5. `IOSMetaTag.tsx` 파일은 `.prettierignore` 되어있기 때문에 들여쓰기 등을 직접 해야 함 (들여쓰기 적용 및 한 줄로 작성되었는지 확인)
