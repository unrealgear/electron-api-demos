'use strict'

const Application = require('spectron').Application
const electron = require('electron')
const path = require('path')
const setup = require('../setup')
const GettingStartedPage = require('../pagemodels/GettingStartedPage.js')

const timeout = process.env.CI ? 30000 : 10000

describe('demo app', function () {
  this.timeout(timeout)

  let app

  const startApp = async () => {
    app = new Application({
      path: electron,
      args: [
        path.join(__dirname, '..', '..')
      ],
      waitTimeout: timeout
    })

    await app.start().then((ret) => {
      setup.setupApp(ret)
    })
  }

  const restartApp = async () => {
    await app.restart().then((ret) => {
      setup.setupApp(ret)
    })
  }

  var page

  beforeEach('start app', async () => {
    setup.removeStoredPreferences()
    await startApp()
  })

  beforeEach('create page', () => {
    page = new GettingStartedPage(app.client)
  })

  afterEach(async () => {
    if (app && app.isRunning()) {
      await app.stop()
    }
  })

  it('verify "get started" button', async () => {
    await page.verifyEnabledButtonGetStarted()
  })

  it('check header of Play Along section', async () => {
    await page.checkTextOfHeaderOfPlayAlongSection('Play Along')
  })

  it('check header of About section', async () => {
    await page.checkTextOfHeaderOfAboutSection('About the Code')
  })
})
