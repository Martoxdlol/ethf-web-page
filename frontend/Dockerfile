FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV NEXT_PUBLIC_STRAPI_API_URL=https://cms.henryford.edu.ar

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]