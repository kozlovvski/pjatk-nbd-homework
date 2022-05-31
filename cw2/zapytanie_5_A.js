const pipeline = [
  {
    $match: {
      sex: 'Female',
      nationality: 'Poland',
    },
  },
  {
    $facet: {
      femalePoles: [
        {
          $count: 'count',
        },
      ],
      balances: [
        {
          $unwind: '$credit',
        },
        {
          $group: {
            _id: '$credit.currency',
            sum: {
              $sum: {
                $toDecimal: '$credit.balance',
              },
            },
          },
        },
      ],
    },
  },
  {
    $unwind: '$balances',
  },
  {
    $project: {
      currency: '$balances._id',
      sum: '$balances.sum',
      avg: {
        $divide: [
          '$balances.sum',
          {
            $first: '$femalePoles.count',
          },
        ],
      },
    },
  },
];

printjson(db.people.aggregate(pipeline)._batch);
