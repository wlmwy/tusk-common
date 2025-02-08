export default function () {
  if (PROD) {
    const logo = `
_____________________________________________________________________________________

___________            __             _________
\__    ___/_ __  _____|  | __         \_   ___ \  ____   _____   _____   ____   ____
  |    | |  |  \/  ___/  |/ /  ______ /    \  \/ /  _ \ /     \ /     \ /  _ \ /    \
  |    | |  |  /\___ \|    <  /_____/ \     \___(  <_> )  Y Y  \  Y Y  (  <_> )   |  \
  |____| |____//____  >__|_ \          \______  /\____/|__|_|  /__|_|  /\____/|___|  /
                    \/     \/                 \/             \/      \/            \/

_____________________________________________________________________________________
                              author:Tusk
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px;
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[Tusk]:dev mode...");
  }
}