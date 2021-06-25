FROM node:12.22-alpine
WORKDIR /dz-upload-multiple-images
ADD . /dz-upload-multiple-images
RUN npm install
EXPOSE 3000
CMD npm start