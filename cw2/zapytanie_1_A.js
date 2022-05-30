const pipeline = [
  {
    $group: {
      _id: 'height-weight',
      maleHeightSum: {
        $sum: {
          $cond: [
            { $eq: ['$sex', 'Male'] },
            {
              $toDecimal: '$height',
            },
            0,
          ],
        },
      },
      maleWeightSum: {
        $sum: {
          $cond: [
            { $eq: ['$sex', 'Male'] },
            {
              $toDecimal: '$weight',
            },
            0,
          ],
        },
      },
      maleCount: {
        $sum: {
          $cond: [{ $eq: ['$sex', 'Male'] }, 1, 0],
        },
      },
      femaleWeightSum: {
        $sum: {
          $cond: [
            { $eq: ['$sex', 'Female'] },
            {
              $toDecimal: '$weight',
            },
            0,
          ],
        },
      },
      femaleHeightSum: {
        $sum: {
          $cond: [
            { $eq: ['$sex', 'Female'] },
            {
              $toDecimal: '$height',
            },
            0,
          ],
        },
      },
      femaleCount: {
        $sum: {
          $cond: [{ $eq: ['$sex', 'Female'] }, 1, 0],
        },
      },
    },
  },
  {
    $project: {
      maleAvgHeight: {
        $divide: ['$maleHeightSum', '$maleCount'],
      },
      maleAvgWeight: {
        $divide: ['$maleWeightSum', '$maleCount'],
      },
      femaleAvgHeight: {
        $divide: ['$femaleHeightSum', '$femaleCount'],
      },
      femaleAvgWeight: {
        $divide: ['$femaleWeightSum', '$femaleCount'],
      },
    },
  },
];

printjson(db.people.aggregate(pipeline)._batch);
