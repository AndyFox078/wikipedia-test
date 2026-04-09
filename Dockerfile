FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV WIKI_USER=${WIKI_USER}
ENV WIKI_PASS=${WIKI_PASS}

CMD ["npx", "playwright", "test", "--reporter=html"]
