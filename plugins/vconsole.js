import VConsole from 'vconsole'

const ua = window ? window.navigator.userAgent.toLowerCase() : ''
// console.log('vconsole',ua);

const isWindows = ua.indexOf('window') !== -1
// console.log('isWindows',isWindows);
const vConsole =
  (process.env.DGG_SERVER_ENV === 'development' ||
    process.env.DGG_SERVER_ENV === 'release') &&
  !isWindows
    ? new VConsole()
    : ''
export default vConsole
