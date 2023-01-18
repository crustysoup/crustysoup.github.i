const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const DiscordRPC = require('discord-rpc');
const clientId = '887769178499592213'; DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1520,
    height: 960,
	title: "Loading...",
	icon: __dirname + '/favicon.ico',
	webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null);
  win.loadURL('https://play.cpadvanced.net/fullscreen.html')
}

 
ipcMain.on('rpcupdate', (event, arg) => {
  args = arg.split("&")
  console.log(args[0] + ", " + args[1])
  
  rpc.on('ready', () => {
    rpc.setActivity({
      details: args[0], 
      state: args[1], 
      startTimestamp, 
      largeImageKey: `icon`, 
		});
	});
	
	rpc.login({
		clientId
	}).catch(console.error);
})

app.whenReady().then(() => {
  createWindow()
  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})