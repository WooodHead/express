$(document).ready(function () {
  $('.video-wrap>.play-button').on('click', function (e) {
    console.log('click')
    var $wrap = $(this).parent();
    var index = $wrap.data('index');
    var src = $wrap.data('src');
    var name = $wrap.data('name');

    var str = '';
    str += '<video id="my_video_' + index + '" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}">';

    if (name.substr(-4) === ".mp4") {
      str += '<source src="' + src + '" type="video/mp4">';
    } else if (name.substr(-5) === ".webm") {
      str += '<source src="' + src + '" type="video/webm">';
    }
    str += '</video>';

    console.log('str', str)
    $wrap.append($(str));
    this.remove();
    console.log('index', index)
    console.log('src', src)

    var video = videojs('my_video_' + index, {
      playbackRates: [.5, 1, 1.25, 1.5, 1.75, 2, 2.5],
      controls: true,
      preLoad: "auto",
      plugins: {
        hotkeys: {
          seekStep: 5,
          enableNumbers: true,
          volumeStep: 0.1,
          enableVolumeScroll: true,
          alwaysCaptureHotkeys: true
        }
      }
    });
  });
});

// $(document).ready(function () {

//   $('.video-wrap>.video-js').map(function (index, item) {
//     videojs(item.id).ready(function () {
//       this.hotkeys({
//         volumeStep: 0.1,
//         seekStep: 5,
//         alwaysCaptureHotkeys: true,
//         enableVolumeScroll: true        
//         // enableModifiersForNumbers: false
//       });
//     });
//   });

// });