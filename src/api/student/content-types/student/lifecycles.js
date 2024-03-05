const crypto = require("crypto");
const md5 = require("md5");

module.exports = {
  async beforeCreate(event) {
    console.log(`beforeCreate is working...`, event.params.data);
    const sha256 = crypto.createHash("sha256");
    sha256.update(event.params.data.phone_number);
    const hash = sha256.digest("hex");
    event.params.data.phone_number = hash;
  },
  async afterCreate(event) {
    console.log(`afterCreate is working...`, event.params.data);
    const md5_128 = md5(event.params.data.phone_number);
    const decode = md5_128.slice(0, 10);
    event.params.data.phone_number = decode;
  }
};
