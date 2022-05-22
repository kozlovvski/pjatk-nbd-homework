const pipeline = [
  {
    $match: {
      birth_date: {
        $gte: '2000-01-01',
      },
    },
  },
  {
    $project: {
      first_name: 1,
      last_name: 1,
      city: '$location.city',
    },
  },
];

printjson(db.people.aggregate(pipeline).toArray());
