# raspberry-camera-webviewer

This project aims to be a set-up that allows you to use your raspberry pi's to record images and see them through a web browser.

It has three parts:
- A python3 api to record the images at fixed intervals
- A expressjs backend that contains several rest web services that serve the images and the metadata
- An Angular 5 frontend that works as a viewer of the several cameras.

The authentification of the app is achieved through an auth0 token security.
