'use strict';

/**
 * student service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const cryptoJS = require('crypto-js')


module.exports = createCoreService('api::student.student', ({ strapi }) => ({
  async encrypt(phone) {
    return cryptoJS.AES.encrypt(phone, process.env.SECRET_KEY).toString()
  },
  async decrypt(phone) {
    return cryptoJS.AES.decrypt(phone, process.env.SECRET_KEY).toString(cryptoJS.enc.Utf8)
  }
}));
