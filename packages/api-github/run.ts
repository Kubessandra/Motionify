import { init, getNumberOfCommit } from "./src/index";

init({
  appId: "280653",
  privateKey: "",
});

const main = async () => {
  const nb = await getNumberOfCommit({
    timing: "month",
    repo: "motionify",
    owner: "kubessandra",
  });

  console.log(nb);
};

main();
