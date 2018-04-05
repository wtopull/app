const getIp = () => {

  var networkInterfaces = require("os").networkInterfaces();
  var matches = [];

  Object.keys(networkInterfaces).forEach(function (item) {
    networkInterfaces[item].forEach(function (address) {
      if (address.internal === false && address.family === "IPv4") {
        matches.push(address.address);
      }
    });
  });

  return matches[0];
}

module.exports = getIp()