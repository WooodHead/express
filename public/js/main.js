  // var video = videojs('my_video_1', {
  //   playbackRates: [.5, 1, 1.5, 2, 2.5],
  //   fluid: true,
  //   plugins: {
  //       hotkeys: {
  //           seekStep: 5,
  //           enableNumbers: true,
  //           enableModifiersForNumbers: false,
  //           volumeStep: 0.1            
  //       }
  //   }
  // });
$(document).ready(function () {
  
  $('.video-wrap>.video-js').map(function (index, item) {
    videojs(item.id).ready(function () {
      this.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        alwaysCaptureHotkeys: true,
        enableVolumeScroll: true        
        // enableModifiersForNumbers: false
      });
    });
  });

});