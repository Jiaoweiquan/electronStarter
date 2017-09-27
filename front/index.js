const {remote } = require('electron')
const {app, Menu} = remote;

const popBtn = document.getElementById('pop');
const menu_template = [
  {
    label: 'hi',
    click: () => console.log('clicked me'),
    accelerator: 'Tab'
  }
]

remote.globalShortcut.register('Tab', () => {
  console.log('Hi tab')
  // Do stuff when Y and either Command/Control is pressed.
})

popBtn.onclick = () => {
  const win = remote.getCurrentWindow();
  let menu = Menu.buildFromTemplate(menu_template)
  menu.popup()
  console.log('current window', win);
}