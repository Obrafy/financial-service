FROM node:current-bullseye

WORKDIR /app/

RUN npm install -g @nestjs/cli@8.12.1

COPY .docker/ .docker/

RUN chmod +x .docker/entrypoint.sh
