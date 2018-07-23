# Case

This is a demonstration of a simple server/client network architecture using unix sockets.

The application is written with nodejs, his stdlib modules and the `blessed` module.

## Build with docker

### Server

docker build -t adotmob-server server/.

### Listener

docker build -t adotmob-listener listener/.

## Run

First be sure to open two separate terminal windows so you can observe the realtime mirroring effect on the server while you type text on the listener's tty.

docker run -it -v /tmp:/tmp adotmob-server

docker run -it -v /tmp:/tmp adotmob-listener

## Use case

Go to the listener tty screen and start typing your text. Then the server's tty will start applying a mirror effect of the same text in realtime.
