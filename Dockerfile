
# #install dependences
# FROM node:20.13.1-alpine3.19 as deps
# WORKDIR /app

# COPY package.json ./
# RUN npm install
# CMD ["node","start:dev"]
# #builder
# FROM node:20.13.1-alpine3.19 as builder
# WORKDIR /app

# COPY  --from=deps /app/node_modules ./node_modules

# COPY . .
# RUN npm run build

# #depends prod
# FROM node:20.13.1-alpine3.19 as prod-deps
# WORKDIR /app
# COPY package.json ./
# RUN npm install --prod


# #runner
# FROM node:20.13.1-alpine3.19 as run
# EXPOSE 3000
# WORKDIR /app
# ENV APP_VERSION=${APP_VERSION}
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist


# CMD ["node","dist/main.js"]