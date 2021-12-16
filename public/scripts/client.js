/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  for (let users of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(users);
    
    // takes return value and appends it to the tweets container
    $('#posted-tweets').prepend($tweet);
  }
  
}

//takes in a tweet object and is responsible for returning a tweet <article> element containing the 
//entire HTML structure of the tweet.

const createTweetElement = function(tweetData){
  const $tweet = $(`<article>
  <header>
    <img src = "${tweetData.user.avatars}">
    <h4>${tweetData.user.name}</h4>
    <div>${tweetData.user.handle}</div>
  </header>
  <p>${tweetData.content.text}</p>
  <footer>
    <h6>${timeago.format(tweetData.created_at)}</h6>
    <div class="icons">
      <div><i class="far fa-flag"></i></div>
      <div><i class="fas fa-retweet"></i></div>
      <div><i class="fas fa-heart"></i></div>
    </div>
  </footer>
</article>`);
return $tweet;
}

$(document).ready(function(){
  function loadTweets(){
    $.get("/tweets")
    .then((data) => {
      $("#posted-tweets").empty();
      renderTweets(data);
      
    })
  }
  loadTweets();
  $("form.tweet-form").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    //console.log($data);
    const $message = $("#tweet-text").val()
    console.log($message.length);
    if ($message === null || $message === ""){
      $(".error-message").text("🛑Your message is too short or invalid!🛑").slideDown(400).slideUp(5000);
    }
    else if ($message.length > 140){
      $(".error-message").text("🛑Your message is too long!🛑").slideDown(400).slideUp(5000);
    }
    else {
      $.post("/tweets", $data)
      .then(() => {
        console.log("this is a message")
        loadTweets();
      })
    }
    
  })
  
  
})