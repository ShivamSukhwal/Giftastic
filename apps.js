var ndiv = $("<div>");
$(".picOfTomorrow").append(ndiv);
var topics = [
  "Monkey",
  "Newspaper",
  "Canada",
  "Trump",
  "Tricycle",
  "Fire",
  "Taco's",
  "Jail"
];
$(document).ready(function() {
  topics.forEach(x => {
    var btn = $("<button>");
    btn.text(x);
    btn.attr("data-text", x);
    btn.addClass("search");
    $(".picOfTomorrow").append(btn);
  });
});

$(".sub").on("click", function() {
  var text = $(".userInput").val();
  if (text) {
    var text = $(".userInput").val();

    $(".userInput").val("");
    var btn = $("<button>");
    btn.text(text);
    btn.attr("data-text", text);
    btn.addClass("search");
    $(".picOfTomorrow").append(btn);
  }
});

$(document).on("click", ".search", function() {
  var queryurl =
    "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=10";
  var person = "";
  $("#gifs-appear-here").empty();
  person = $(this).attr("data-text");
  queryurl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=4226vnI3CsHDSK5BFrgTwzEn5DChvF17&limit=10";

  $.ajax({
    url: queryurl,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("data-state", "still");
        personImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.addClass("gif");

        personImage.attr("src", results[i].images.fixed_height_still.url);

        gifDiv.append(p);
        gifDiv.append(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });
});

$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
