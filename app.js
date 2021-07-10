const Tracker = require('./lib/Tracker');

console.log(`
================
EMPLOYEE TRACKER
================
`)

const runTracker = ()=> {
  //while (new Tracker().startTracker()) {
  //  continue;
  //}
  console.log(new Tracker().startTracker());
}

runTracker();