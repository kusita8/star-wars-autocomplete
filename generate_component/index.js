const fs = require("fs");
const { component, styles, test } = require("./templates/default.js");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const COMPONENTS_DIR = "./src/components";

// <UTILS >
const throwError = (msg) => {
  console.error(msg);
  process.exit(1);
};

const ask = (question, errorMsg) =>
  new Promise((res) => {
    rl.question(question, function (answer) {
      if (answer) res(answer);
      else throwError(errorMsg);
    });
  });

const createFile = (fileName, content) =>
  new Promise((res, rej) => {
    fs.writeFile(fileName, content.trim(), (err) => {
      if (err) return rej(err);
      res();
    });
  });

const createFolder = (fileName) =>
  new Promise((res, rej) => {
    fs.mkdir(fileName, (err) => {
      if (err) return rej(err);
      res();
    });
  });

const getUserConfig = async () => {
  try {
    const name = await ask("Name: ", "Please provide a name");
    const folder = await ask("Folder ej: (atoms, molecules, etc): ", "Please provide a folder");

    return { name, folder };
  } catch {
    console.error("Oops, try again later.");
    process.exit(1);
  }
};
// </ UTILS>

(async () => {
  const { name, folder } = await getUserConfig();

  const componentFolder = `${COMPONENTS_DIR}/${folder}/${name}`;

  try {
    await createFolder(componentFolder);
    await createFolder(`${componentFolder}/__tests__/`);

    await createFile(`${componentFolder}/${name}.tsx`, component(name));
    await createFile(`${componentFolder}/${name}.css`, styles(name));
    await createFile(`${componentFolder}/__tests__/${name}.test.tsx`, test(name));
    console.log(`Component create successfully in: ${componentFolder}`);
    process.exit(0);
  } catch (e) {
    throwError(e);
  }
})();
