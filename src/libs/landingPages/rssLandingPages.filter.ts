const localList = require('./rssLandingPagesFilter.filter.json').words;

interface Options {
    list?: string[];
    emptyList?:boolean;
    exclude?: any;
    placeHolder:string;
    regex?:RegExp;
    replaceRegex?:RegExp;
}

export default class WordFilter {
    list:string[];
    emptyList:boolean;
    exclude: string[];
    placeHolder: string;
    regex:RegExp;
    replaceRegex:RegExp;

    constructor(config:Options) {
      this.list = config.emptyList && [] || Array.prototype.concat.apply(localList, [config.list || []]),
      this.exclude = config.exclude || [],
      this.placeHolder = config.placeHolder || '*',
      this.regex = config.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      this.replaceRegex = config.replaceRegex || /\w/g
    }
    init(config:Options) {
    }
/**
* Determine if a string contains profane language.
* @param {string} string - String to evaluate for profanity.
*/
isProfane(string:string) {
    return this.list
      .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
    }
    
    /**
    * Replace a word with placeHolder characters;
    * @param {string} string - String to replace.
    */
    replaceWord(string:string) {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder);
    }
    
    /**
    * Evaluate a string for profanity and return an edited version.
    * @param {string} string - Sentence to filter.
    */
    clean(string:string) {
    return string.split(/\b/).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join('');
    }
    
    /**
    * Add word(s) to blacklist filter / remove words from whitelist filter
    * @param {...string} word - Word(s) to add to blacklist
    */
    addWords() {
    let words = Array.from(arguments);
    
    this.list.push(...words);
    
    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
    }
    
    /**
    * Add words to whitelist filter
    * @param {...string} word - Word(s) to add to whitelist.
    */
    removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
    }
}
