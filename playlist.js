



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




var getsong = function(songid) {
  var datarows = window.MUSIC_DATA["songs"]
  for (let song of datarows)
  {
    if (song["id"] == songid) {
      return song
    }
  }
}

var updateplaylistsonglist = function(playlistname, playlistsongs) {
  var playlistcontainer = document.getElementById("playlistbuttoncontainer")
  var rowelement = document.createElement("div")
  rowelement.setAttribute("class", "playlistrow row")
  rowelement.innerHTML = '<h2>'+playlistname+'</h2>'
  playlistcontainer.appendChild(rowelement)
  for (let id of playlistsongs)
  {
    var rowelement = document.createElement("div")
    rowelement.setAttribute("class", "playlistrow row")
    song = getsong(id)
    rowelement.innerHTML = '<a href="#" class="list-group-item"><span class="greyrectangle"></span>'+song["title"]+' / '+song["album"]+'<br>'+song["artist"]+'<span class="glyphicon glyphicon-chevron-right grey-chevron"></span></a>'
    //rowelement.addEventListener("click", playlistrowclick)
    rowelement.setAttribute("songid", id)
    playlistcontainer.appendChild(rowelement)
  }
}

var clearplaylistrows = function() {
  removeElementsByClass("playlistrow")
}

var playlistrowclick = function() {
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

var sortbyartistclick = function() {
  window.MUSIC_DATA["songs"].sort(function(a, b) {

    var nameA = a.artist.toUpperCase().replace(/^(THE )/,"");
    var nameB = b.artist.toUpperCase().replace(/^(THE )/,"");
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  clearplaylistrows();
  updatesonglistrows();
  changeplaylistrows("visible");
  document.getElementById("sortbytitlebutton").style["background-color"] = "#946fa7"
  document.getElementById("sortbyartistbutton").style["box-shadow"] = "inset"
}

var sortbytitleclick = function() {
  window.MUSIC_DATA["songs"].sort(function(a, b) {
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  clearplaylistrows();
  updatesonglistrows();
  changeplaylistrows("visible");

  document.getElementById("sortbyartistbutton").style["background-color"] = "#946fa7"
  document.getElementById("sortbytitlebutton").style["box-shadow"] = "inset"
}

var songrowclick = function() {
  var songid = this.getAttribute("songid")
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      modal.style.display = "none";
  }
  var modalcontent = document.getElementById('modalcontent');
  var datarows = window.MUSIC_DATA["playlists"]
  for (i=0; i<datarows.length; i++)
  {
    var rowelement = document.createElement("div")
    rowelement.setAttribute("class", "playlistrow row")
    rowelement.innerHTML = '<a href="#" class="list-group-item">'+datarows[i]["name"]+'<span class="glyphicon glyphicon-chevron-right grey-chevron"></span></a>'
    rowelement.addEventListener("click", playlistrowclick)
    rowelement.setAttribute("playlistname",  datarows[i]["name"])
    rowelement.setAttribute("playlistindex", datarows[i]["id"])
    rowelement.setAttribute("playlistsongs", datarows[i]["songs"])
    modalcontent.appendChild(rowelement)
  }



}

var updatesonglistrows = function() {
    var playlistcontainer = document.getElementById("playlistbuttoncontainer")
    var rowelement = document.createElement("div")
    rowelement.setAttribute("class", "playlistrow row center-block")

    sortbyartistelement = document.createElement("span")
    sortbyartistelement.setAttribute("class", "playlistrow")
    sortbyartistelement.innerHTML = '<a href="#" id="sortbyartistbutton" class="btn btn-info" role="button">Sort by title</a>'
    sortbyartistelement.addEventListener("click", sortbytitleclick)
    rowelement.appendChild(sortbyartistelement)

    sortbytitleelement = document.createElement("span")
    sortbytitleelement.setAttribute("class", "playlistrow")
    sortbytitleelement.innerHTML = '<a href="#" id="sortbytitlebutton" class="btn btn-info" role="button">Sort by artist</a>'
    sortbytitleelement.addEventListener("click", sortbyartistclick)
    rowelement.appendChild(sortbytitleelement)
    playlistcontainer.appendChild(rowelement)

    var datarows = window.MUSIC_DATA["songs"]
    for (let song of datarows)
    {
      var rowelement = document.createElement("div")
      rowelement.setAttribute("class", "playlistrow row ")
      rowelement.innerHTML = '<a href="#" class="list-group-item"><span class="greyrectangle"></span>'+song["title"]+' / '+song["album"]+'<span class="glyphicon glyphicon-play"></span><span class="glyphicon glyphicon-plus-sign"></span><br>'+song["artist"]+'</a>'
      rowelement.addEventListener("click", songrowclick)
      rowelement.setAttribute("songid", song["id"])
      playlistcontainer.appendChild(rowelement)
    }
}


var librarytabclick = function() {
  clearplaylistrows();
  sortbyartistclick();
  changeplaylistrows("visible");
};

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

var hidemodal = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

window.addEventListener("load", initializeHandlers);
window.addEventListener("click", hidemodal);
