const fs = require('fs');

const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
};

const deleteFolder = (folder) => {
  fs.rmdirSync(folder, { recursive: true });
};

const createFile = (filename) => {
  fs.writeFile(filename, null, (err, data) => {
    if (err) {
      return err;
    }
    return;
  });
};

module.exports = {
  createFolder,
  deleteFolder,
  createFile,
};
