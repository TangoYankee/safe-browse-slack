'use strict'

const ThreatReports = require('../threat-reports')
const ThreatReportData = require('../../threat-cache/test-data/threat-report-data')

var urls = ['testsafebrowsing.appspot.com/s/phishing.html', 'testsafebrowsing.appspot.com/s/unwanted.html', 'testsafebrowsing.appspot.com/s/malware.html', 'nasa.gov']

describe('threats found in cache and safebrowse', ()=> {
  var threatReportData = new ThreatReportData(urls)
  var threatReports = new ThreatReports(urls)
  it('should create a report of all request urls ', ()=>{
    expect(threatReports.allUrls).toEqual(threatReportData.userSubmittedUrls)
  })
})
