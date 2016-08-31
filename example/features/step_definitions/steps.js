var pc = require('../../../lib');

var steps = function() {
  var seleniumAddress = 'http://localhost:4444/wd/hub';
  var options = { browser : 'chrome', timeout : 100000, uniqueBrowser:true };
  this.World = pc.world(seleniumAddress, options);

  this.After(function (scenario, callback) {
          if(scenario.isFailed()){
              this.browser.takeScreenshot().then(function (buffer) {
                 scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
              });
          };
          if(!options.uniqueBrowser){
            this.quit(callback);
          }
          else{
             callback();
          }

  });
  this.After({tags: ["@final"]}, function (scenario, callback) {
      this.quit(callback);
  });
};

module.exports = steps;
