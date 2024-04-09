var firebaseConfig = {
    apiKey: "AIzaSyB5liOxw1oZy1LXRzbDz5xZoqNJTbAK13U",
    authDomain: "letschat94-91eaa.firebaseapp.com",
    databaseURL: "https://letschat94-91eaa-default-rtdb.firebaseio.com",
    projectId: "letschat94-91eaa",
    storageBucket: "letschat94-91eaa.appspot.com",
    messagingSenderId: "1023636996715",
    appId: "1:1023636996715:web:7cbb5d398ece45dd32672e"
};

firebase.initializeApp(firebaseConfig);

var room_name = localStorage.getItem("room_name");
var user_name = localStorage.getItem("user_name");
function send() {
    var message = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: message,
        like: 0
    });
    message = " ";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                name = message_data["name"];
                message = message_data["message"];
                like = message_data["like"];
                console.log("name = " + name);
                console.log("message is " + message);
                console.log("likes = " + like);
                namewithtag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                messagewithtag = "<h4 class='message_h4'>" + message + "</h4>";
                likewithtag = "<button  class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>";
                spanwithtag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button> <hr>";
                row = namewithtag + messagewithtag + likewithtag + spanwithtag;
                document.getElementById("output").innerHTML = row;
                //End code


            }
        });
    })
}
getData();

function updatelike(message_id) {
    console.log("clicked on message button" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedlikes = Number(likes) + 1;
    console.log("updated likes = " + updatedlikes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updatedlikes
    });
}