FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start"]


FROM node:6.2

# WORKDIR /home/feathers
# COPY README.md README.md
# COPY package.json package.json
# COPY config/ config/
# COPY public/ public/
# COPY src/ src/
# ENV NODE_ENV 'production'
# ENV PORT '8080'
# RUN npm install --production
# CMD ["node", "src/index.js"]