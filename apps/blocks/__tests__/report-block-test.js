'use strict'

const { reportIn, blockOut } = require('../test-data/report-block-data')
const ReportBlock = require('../report-block')

describe('builds the slack blocks for threat reports', () => {
  it('should have one threat match of each type', () => {
    expect(new ReportBlock().message(reportIn)).toEqual(blockOut)
  })
})
