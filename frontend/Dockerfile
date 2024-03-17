# Dockerfile
FROM node:latest

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    curl \
    git \
    vim \
    iputils-ping

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係ファイルをコピーする
COPY package*.json ./
COPY package.json ./

# 依存関係をインストールする
RUN npm install

# アプリケーションのソースコードをコピーする
COPY . .

# アプリケーションをビルドする
RUN npm run build

# アプリケーションがリッスンするポートを指定する
EXPOSE 3000

# アプリケーションを起動する
#CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "dev"]