const {app, BrowserWindow, ipcMain} = require("electron");
const path = require('node:path');

/**
 * 创建 Browser Window 实例 加载index.html
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // __dirname 字符串指向当前正在执行脚本的路径 (在本例中，它指向你的项目的根文件夹)。
            // path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 加载 index.html
    win.loadFile('index.html');

    // 打开开发工具
    // win.webContents.openDevTools()
}

/**
 * 在 ready 事件被激发后 创建浏览器窗口
 * // 这段程序将会在 Electron 结束初始化
 * // 和创建浏览器窗口的时候调用
 * // 部分 API 在 ready 事件触发后才能使用。
 */
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');
    createWindow();

    /**
     * 如果没有窗口打开则打开一个窗口（macOs）
     * // 在 macOS 系统内, 如果没有已开启的应用窗口
     *     // 点击托盘图标时通常会重新创建一个新窗口
     */
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })

})

/**
 * 监听关闭所有窗口时退出应用
 * // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
 * // 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
 * // 直到用户使用 Cmd + Q 明确退出
 */
app.on('window-all-closed', () => {
    // 不是在macOs 上运行程序  调用app.quit()
    if (process.platform !== 'darwin') app.quit();
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
