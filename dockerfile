FROM node
# set work directory
WORKDIR /app  . 
# copy package.json to work directory
COPY package.json /app
# install all dependencies
RUN npm install
# copy all files from current directory to work directory
COPY . /app
# expose port 3000
EXPOSE 3000
# run npm start
CMD ["npm", "start"]
