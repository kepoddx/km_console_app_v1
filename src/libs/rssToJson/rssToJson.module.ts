const axios = require('axios')
const xml2js = require('xml2js')
import RssParser from './RSSparser.module';

const rssAxios = axios.create();

export default class RssFeed {
  public xmlParser: any;
  _options: any;
  _client: any;
  /**
   * @param {Object} options
   */
  constructor (options = {}) {
    console.log("Defaults", axios.defaults)
    this.client = rssAxios;
    this.options = options
    this.xmlParser = new xml2js.Parser({trim: false, normalize: true, mergeAttrs: true})
  }

  /**
   * @returns {Object}
   */
  get options () {
    return this._options || {
      timeout: 540000,
      count: null,
      headers: {}
    }
  }

  /**
   * @param {Object} options
   */
  set options (options) {
    this._options = Object.assign({}, this.options, options)
  }

  /**
   * @param {String} url
   * @param {Object} options
   * @returns {Promise}
   */
  load (url: string, options = {}) {
    this.options = options

    return this.sendRequest(url)
      .then((response: any) => {
        return this.parseXmlToJson(response.data)
      }).then((json:any) => {
        return this.parseFeed(json)
      })
  }

  /**
   * @param {String} url
   * @returns {Promise}
   */
  sendRequest (url:string) {
    this.options.headers = Object.assign({}, this.options.headers, {
      Accept: 'application/rss+xml'
    })

    return this.client.get(url, this.options)
  }

  /**
   * @param {String} xml
   * @returns {Promise}
   */
  parseXmlToJson (xml:string) {
    return new Promise((resolve, reject) => {
      const escaped = xml.replace(/\s&\s/g, ' &amp; ')
      this.xmlParser.parseString(escaped, (error:any, json:any) => {
        if (error) {
          // tslint:disable-next-line: no-void-expression
          return reject(error)
        }
// tslint:disable-next-line: no-void-expression
        return resolve(json)
      })
    })
  }

  /**
   * @param {Object} data
   * @returns {Promise}
   */
  parseFeed (data:any) {
    return new Promise((resolve, reject) => {
      if (data.rss) {
        const rssParser = new RssParser(this.options)
        // tslint:disable-next-line: no-void-expression
        return resolve(rssParser.parse(data.rss.channel[0]))
      }
// tslint:disable-next-line: no-void-expression
      return reject(new Error('Unknown feed type'))
    })
  }

  /**
   *
   * @return {axios}
   */
  get client () {
    return this._client
  }

  /**
   *
   * @param value
   */
  set client (value) {
    this._client = value;
  }
}

