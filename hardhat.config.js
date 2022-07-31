require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks:{
    rinkeby: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: './src/artifacts'
  },
  solidity: "0.8.15",
};
