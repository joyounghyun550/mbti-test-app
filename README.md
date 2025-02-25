# MBTI 테스트 웹사이트

![Image](https://github.com/user-attachments/assets/d7b5609d-6915-42ca-958d-610fbe035e60)

## 소개

MBTI 테스트 웹사이트는 사용자가 자신의 MBTI 성향을 테스트하고, 결과를 공유할 수 있는 플랫폼입니다. 또한, 회원가입 및 로그인 기능을 통해 프로필을 관리할 수 있으며, 테스트 결과의 공개 및 비공개 설정이 가능합니다.

## 주요 기능

### 1. 사용자 인증

- **회원가입**: 이메일 및 비밀번호를 입력하여 계정을 생성할 수 있습니다.
- **로그인**: 가입한 이메일과 비밀번호를 사용하여 로그인할 수 있습니다.
- **프로필 수정**: 닉네임, 프로필 사진 등을 변경할 수 있습니다.

### 2. MBTI 테스트

- **테스트 시작**: 사용자가 MBTI 테스트를 진행할 수 있습니다.
- **결과 확인**: 테스트 완료 후 MBTI 유형을 확인할 수 있습니다.
- **결과 저장**: 자신의 테스트 결과를 저장하여 나중에 확인할 수 있습니다.

### 3. 테스트 공유 및 공개 설정

- **테스트 결과 공유**: SNS 또는 링크를 통해 자신의 MBTI 결과를 공유할 수 있습니다.
- **공개 및 비공개 설정**: 테스트 결과를 다른 사용자에게 공개할지 여부를 설정할 수 있습니다.
- **결과 목록 확인**: 공개된 사용자들의 테스트 결과를 볼 수 있습니다.

## 기술 스택

- **Frontend**: React, Zustand, tailwind
- **Backend**: Glitch (서버 및 데이터 관리)
- **State Management**: Zustand
- **API 요청**: Axios

## 설치 및 실행 방법

### 1. 레포지토리 클론

```sh
git clone https://github.com/joyounghyun550/mbti-test-app.git
cd mbti-test-app
```

### 2. 패키지 설치

```sh
yarn
```

### 3. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 다음 값을 설정합니다.

```env
VITE_AUTH_SERVER_URL = "당신의 서버 URL"
VITE_TEST_SERVER_URL = "당신의 서버 URL"
VITE_KAKAO_API_KEY = "카카오 javascript KEY"
```

### 4. 개발 서버 실행

```sh
yarn dev
```

## 배포

- Glitch를 사용하여 서버 배포
- Vercel를 사용하여 클라이언트 배포

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
