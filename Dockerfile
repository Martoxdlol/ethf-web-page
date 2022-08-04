FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN mkdir backend
RUN mkdir frontend

COPY package*.json ./
COPY frontend/package*.json ./frontend
COPY backend/package*.json ./backend

RUN npm install
RUN cd /usr/src/app/backend && npm install 
RUN cd /usr/src/app/frontend && npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN cd /usr/src/app/backend && npm run build

WORKDIR /usr/src/app

# Bundle app source
COPY frontend frontend/

EXPOSE 3000
CMD [ "npm", "run", "start" ]