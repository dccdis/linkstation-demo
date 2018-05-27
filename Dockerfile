FROM node:7.5.0

# Add node module binaries to path
env PATH=/usr/src/app/node_modules/.bin:$PATH

EXPOSE 8080
