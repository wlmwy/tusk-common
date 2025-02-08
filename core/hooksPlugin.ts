import { each, isFunction } from 'lodash-es';
import shell from 'shelljs';

export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: 'hooks-plugin',
    // 开始打包前，删除指定文件
    buildStart() {
      each(rmFiles, (fName) => {
        shell.rm('-rf', fName);
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    // 打包结束后，无错误则执行回调
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}