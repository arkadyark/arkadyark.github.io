function clickTab(href) {
  $('ul.tabs li a').click(function(){
    var tab_id = $(this).parent().attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).parent().addClass('current');
    $("#"+tab_id).addClass('current');
    })
  $('[href=#' + href.split("#")[1] + ']').click();
}

function submitComment(dataRef, commentField) {
  var name = commentField.prev().val()
  var comment = commentField.val();
  dataRef.push({name: name, comment: comment});
}


// Helper to load content
function content(key, val) {
  var post = "<div class=\"content-card\">"
  // Post header
  post += "<div class=\"content-header\">"
  post += "<h3>" + val["title"] + "</h3>"
  post += "<p>" + val["date"] + "</p>"
  post += "</div>"
  
  // Post content
  post += "<div class=\"panel-body\">"
  post += "<p>" + val["post"] + "</p>"
  post += "</div>"
  
  // Display comments - will get populated
  post += "<div class=\"commentContainer\" id=\"" + key + "-comments\"> </div>"

  // Comment form
  post += "<label>Leave a comment:</label>"
  post += "<input type=\"name\" placeholder=\"Matti Meikäläinen\">"
  post += "<textarea class=\"u-full-width\" placeholder=\"Awesome article!\" id=\"" + key + "-commentInput\"></textarea>"

  post += "</div>"
  return post;
}

// Make the urls work
$(document).ready(function(){
  clickTab(window.location.href);
})


// Main Firebase reference, lots of children from here
var ref = new Firebase("https://arkadyark.firebaseio.com");

// Simple hit counter
var hits = ref.child("hits")
hits.once("value", function(snapshot) {
  var numHits = snapshot.val()
  ref.update({hits:numHits+1});
})

loadContent = function(childRef) {
  // Helper to load posts from Firebase
  var child = ref.child(childRef)
  // Listen for posts
  child.on("child_added", function(snapshot) {
    var key = snapshot.key()
    var val = snapshot.val()
    // Add the content to the DOM
    $("#" + childRef + "-div").prepend(content(key, val));
    // Load the comments
    var dataRef = child.child(key).child("comments")
    dataRef.on("child_added", function(snapshot) {
      var commentsDiv = $("#" + key + "-comments")
      var commentVal = snapshot.val()
      var name = commentVal["name"]
      var comment = commentVal["comment"]
      var commentHtml = '<p><b>' + name + ':</b>'
      commentHtml += ' ' + comment + '</p>'
      commentsDiv.prepend($(commentHtml))
    })
    // Allow users to add comments
    listenForEnter(key, dataRef)    
  })
}

listenForEnter = function(key, dataRef) {
  // Helper to bind the comment field to a listener for each post
  $("#" + key + "-commentInput").keyup(function (e) {
    // Submit comment on enter
    if (e.keyCode == 13) {
      submitComment(dataRef, $(this))
      $(this).prev().val('')
      $(this).val('')
    }
  });
}

// Load content
loadContent("blog-posts")
loadContent("project-posts")
loadContent("interest-posts")