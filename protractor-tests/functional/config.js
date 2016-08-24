exports.config = {
  // make sure to start local selenium server: terminal $webdriver-manager start
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['index-spec.js']
};
