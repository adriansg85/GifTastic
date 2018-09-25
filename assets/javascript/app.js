//Create array to store the topics from the form
var topics = [];

//Wait for document to load
$(document).ready(function () {

    //Event listener for click on add topic button
    $("#plus-button").on("click", function () {

        //Create list item with list-pill id
        var listItem = $("<li>").attr("id", "list-pill");
        $("#append-pills").prepend(listItem);
        //Get the value in the search box
        var content = $("#search-gif").val();
        //var closeButton = $("<button>").attr("type", "button").attr("class", "close").attr("aria-label", "Close").attr("id", "closingIcon");
        //var closeSymbol = $("<span>").attr("aria-hidden", "false").val("&times;");
        //$("#closingIcon").append(closeSymbol);
        //var closeButton = "<button type='button' class='close' aria-label='Close'><span aria-hidden='false'>&times;</span></button>";
        //Condition to determine if something was written.
        if (content.length === 0) {
            alert("Please specify your search parameters.");
        } else {
            //Send value to capitalize first letter
            var capContent = capitalize(content);
            //Create item in html with content
            var pills = $("<a>").attr("id", "pill-button").attr("class", "non-active-pill").attr("href", "#").text(capContent);
            //<span aria-hidden='true'>&times;</span>
            $("#list-pill").prepend(pills);
            //Push text value to topics array
            topics.push(content);
            //Reset the textbox values
            $("#search-gif").val("");
            //Move the cursor back to the searchbox
            $("#search-gif").focus();
        }
    });

    //Event listener for enter button in sidenav area
    $('.sidenav').keypress(function (event) {

        //Determine if the key preseed is "enter"
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            //Create list item with list-pill id
            var listItem = $("<li id='list-pill'></li>");
            $("#append-pills").prepend(listItem);
            //Get the value in the search box
            var content = $("#search-gif").val();

            //Condition to determine if something was written.
            if (content.length === 0) {
                alert("Please specify your search parameters.");
            } else {
                //Send value to capitalize first letter
                var capContent = capitalize(content);
                //Create item in html with content
                var pills = $("<a id='pill-button' class='non-active-pill' href='#'></a>").text(capContent);
                $("#list-pill").prepend(pills);
                //Push text value to topics array
                topics.push(content);
                //Reset the textbox values
                $("#search-gif").val("");
                //Move the cursor back to the searchbox
                $("#search-gif").focus();
            }
        }
        event.stopPropagation();
    });

    //Event listener for click on reset button
    $("#reset-button").on("click", function () {

        //Remove gif results content
        $("#gifResults").remove();
        //Remove buttons content
        //$("#gifResults").remove();

    });

    //Event listener for active button
    $(document).on("click", "#pill-button", function () {
        //Define the value for the search query
        var query = $(this).text();
        //Limit the amount of responses to 10
        var limit = 10;
        //offset = 0 (dont know what happens if not)
        var offset = 0;
        //define the rating for the picture search
        var rating = "g";
        //Giphy URL for the API
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hliCOB7P9GOuqXxkAtfbaMCmuCmh2iLe&q=" + query + "&limit=" + limit + "&offset=" + offset + "&rating=" + rating + "&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Creating a div to hold the gifs

            $("#gifResults").remove();
            // for (var i = 0; i < limit; i++) {

            // }
            var queryURL = response.data[0].images.original_still.url;
            var queryURLa = response.data[0].images.original.url;
            var imageTitle = capitalize(response.data[0].title);
            var imageRating = capitalize(response.data[0].rating);
            console.log(queryURL);
            console.log(imageTitle);
            console.log(imageRating);

            var gifDisplay = $("<div>").attr("id", "gifResults");
            $("#displayArea").append(gifDisplay);
            console.log(gifDisplay);

            var rowDiv = $("<div>").attr("class", "row").attr("id", "1stRow");
            $("#gifResults").prepend(rowDiv);

            var searchTerm = query;
            $("#gifResults").prepend("<h2>" + searchTerm + "</h2>");

            var columnDiv = $("<div>").attr("class", "col-md-4").attr("id", "1stColumn");
            $("#1stRow").prepend(columnDiv);

            var thumbnailDiv = $("<div>").attr("class", "thumbnail").attr("id", "1stThumbnail");
            $("#1stColumn").prepend(thumbnailDiv);

            var aLink = $("<a>").attr("id", "tagCaption");
            $("#1stThumbnail").prepend(aLink);

            var imageTag = $("<img>").attr("src", queryURL).attr("class", "img-rounded").attr("alt", imageTitle).attr("style", "width:100%").attr("id", "animateClick").attr("data-still", queryURL).attr("data-animate", queryURLa).attr("data-state", "still").attr("class", "gif");

            var captionDiv = $("<div class='caption'> <h6>" + imageTitle + "&nbsp; --- Rating: &nbsp; <span class='badge badge-primary'> &nbsp; " + imageRating + " &nbsp; </span> </h6> </div>");
            $("#tagCaption").prepend(captionDiv);
            $("#tagCaption").prepend(imageTag);


        });

        $(document).on("click", "#animateClick", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                //$("#tagCaption").remove();
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

        // Script for class toggle
        // if ($("#pill-button").hasClass("active-pill") === true) {
        //     $("#pill-button").removeClass("active-pill");
        //     $("#pill-button").addClass("non-active-pill");
        //     console.log("here1");
        // } else {
        //     $("#pill-button").removeClass("non-active-pill");
        //     $("#pill-button").addClass("active-pill");
        //     console.log("here2");
        // }

    });

    //Script for testing
    // $("#pill-button").mouseover(function () {
    //     $("#pill-button").css("background", "yellow");
    // });

    // $("#pill-button").mouseleave(function () {
    //     $("#pill-button").css("background", "blue");
    // });

});

window.restartAnim = function () {
    img.src = "";
    img.src = imageUrl;
}

//Function used to capitalize the first letter in a string
function capitalize(string) {
    var uppercaseFirstLetter = string.charAt(0).toUpperCase();
    var stringWithoutFirstLetter = string.slice(1);
    return uppercaseFirstLetter + stringWithoutFirstLetter;

}