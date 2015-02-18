//  This file handles form submissions

(function() {

  $(function() {
    return $("button.submit").on("click", function(e) {
      selected = $("select").val();
      e.preventDefault();
      password = $("input.form-control").val();
      if (CryptoJS.SHA256(password).toString() == '5d6e0eecd32302adf4ad5e712f8f4e1db7cd9f9d37b0a1c1503aca6ee8ea7e44') {
        var myDataRef = new Firebase('https://arkadyark.firebaseio.com/' + selected);
        var html = $("textarea.mdhtmlform-html").val();
        myDataRef.push({post: html});
      } 
    });
  });

}).call(this);