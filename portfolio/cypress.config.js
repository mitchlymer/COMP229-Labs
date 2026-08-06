const { defineConfig } = require("cypress");

module.exports = defineConfig({
    allowCypressEnv: false,

    e2e: {
        baseUrl: "http://localhost:3001",

        setupNodeEvents(on, config) {
            // No custom Node events are required.
        }
    }
});