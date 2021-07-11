const Tracker = require('../lib/Tracker');

const initializeApp = () => {
  return new Tracker().startTracker();
};

module.exports = initializeApp();