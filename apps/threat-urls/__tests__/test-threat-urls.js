'use strict'

const ThreatUrls = require('../threat-urls')

describe('it should identify the correct urls', () => {
  var threatUrls
  beforeAll(() => {
    var text = '<http://dmv.ca.gov/> <https://www.google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286>  &lt; klj <http://www.nasa.gov|www.nasa.gov> <http://www.dmv.ca.gov|www.dmv.ca.gov> <@UH89V07L0|miller.tim108>'
    threatUrls = new ThreatUrls(text)
  })

  it('should find all the text portions that link somewhere', () => {
    expect(threatUrls.escapedSections).toHaveLength(5)
  })

  it('should filter the links down to urls', () => {
    expect(threatUrls.wholeUrls).toHaveLength(4)
  })

  it('should strip the urls of their prefixes', () =>
    expect(threatUrls.urlDomains).toEqual([
      '<dmv.ca.gov/>',
      '<google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286>',
      '<nasa.gov|',
      '<dmv.ca.gov|'
    ])
  )

  it('should strip the escape character', () => {
    expect(threatUrls.bareUrls).toEqual([
      'dmv.ca.gov/',
      'google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286',
      'nasa.gov',
      'dmv.ca.gov'
    ])
  })

  it('should return an array of unique threat url domains', () => {
    expect(threatUrls.threatUrls).toEqual([
      'dmv.ca.gov',
      'google.com/maps/place/Emeril\'s+New+Orleans/@29.944616,-90.0694747,17z/data=!3m1!4b1!4m5!3m4!1s0x8620a6718f86a9a7:0x6ab2069a8e2a2d7d!8m2!3d29.944616!4d-90.067286',
      'nasa.gov'
    ])
  })
})
