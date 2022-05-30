const pipeline = [
  {
    $unwind: '$credit',
  },
  {
    $group: {
      _id: '$credit.currency',
      balance: {
        $sum: {
          $toDecimal: '$credit.balance',
        },
      },
    },
  },
  {
    $project: {
      balance: 1,
    },
  },
];

printjson(db.people.aggregate(pipeline)._batch);
