var changeplaylistrows = function(visibility) {
  var playlistrows = document.getElementsByClassName("playlistrow")
  for (i=0; i<playlistrows.length; i++)
  {
    playlistrows[i].style.visibility = visibility;
  }
};

var librarytabclick = function() {
  changeplaylistrows("hidden");
};

var playlisttabclick = function() {
  changeplaylistrows("visible");
};

var searchtabclick = function() {
  changeplaylistrows("hidden");
};

var initializeHandlers = function() {
  document.getElementById("librarytab").addEventListener("click", librarytabclick);
  document.getElementById("playlisttab").addEventListener("click", playlisttabclick);
  document.getElementById("searchtab").addEventListener("click", searchtabclick);
};

window.addEventListener("load", initializeHandlers);
