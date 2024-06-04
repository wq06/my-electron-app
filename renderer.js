/*window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        console.log(process.versions[dependency],process.versions,'sdf')
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})*/


const information = document.getElementById('info');

information.innerText = `本应用正在使用 Chrome (v${version.chrome()}), Node js (v${version.node()}), 和 Electron (v${version.electron()})`;

const func = async () => {
    const response = await window.version.ping();
    console.log(response);
}

func();