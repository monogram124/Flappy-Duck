const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const {webFrame} = require('electron');

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 650, 
        height: 850, 
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