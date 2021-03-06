'use strict';

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
    const ctx = this.app.createAnonymousContext();
    // make sure total table has the 'total' row.
    await ctx.model.Total.init();
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
};
