function submitAT() {
  $.ajax({
    url: "ajax/handleAT",
    data: {
      "at": $("#access_token").val()
    },
    dataType: "json",
    beforeSend: function() {
      // $("#loading-small").css("display", "block");
      console.log("sending");
    },
    success: function(data) {
      if (data.groups.length == 0) {
        $("#error").css("display", "block");
      } else {
        $("#center-form").css("display", "none");
        $("#content").css("align-items", "flex-start");
        $("#content").css("height", "auto");
        $("#group-list").html("");
        $("#group-list").css("display", "block");

        var groups = ""
        for (var i = 0; i < data.groups.length; i++) {
          if (data.groups[i].image_url == null) {
            // TODO: get image url
            data.groups[i].image_url = 'https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.preview';
          }

          groups += "<div class='group-div' onclick='submitGroupId(" + data.groups[i].group_id +")'><img class='group-img' src='" + data.groups[i].image_url + "' alt='group-img'><span class='group-name'>" + data.groups[i].name + "</span></div>"
        }
        $("#group-list").html(groups);
      }
    },
    complete: function() {
      console.log("complete");
    }
  });
}
var asd;
function submitGroupId(group_id) {
  $("#group-list").addClass("messages-active");
  $("#message-list").addClass("messages-active");
  $("#message-list").html("");
  $("html, body").animate({ scrollTop: 0 }, "slow");

  $.ajax({
    url: "ajax/getMessages",
    data: {
      "at": $("#access_token").val(),
      "group_id": group_id
    },
    dataType: "json",
    beforeSend: function() {
      // $("#loading-small").css("display", "block");
      console.log("sending");
    },
    success: function(data) {
      asd = data;
      var messages = "";
      if (data.messages.years.length == 0) {
        messages = "<h1>Oops! It appears there's no messages on this day!</h1>";
      } else {
        var year;
        for (var i = 0; i < data.messages["years"].length; i++) {
          year = data.messages.years[i];
          messages += "<h1>On this day in " + year + "...</h1>";
          for (var j = 0; j < data.messages[year].length; j++) {
            m = data.messages[year][j];
            if (m.avatar == null) {
              m.avatar = 'https://i.groupme.com/300x300.png.6485c42fdeaa45b5a4b986b9cb1c91a2.preview';
            }
            // check if system message
            if (m.system) {
              messages += "<div class='msg msg-system'>";
            } else {
              messages += "<div class='msg'><div class='msg-info'><img class='msg-avatar' src='" + m.avatar + "' alt='avatar url'><div class='msg-author'><span class='msg-name'>" + m.name + "</span><span class='msg-time'>" + m.time + "</span></div></div><p class='msg-txt'>";
            }
            // check if there's an attachment
            if (m.attachments.length != 0) {
              for (var k = 0; k < m.attachments.length; k++) {
                if (m.attachments[k]["type"] == "image") {
                  messages += "<img class='msg-img' src='" + m.attachments[k]["url"] + "' alt='img'><br>";
                }
              }
            }
            // check if there's text
            if (m.text != null) {
              messages += m.text;
            }

            messages += "</p></div>";
          }
        }
      }
      $("#message-list").html(messages);
    },
    complete: function() {
      console.log("complete");
    }
  });
}