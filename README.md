# linkstation-demo

A demo on finding optimal link station in 2d space

## Prerequisites

Docker installed

## How to run

```
docker-compose run shell
node src/main.js <x coordinate> <y coordinate>
```
eg.
```
root@4b7b0c3ae7ad:/usr/src/app# node src/main.js 0 0  
Best link station for point 0,0 is 0,0 with power 100
root@4b7b0c3ae7ad:/usr/src/app# node src/main.js 100 100
No link station within reach for point 100,100
root@4b7b0c3ae7ad:/usr/src/app# node src/main.js 15 10  
Best link station for point 15,10 is 10,0 with power 0.6718427000252355
root@4b7b0c3ae7ad:/usr/src/app# node src/main.js 18 18
Best link station for point 18,18 is 20,20 with power 4.715728752538098
```
