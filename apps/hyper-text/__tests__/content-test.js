const {
  validateDestUrl, validateDisplayText, setAllSharedAsHttpSecure,
  getMarkdownHyperText, setHttpDestUrl
} = require('../content')
const {
  validUrls, displayTexts,
  markdownHyperText, httpUrls,
  inputMessageDataOne, outputMessageDataOne,
  inputMessageDataTwo, outputMessageDataTwo
} = require('../test-data/content-data')

test.each(validUrls)(
  'validateDestUrl() /* must fit the correct format of a url */',
  (destUrl, expectedBoolean) => {
    expect(validateDestUrl(destUrl)).toBe(expectedBoolean)
  })

test.each(displayTexts)(
  'validateDisplayText() /* link string cannot be blank or only spaces */',
  (displayText, expectedBoolean) => {
    expect(validateDisplayText(displayText)).toBe(expectedBoolean)
  })

test.each(markdownHyperText)(
  'getMarkdownHyperText() /* identify entire portion of markdown syntax from original user input */',
  (hyperTextPositions, text, expectedMarkdown) => {
    expect(getMarkdownHyperText(hyperTextPositions, text)).toEqual(expectedMarkdown)
  })

test.each(httpUrls)(
  'setHttpDestUrl() /* each link has http or https in the url */', (inputUrl, expectedUrl) => {
    expect(setHttpDestUrl(inputUrl)).toEqual(expectedUrl)
  })

test.each([
  [inputMessageDataOne, outputMessageDataOne],
  [inputMessageDataTwo, outputMessageDataTwo]
])(
  'setAllSharedAsHttpSecure() /* all urls were originally prefaced with https */',
  (inputMessageData, outputMessageData) => {
    expect(setAllSharedAsHttpSecure(inputMessageData)).toEqual(outputMessageData)
  }
)
