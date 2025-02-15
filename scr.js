const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 600, 
        height: 750, 
        icon: 'img/icon.ico'

    });


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.setMenu(null);
    
    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);