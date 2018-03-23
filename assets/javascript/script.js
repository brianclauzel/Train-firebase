//firebase config info to link to do database
var config = {
    apiKey: "AIzaSyADFBMOcuQxY_4O163ckp9lsNCl4LqWgt4",
    authDomain: "train-firebase-hw-7012c.firebaseapp.com",
    databaseURL: "https://train-firebase-hw-7012c.firebaseio.com",
    projectId: "train-firebase-hw-7012c",
    storageBucket: "train-firebase-hw-7012c.appspot.com",
    messagingSenderId: "490522678543"
  };

  firebase.initializeApp(config);   

  var database = firebase.database();

  $(".btn").on("click", function(event){
    event.preventDefault();  
    var nameInput = $(".name-input").val().trim();
    var destInput = $(".destination-input").val().trim();
    var firstTrainInput = $(".firstTrain-input").val().trim();
    var freqInput = $(".frequency-input").val().trim();



    var info = {
        train: nameInput,
        destination: destInput,
        firstTrain: firstTrainInput,
        frequency: freqInput
    };

    database.ref().push(info);

    console.log(info.train);

    $(".name-input").val("");
    $(".destination-input").val("");
    $(".firstTrain-input").val("");
    $(".frequency-input").val("");

  });

  database.ref().on("child_added",  function(snappy, prevChildKey){

    var nameInput = snappy.val().train;
    var destInput = snappy.val().destination;
    var firstTrainInput = snappy.val().firstTrain;
    var freqInput = snappy.val().frequency;

    var freq = freqInput;
    var time = firstTrainInput;
    var timeConverted = moment(time, "hh:mm").subtract(20, "minutes");
    var currentTime = moment();
    var diffTime = moment().diff(moment(timeConverted));
    var tRemainder = diffTime % freq;
    var minutesUntil = tRemainder - freq;
    var minutesAway = moment().add(minutesUntil, "minutes");

    var tr = $("<tr></tr>");
    var td = $("<td>" + nameInput + "</td>" + "<td>" + destInput + "</td>" + "<td>" + time + "</td>" + "<td>" + freq + "</td>" + "<td>" + minutesAway + "</td>");
    $(tr).append(td);
    $(".tbody").append(tr);

  });