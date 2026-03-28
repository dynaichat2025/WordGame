#!/bin/bash
# 커밋 메시지 기반 자동 버전업 + git tag + push
# Usage: ./scripts/version-bump.sh "Feat: 새 기능 추가"

set -e

MSG="$1"
if [ -z "$MSG" ]; then
  echo "Usage: $0 \"commit message\""
  exit 1
fi

# 최신 태그에서 현재 버전 가져오기
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
VERSION="${LATEST_TAG#v}"
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

# 커밋 메시지 접두사로 버전 결정
if echo "$MSG" | grep -qiE "^feat"; then
  MINOR=$((MINOR + 1))
  PATCH=0
else
  PATCH=$((PATCH + 1))
fi

NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"
NEW_TAG="v${NEW_VERSION}"

# package.json 업데이트
if command -v jq &>/dev/null; then
  tmp=$(mktemp)
  jq --arg v "$NEW_VERSION" '.version = $v' package.json > "$tmp" && mv "$tmp" package.json
else
  sed -i '' "s/\"version\": \".*\"/\"version\": \"${NEW_VERSION}\"/" package.json
fi

# 커밋 + 태그 + 푸시
git add package.json
git commit -m "${MSG}

version: ${NEW_TAG}
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

git tag -a "$NEW_TAG" -m "$MSG"
git push origin main --tags

echo ""
echo "✅ ${NEW_TAG} 배포 완료"
