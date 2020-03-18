'use strict'

const ThreatReports = require('../threat-reports')
const ThreatReportData = require('../../__test-data__/threat-report-data')

var urls = ['testsafebrowsing.appspot.com/s/phishing.html', 'testsafebrowsing.appspot.com/s/unwanted.html', 'testsafebrowsing.appspot.com/s/malware.html', 'nasa.gov']

describe('threats found in cache and safebrowse', ()=> {
  var threatReportData = new ThreatReportData(urls)
  var threatReports = new ThreatReports(urls)

  it('should create a report of all request urls ', ()=>{
    expect(threatReports.allUrls).toEqual(threatReportData.userSubmittedUrls)
  })

  it('should return urls that are not in the cache', () => {
    threatReports.fromCache = threatReportData.urlsInCache
    expect(threatReports.notInCache).toEqual([
      'testsafebrowsing.appspot.com/s/unwanted.html',
      'nasa.gov'
    ])
  })

})
