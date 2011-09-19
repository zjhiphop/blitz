setting = 
  container : 'video'
  video_id : 'video_element'
  src : 'tim-kort.f4v'
  width : $j('#video').width()+'px'
  height :$j('#video').height()+'px'
  preload : true
  autoplay : true
  fullScreenSelector : '.fullscreen'
  playBtnSelector:'#play_video'
  useFlash:parseInt(location.hash.split('=')[1])
  handler : 
    play : () ->
      console.log 'played'
    fullscreen : ()-> 
      if $j('.fullscreen')[0].value is '[enter fullscreen]' 
      then $j('.fullscreen')[0].value = '[exit fullscreen]'
      else $j('.fullscreen')[0].value = '[enter fullscreen]'
    playBtnClickHandler: ()->
      video = $j('#video_element')[0]
      if video.getCurrentState() is 'paused' 
         $j('#play_video')[0].value = '[pause]'
         video.play()
      else 
         $j('#play_video')[0].value = '[play]'
         video.pause()
    waiting:()->
      console.log 'loading..' 
ET.School.UI.Common.VideoPlayer.create setting