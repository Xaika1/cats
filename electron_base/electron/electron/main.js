const { app, BrowserWindow, ipcMain, safeStorage } = require('electron');
const fs = require('fs/promises');
const path = require('path');

app.commandLine.appendSwitch('lang', 'ru');

const API_URL = process.env.CATS_API_URL || 'http://127.0.0.1:8000/api';

const authFile = () => path.join(app.getPath('userData'), 'auth.json');

function encode(tokens) {
    const json = JSON.stringify(tokens);
    if (safeStorage.isEncryptionAvailable()) {
        return 'enc:' + safeStorage.encryptString(json).toString('base64');
    }
    return 'raw:' + Buffer.from(json).toString('base64');
}

function decode(content) {
    const [kind, payload] = [content.slice(0, 4), content.slice(4)];
    const buffer = Buffer.from(payload, 'base64');
    if (kind === 'enc:') return JSON.parse(safeStorage.decryptString(buffer));
    if (kind === 'raw:') return JSON.parse(buffer.toString('utf8'));
    return null;
}

function registerAuthStorage() {
    ipcMain.handle('auth:load', async () => {
        try {
            return decode(await fs.readFile(authFile(), 'utf8'));
        } catch {
            return null;
        }
    });

    ipcMain.handle('auth:save', async (_event, tokens) => {
        await fs.mkdir(app.getPath('userData'), { recursive: true });
        await fs.writeFile(authFile(), encode(tokens), { mode: 0o600 });
    });

    ipcMain.handle('auth:clear', async () => {
        await fs.rm(authFile(), { force: true });
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 860,
        minWidth: 900,
        minHeight: 640,
        title: 'Котокафе',
        backgroundColor: '#FBF7F0',
        autoHideMenuBar: true,
        icon: path.join(__dirname, '..', 'resources', 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            additionalArguments: [`--cats-api=${API_URL}`],
        },
    });

    win.removeMenu();
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    registerAuthStorage();
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
