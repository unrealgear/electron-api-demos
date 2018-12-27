'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.should()
chai.use(chaiAsPromised)

class GettingStartedPage {

  constructor (client) {
    this.client = client
  }

  get headerOfPlayAlongSection () { return '.play-along h2' }
  get headerOfAboutSection () { return '.about-code h2' }
  get paragraphOfPlayAlongSection () { return '.play-along p' }
  get buttonGetStarted () { return '#get-started' }

  async checkTextOfHeaderOfPlayAlongSection (text) {
    (await this.client.getText(this.headerOfPlayAlongSection)).should.equal(text, 'The header of Play Along section is ' +
      'incorrect')
  }

  async checkTextOfHeaderOfAboutSection (text) {
    await this.client.getText(this.headerOfAboutSection).should.eventually.equal(text, 'The header of About section is incorrect')
  }

  async checkTextOfParagraphOfPlayAlongSection (text) {
    (await this.client.getText(this.paragraphOfPlayAlongSection)).should.equal(text, 'The paragraph of Play Along section is ' +
      'incorrect')
  }

  async verifyEnabledButtonGetStarted () {
    await this.client.isEnabled(this.buttonGetStarted).should.eventually.equal(true, 'Get started button is not enabled')
  }

  open (path) {
    this.client.url(path)
  }
}

module.exports = GettingStartedPage
