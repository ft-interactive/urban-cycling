export default _ => ({ // eslint-disable-line

  // link file UUID
  id: '76e4b03e-7071-11e6-a0c9-1365ce54b926',

  // canonical URL of the published page
  // https://ig.ft.com/sites/urban-cycling get filled in by the ./configure script
  url: 'https://ig.ft.com/sites/urban-cycling',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2016-09-02T03:00:00Z'),

  headline: 'Is urban cycling worth the risk?',

  // summary === standfirst (Summary is what the content API calls it)
  summary: '',

  topic: {
    name: 'FT Magazine',
    url: 'https://www.ft.com/magazine',
  },

  // relatedArticle: {
  //   text: 'Related article »',
  //   url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  // },

  mainImage: {
    title: 'Is urban cycling worth the risk?',
    description: '',
    url: 'https://ig.ft.com/sites/urban-cycling/assets/header-landscape.png',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  // byline: [
    // { name: 'Author One', url: '/foo/bar' },
    // { name: 'Author Two' },
  // ],

  // Appears in the HTML <title>
  title: 'Is urban cycling worth the risk?',

  // meta data
  description: 'How do the benefits of exercise compare to the harm from pollution?',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary_large_image',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://ig.ft.com/sites/urban-cycling/assets/header-landscape.png',
  socialHeadline: 'Is urban cycling worth the risk?',
  socialSummary:  'How do the benefits of exercise compare to the harm from pollution?',

  // TWITTER
  // twitterImage: '',
  // twitterCreator: '@individual's_account',
  tweetText:  'Urban cycling: the trade-off between exercise, safety and pollution',
  // twitterHeadline:  'How do the benefits of exercise compare to the harm from pollution?',

  // FACEBOOK
  // facebookImage: '',
  // facebookHeadline: 'How do the benefits of exercise compare to the harm from pollution?',

  onwardjourney: {

    // list (methode list) or topic
    type: '',

    // topic or list id
    id: '',

    // a heading is provided automatically if not set (peferred)
    heading: '',
  },

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
