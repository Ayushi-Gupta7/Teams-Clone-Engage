# Engage Project : Microsoft Teams Clone
Realtime Video Chat application built under the Microsoft Engage Program 2021
## Contents
 - [About the Project](#about-the-project)
    * [Problem Statement](#problem-statement)
    * [Motivation](#motivation)
 - [Methodology](#methodology)
 - [Demo Links](#demo-links)
 - [Getting started](#getting-started)
 - [Product Information](#product-information)
   - [Features](#features)
   - [Built with](#built-with)
 - [Scopes of Improvement](#scopes-of-improvement)

## About the Project
Engage 2021 is a Engagement and Mentorship program created by Microsoft engineers, in association with Ace Hacker team, for engineering students. Through this initiative, students get a chance to be mentored by Microsoft and be a part of AMA Sessions, Webinars and Leader talks delivered by Microsoft employees.

### Problem Statement
 The challenge was to **build a Microsoft Teams Clone** . It should be a fully functional prototype with at least one mandatory functionality - *a minimum of two participants should be able connect with each other using your product to have a video conversation*.
[Microsoft Engage 2021](https://microsoft.acehacker.com/engage2021/?mc_cid=51cf8705a5&mc_eid=e7a7568555#challenge)

### Motivation
While the world has crumbled down because of the ongoing pandemic, the only thing that is binding us together right now is being connected through social media platforms and get a chance to talk to our friends, family and co-workers through video conferencing platforms such as **Microsoft Teams**.

## Methodology

### Scrum Methodology

Scrum is an **Agile** development methodology used in the development of software based on an iterative and incremental processes. Each iteration consists of two to four week sprints, where each sprint’s goal is to build the most important features first and come out with a potentially deliverable product.

### **Sprint Map**
 Below points provides insight to sprint wise progress and bugs:

- #### **Week 1** : 
    1.  Learn about developement i.e HTML, CSS, Javascript, NodeJs
    2.  Explored and decided what to use as a signaling server for establishing a peer-to-peer connection. (Two options were firebase or socket.io)
    3.  Learn about Git and GitHub.
   

- #### **Week 2** : 
    1.  Got an overview of **WebRTC** and **PeerJs**
    2.  Started working on backend part and adding minimal feature
    3.  Build the basic UI
    4.  Connected client side and server side
    5.  Prepared the feature list and assigned them different priorities 
    
    **Challenges and bugs:** Was not able to stream video and audio due to few arguments of Peer object.

- #### **Week 3** :
    1.  Add extra features like mute,unmute, camera on and off.
    2.  Add chat feature during video call.
    3.  Update UI
    4.  Explored more about WebRTC
    5.  Fixed bugs faced last week and finally they were resolved.
    6.  Testing on local server
   
    
    **Bugs** : Chats were broadcasting to all rooms and display name was not present.

- #### **Week 4** :  
    1.  Add title icon.
    2.  Server deployment on Heroku.
    3.  Global working(Testing on different networks).
    4.  Try to implement adapt feature.
    5.  Added Invite button and raise hand button
    6.  Solved all the bugs related to chat 
    7.  Update README.
    8.  Create demo video.
    
    **Bugs** : Globally not working on some ISPs.

## Demo Links
Site : https://team-clone-microsoft.herokuapp.com/

Demo Video : https://youtu.be/qyCDeltYLrU

## Getting Started
To run the project on your local machine, follow the instructions:
1. Clone the repository
```bash
git clone https://github.com/Ayushi-Gupta7/Teams-Clone-Engage.git
```

2. Change your current directory to repository folder and then install all the dependencies
```bash
cd Teams-Clone-Engage
npm install
```

3. Run the server
```bash
npm run dev
```
Now open http://localhost:3030/ on browser


## Product Information

### Features
1. Connectivity for 3-4 participants
2. Audio toggle- mute/unmute mic.
3. Video toggle - on/off camera
4. Custom user names.
5. Group chatting during the meeting (username being your chosen display name).
6. Notification when someone joins.
7. Invite button functionality-automatically copies room link to clipboard.
8. Raise hand functionality


### Built with
| Name | Version | Description
| ------ | ------ | ------ |
| Node JS | 14.17.3 | Node.js is an open source development platform for executing JavaScript code server-side. It is useful for developing applications that require a persistent connection from the browser to the server and is suitable for real-time applications. Node.js is intended to run on a dedicated HTTP server and to employ a single thread with one process at a time. Node.js applications are event-based and run asynchronously.  |
| Socket.io | 4.1.2 | Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Whenever an event occurs, the server will get it and push it to the concerned connected clients. |
| Express | 4.17.1 | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is an open source framework developed and maintained by the Node.js foundation. Express is used to build the web server that Socket.IO will work with. ExpressJS makes it easy to define routes and other things. |
| PeerJs |  0.6.1 | PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. Equipped with nothing but an ID, a peer can create a P2P data or media stream connection to a remote peer. |
| uuid | 8.3.2 | UUID is a javascript library that allows us to create unique Ids. In this application, I have used uuid version 4 to create unique URL i.e unique room IDs. |
| Nodemon | 2.0.7 | Nodemon is a tool from npm. This tool restarts our server as soon as we make a change in any of our files, otherwise we need to restart the server manually after each file modification. |


#### This is how socket.io works:</br>
On the server-side, Socket.IO works by adding event listeners to an instance of http.Server. The HTTP server will begin to serve the client library at /socket.io/socket.io.js. The global socket variable is an EventEmitter-like object. Since both the server and client's Socket object act as EventEmitters, you can emit and listen for events in a bi-directional manner. We can send any JSON serialisable object to and from the server. This includes strings, numbers, arrays and booleans. </br> </br>

<img src="https://github.com/AJgthb2002/WeTalk/blob/4f7422b6537b01926390cbb1611b7238d82c919c/screenshots/socketio_working_1.png" alt="socketio_working" width="500"     height="300" margin-left ="auto" margin-right="auto" />


## Scopes of Improvement
   * Multiple Rooms can be created.
   * Screen Share to be added
   * Invite with the help of email
   * Keep chat window active before and after meeting.
   * Improving Raise Hand feature
   * Adding emotions in chat messages
   * Adding background change
   * Display a list of Participants
   * Adding authentication feature and making home page with login/signup
   * Record meeting feature

## Limitations

Since an external TURN server has not been integrated, the connection between two people on different networks might not be possible if they have firewall enabled or their IP address is masked by the browser.
