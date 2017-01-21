



var changeplaylistrows = function(visibility) {
  var playlistrows = document.getElementsByClassName("playlistrow")
  for (i=0; i<playlistrows.length; i++)
  {
    playlistrows[i].style.visibility = visibility;
  }
};

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

var librarytabclick = function() {
  changeplaylistrows("hidden");
};


var getsong = function(id) {
  var datarows = window.MUSIC_DATA["songs"]
  for (i=0;i<datarows.length;i++)
  {
    if (datarows[i]["id"] == id) {
      return datarows[i]
    }
  }
}

var updateplaylistsonglist = function(playlistname, playlistsongs) {
  var playlistcontainer = document.getElementById("playlistbuttoncontainer")

  var rowelement = document.createElement("div")
  rowelement.setAttribute("class", "playlistrow row")
  rowelement.innerHTML = '<h1>'+playlistname+'</h1>'
  playlistcontainer.appendChild(rowelement)

  for (i=0;i<playlistsongs.length;i++)
  {
    var rowelement = document.createElement("div")
    rowelement.setAttribute("class", "playlistrow row")
    song = getsong(playlistsongs[i])
    rowelement.innerHTML = '<a href="#" class="list-group-item"><span class="greyrectangle"></span>'+song["title"]+'<span class="glyphicon glyphicon-chevron-right grey-chevron"></span></a>'
    //rowelement.addEventListener("click", playlistrowclick)
    rowelement.setAttribute("song", song)
    playlistcontainer.appendChild(rowelement)
  }
}

var clearplaylistrows = function() {
  removeElementsByClass("playlistrow")
}

var playlistrowclick = function() {
  debugger;
  clearplaylistrows();
  updateplaylistsonglist(this.getAttribute("playlistname"), this.getAttribute("playlistsongs").split(','));
  changeplaylistrows("visible");
}

var updateplaylistrows = function() {
  var playlistcontainer = document.getElementById("playlistbuttoncontainer")
  var datarows = window.MUSIC_DATA["playlists"]
  for (i=0; i<datarows.length; i++)
  {
    var rowelement = document.createElement("div")
    rowelement.setAttribute("class", "playlistrow row")
    rowelement.innerHTML = '<a href="#" class="list-group-item"><span class="greyrectangle"></span>'+datarows[i]["name"]+'<span class="glyphicon glyphicon-chevron-right grey-chevron"></span></a>'
    rowelement.addEventListener("click", playlistrowclick)
    rowelement.setAttribute("playlistname",  datarows[i]["name"])
    rowelement.setAttribute("playlistindex", datarows[i]["id"])
    rowelement.setAttribute("playlistsongs", datarows[i]["songs"])
    playlistcontainer.appendChild(rowelement)
  }
}

var playlisttabclick = function() {
  clearplaylistrows();
  updateplaylistrows();
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
