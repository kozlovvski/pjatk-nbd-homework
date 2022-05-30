const pipeline = [
  {
    $project: {
      nationality: 1,
      bmi: {
        $divide: [
          {
            $toDecimal: '$weight',
          },
          {
            $pow: [
              {
                $divide: [
                  {
                    $toDecimal: '$height',
                  },
                  100,
                ],
              },
              2,
            ],
          },
        ],
      },
    },
  },
  {
    $group: {
      _id: '$nationality',
      min: {
        $min: '$bmi',
      },
      max: {
        $max: '$bmi',
      },
      avg: {
        $avg: '$bmi',
      },
    },
  },
  {
    $project: {
      min: 1,
      max: 1,
      avg: 1,
    },
  },
];

printjson(db.people.aggregate(pipeline)._batch);
