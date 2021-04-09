const Record = require('../models/record');
/*
   1.Add a new field to the documents using '$addFields' (ie totalCount),
   2.query it with '$match'
   3.finally only pick the fields we need using '$project'
*/
const getRecords = (startDate, endDate, minCount, maxCount) => {
    return Record.aggregate([
        { $addFields: { totalCount: { $reduce: { "input": "$counts", "initialValue": 0, "in": { "$add": ["$$value", "$$this"] } } } } },
        { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, totalCount: { $gt: minCount, $lt: maxCount } } },
        { $project: { key: 1, totalCount: 1, createdAt: 1, _id: 0 } }
    ]);
}

module.exports = { getRecords }