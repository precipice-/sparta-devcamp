# Backend 회원가입, 로그인, 결제 기능 구현

기본적인 회원가입, 로그인, 결제 기능을 NestJS로 빠르게 빌드해보면서 실력을 점검하는 프로젝트

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## 기술스택 🛠️

- TypeScript + NestJS
- Yarn
- TypeORM + PostgreSQL

## Payment Code Structure
```plaintext
src/payment
├── payment.module.ts
├── dto
│   ├── index.ts
│   └── create-order.dto.ts
├── entities
│   ├── coupon.entity.ts
│   ├── issued-coupon.entity.ts
│   ├── index.ts
│   ├── order-item.entity.ts
│   ├── order.entity.ts
|   ├── product.entity.ts
|   ├── point.entity.ts
│   └── point-log.entity.ts
├── repositories
│   ├── coupon.repository.ts
│   ├── issued-coupon.repository.ts
│   ├── index.ts
│   ├── order-item.repository.ts
│   ├── order.repository.ts
│   ├── product.repository.ts
|   ├── point.repository.ts
│   └── point-log.repository.ts
└── services
    ├── index.ts
    ├── payment.service.ts
    └── product.service.ts
```
