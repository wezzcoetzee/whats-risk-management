FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun --bun run build

CMD ["bun", "--bun", "run", "start"]