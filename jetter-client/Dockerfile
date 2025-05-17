FROM node:22.15

RUN apt-get update -qq && apt-get install -y bash curl openssh-server python3

COPY . /jetter-client

WORKDIR /jetter-client

RUN npm update && npm install

CMD ["npm", "run", "dev"]
