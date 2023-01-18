const { ipcRenderer } = require('electron')

function updateRPC(){
	details = document.getElementById("CPA_GameSection").getAttribute("details");
	state = document.getElementById("CPA_GameSection").getAttribute("state");

	ipcRenderer.send('rpcupdate', details + "&" + state)
}

setInterval(updateRPC, 10000)