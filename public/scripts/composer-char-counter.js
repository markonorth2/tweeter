$(document).ready(function() {
  $("#tweet-text").on("input", function(event){
    const message = event.target.value.length;
    const countedMessage = 140 - message;
    console.log(message);
    $(".counter").text(countedMessage);
    if (countedMessage < 0) {
      $(".counter").css("color", "red");
    } else {
    $(".counter").css("color", "rgb(62, 57, 57)");
    }
  })
});