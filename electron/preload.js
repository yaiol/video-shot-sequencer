// Exposes the bare minimum needed by the renderer:
//   electronAPI.getFilePath(file) - resolves a dropped File/folder to its
//   absolute OS path. Required because Electron 32+ removed `file.path` from
//   the renderer sandbox. Used for drag-and-drop folder loading.
const { contextBridge, webUtils } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getFilePath: (file) => webUtils.getPathForFile(file),
});
