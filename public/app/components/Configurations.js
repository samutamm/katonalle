
var Paths = window.Paths;

const Configurations = function(callback) {
  $.ajax({url: Paths.conf(), success: function(result){
        callback(result);
    }});
}

window.Configurations = Configurations;
