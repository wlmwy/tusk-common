import { isFunction, each } from "lodash-es";
import shell from "shelljs";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    // 开始打包前，删除指定文件
    buildStart() {
      each(rmFiles, (fName) => {
        shell.rm("-rf", fName);
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    // 打包结束后，无错误则执行回调
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
