const { remote,desktopCapturer, shell } = require('electron')
const {app, Menu} = remote;

const popBtn = document.getElementById('pop');
const menu_template = [
  {
    label: 'hi',
    click: () => console.log('clicked me'),
    accelerator: 'Tab'
  }
]

popBtn.onclick = () => {
  const win = remote.getCurrentWindow();
  let menu = Menu.buildFromTemplate(menu_template)
  menu.popup()
  console.log('current window', win);
}

//bind events
bindBtns({
  'open_win': openGithubWindow,
  'capture': captureVideo,
})

function bindBtns(obj) {
  for(let k in obj) {
    document.getElementById(k).onclick = obj[k];
  }
}
var cnt = 0;
function openGithubWindow() {
  cnt++;
  const {
    BrowserWindow
  } = remote;

  let win = new BrowserWindow({
    // frame: false,
    titleBarStyle: cnt%2 ? 'hiddenInset' : 'hidden',
    icon: '/Users/jiaow/Pictures/Snip20170708_7.png',
    backgroundColor: '#2b3137'
  })
  // win.setFullScreen(true);
  win.on('closed', () => {
    // win = null
    console.log('close')
  })
  win.loadURL('https://github.com')
}

function captureVideo() {
  console.log('Start capture video')
  desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
    if (error) throw error
    for (let i = 0; i < sources.length; ++i) {
      console.log(i, ':', sources[i].name)
      if (sources[i].name === 'Pictures') {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }, handleStream, handleError)
        return
      }
    }
  })

  function handleStream(stream) {
    console.log('Got stream.')
    document.querySelector('video').src = URL.createObjectURL(stream)
  }

  function handleError(e) {
    console.log('Cant get stream')
    console.log(e)
  }
}