const socket = io('/');                                    //Connection with Socket
const Grid = document.getElementById('grid')               //Creating Video grid

let inputarea = document.querySelector('#chat-message')  
let chatArea = document.querySelector('.chat-window')

const myVideoElement = document.createElement('video');     //created HTML video element
myVideoElement.muted = true;


//creating peer object and adding TURN and STUN servers
var peer = new Peer({
  'iceServers': [
    {
      'urls': 'stun:stun.l.google.com:19302'
    },
    {
      'urls': 'numb.viagenie.ca',
      'credential': 'codes@123',
      'username': 'geniusmark650@gmail.com'
    },
   
  ]
});

const peerList = {}                     //to keep track of all peers
let userNameList = []                   //keep track of usernames

let myStream                            //object for storing local stream

//asking for username 
let userName;
do {
  userName = prompt('Please enter your name:')

} while (!userName)

userNameList.push(userName)                         //appending usernames to array
navigator.mediaDevices.getUserMedia({ 
  video: true,
  audio: true
}).then(stream => {                            //getting camera and audio access
  myStream = stream;
  console.log("stream", stream)
  addVideoToScreen(myVideoElement, stream)


// Answer the call with an A/V stream and adding remote stream to our screen
  peer.on('call', call => {
    call.answer(stream)                         
    const userVideo = document.createElement('video')
    call.on('stream', userVideoStream => {
      console.log("adduservideo", userVideoStream)
      addVideoToScreen(userVideo, userVideoStream)
    })
  })

  
  socket.on('user-is-connect', (userId) => {
    alert("New User Connected!");
    console.log("user-id", userId)
    NewUserConnection(userId, stream);
  })

})

//When the user disconnects ,his userId is removed from list and video is destroyed
socket.on('user-is-disconnects', userId => {
  if (peerList[userId]) peerList[userId].close()
})





peer.on('open', id => {
  console.log("id", id)
  socket.emit('joining-room', ROOM_ID, id);
})


//function to add remote stream to our screen
const NewUserConnection = (userId, stream) => {
  console.log("newuser", stream)
  var call = peer.call(userId, stream)                 //sending caller stream to userid
  var videoElement = document.createElement('video')
  call.on('stream', userVideoStream => {
    console.log("userstream", userVideoStream)
    addVideoToScreen(videoElement, userVideoStream)

  })
  call.on('close', () => {
    videoElement.remove()
  })

  peerList[userId] = call
}



//function to add A/V stream to video element
const addVideoToScreen = (video, stream) => {

  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  })
  Grid.append(video);
}




// ============================chat feature===================================

inputarea.addEventListener('keyup', (e) => {
  if (e.which == 13) {
    sendMessages(e.target.value)

  }
})

const sendMessages = (message) => {
  let msg = {
    user: userName,
    message: message.trim()
  }
  appendMessageToChatWindow(msg, 'outgoing')

  inputarea.value = ''                           //empty the input area after pressing enter
  bottomScroll()                                 

  //sending to server
  socket.emit('message', msg)

}

//function to add messages to chat window

const appendMessageToChatWindow = (msg, type) => {
  let divMain = document.createElement('div')
  let className = type

  divMain.classList.add(className, 'message')

  let mark = `
 <h4>${msg.user}</h4>
<p>${msg.message}</p>
`

  divMain.innerHTML = mark
  chatArea.appendChild(divMain)
}


//receive message

socket.on('message', (msg) => {
  appendMessageToChatWindow(msg, 'incoming')
  bottomScroll()

})

//function to add scroll bar  to chat window and keep it at bottom always
const bottomScroll = () => {
  var e = $('.chat-window');
  e.scrollTop(e.prop("scrollHeight"));
}




//==================================================mute mic=====================================================

const muteUnmuteMic = () => {
  const switched = myStream.getAudioTracks()[0].enabled;
  if (switched) {
    //set the audio to mute and change the icon to microphone with slash and unmute is wriiten below it
    myStream.getAudioTracks()[0].enabled = false;
    UnmuteButton();
  } else {
    //set the audio to unmute and change the icon to microphone without slash and mute is wriiten below it
    MuteButton();
    myStream.getAudioTracks()[0].enabled = true;
  }
}

const MuteButton = () => {
  const mute = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
  document.querySelector('.mute-button').innerHTML = mute;
}

const UnmuteButton = () => {
  const unmute = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
  document.querySelector('.mute-button').innerHTML = unmute;
}


//================================================video on off functions================================================

const OnOffVideo = () => {

  let switched = myStream.getVideoTracks()[0].enabled;
  if (switched) {
    //switch off the video and change icon to video with slash button
    myStream.getVideoTracks()[0].enabled = false;
    PlayVideo()
  } else {
    // switch on the video and change icon to video without slash button
    StopVideo()
    myStream.getVideoTracks()[0].enabled = true;
  }
}


const StopVideo = () => {
  const stop = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
  document.querySelector('.video-button').innerHTML = stop;
}

const PlayVideo = () => {
  const play = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
  document.querySelector('.video-button').innerHTML = play;
}



//===============================================================toggle chat window-========================================
let check = 0
const toggleChat = () => {
  if (!check) {
    document.getElementById("chats").style.display = "flex";
    check = 1;
  }
  else {
    document.getElementById("chats").style.display = "none";
    check = 0;
  }
}


//================================================Raise Hand================================================
let raise_hand = 0;
const raiseHand = () => {
  if (!raise_hand) {
    const raise = `
    <i class=" raise far fa-hand-paper"></i>
    <span>Lower Hand</span>
    `
    alert("You have raised hand!");
    // socket.emit("raises_hands",p)
    document.querySelector(".raise-hand-button").innerHTML = raise;
    raise_hand = 1
  }
  else {
    const lower = `
    <i class="far fa-hand-paper"></i>
    <span>Raise Hand</span>
    `

    document.querySelector(".raise-hand-button").innerHTML = lower
    raise_hand = 0;
  }

}


//======================================Invite button ====================================================

//Invite button pop ups the meet url which we can copy and send to our friends
const inviteButton = document.querySelector("#inviteButton");
inviteButton.addEventListener("click", (e) => {
  // prompt(
  //   "Copy this link and send it to people you want to meet with",
  //   window.location.href
  // );
  navigator.clipboard.writeText(window.location.href);
  alert("Invite link copied to clipboard! Send it to people you want to chat with.");
});



