const pipeline = [
  {
    $group: {
      _id: '$job',
    },
  },
  {
    $project: {
      _id: 1,
    },
  },
];

printjson(db.people.aggregate(pipeline)._batch);
