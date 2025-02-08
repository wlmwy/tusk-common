import { makeInstaller } from '@tusk-common/utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import printLogo from './printLogo';
import components from './components';
import '@tusk-common/theme/index.css';

printLogo();

library.add(fas);
const installer = makeInstaller(components);

// 把所有components组件从这里导出
export * from '@tusk-common/components';
// export * from '../packages/components'

export default installer;
