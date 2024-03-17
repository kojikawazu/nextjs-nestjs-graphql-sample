# Dockerfile
FROM node:latest

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# 必要モジュールをインストール
RUN npm i -g @nestjs/cli

# アプリケーションの依存関係ファイルをコピーする
COPY package*.json ./
COPY package.json ./

# 依存関係をインストールする
RUN npm install

# アプリケーションのソースコードをコピーする
COPY . .

# Prisma Clientの生成
RUN npx prisma generate

# アプリケーションをビルドする
RUN npm run build

# アプリケーションがリッスンするポートを指定する
EXPOSE 8000

# アプリケーションを起動する
#CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start:dev"]