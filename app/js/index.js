let initialTracks = [];

storage.get("initialTracks").then(function(armazenado) {
  if (armazenado !== undefined) {
    initialTracks = armazenado;
  }
  
  const webamp = new Webamp({
    initialTracks: initialTracks,
    zIndex: 1,
    handleAddUrlEvent: async () => {
      let url = prompt("Informe a URL");
      let artist = prompt("Informe o nome");
      let radioObject = {
        url: url,
        metaData: {
          title: 'Streaming',
          artist: artist
        },
        duration: 0
      };
  
      storage.get("initialTracks").then(function(armazenado) {
        let arrayArmazenado = [];
  
        if (armazenado !== undefined) {
          arrayArmazenado = armazenado;
        }
        arrayArmazenado.push(radioObject);
        
        storage.set("initialTracks", arrayArmazenado);
      });
  
      webamp.appendTracks([radioObject]);
    },
  });

  webamp.renderWhenReady(document.getElementById('winamp-container'));

  webamp.onClose(() => {
    window.close();
  });

  window.onkeydown = function() {
    let key = event.keyCode || event.charCode;

    if (document.querySelectorAll('.track-cell.selected span').length > 0) {

      let radioName = document.querySelectorAll('.track-cell.selected span')[0].innerText.split(". ")[1];

      if (key === 46) {
        storage.get("initialTracks").then(function(armazenado) {
          
          armazenado.forEach((track, i) => {

            if (track.metaData.artist+" - "+track.metaData.title === radioName) {
              
              armazenado.splice(i, 1);

              webamp.setTracksToPlay(armazenado);
              storage.set("initialTracks", armazenado);
              setTimeout(() => {
                webamp.stop();
              }, 0);
            }
          });
        });
      }
    }
  };
});