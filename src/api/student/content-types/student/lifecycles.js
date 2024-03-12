// import { SHA256 } from 'crypto-js';
// const cryptoJS = require('crypto-js')
const appId = 'api::student.student'


module.exports = {
  async beforeCreate(event) {
    const phone = event.params.data.phone_number
    event.params.data.phone_number = await strapi.service(appId).encrypt(phone)
  },

  async afterFindOne(event) {
    if (event.result && event.result.phone_number) {
      const phone = event.result.phone_number;
      event.result.phone_number = await strapi.service(appId).decrypt(phone);
    }
  },

  async afterFindMany(event) {
    if (event.result) {
      await Promise.all(event.result.map(async result => {
        if (result && result.phone_number) {
          result.phone_number = await strapi.service(appId).decrypt(result.phone_number);
        }
      }));
    }
  },
};
