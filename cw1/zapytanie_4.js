printjson(
  db.people
    .find({
      $and: [
        { $expr: { $gte: [{ $toDecimal: '$weight' }, 68] } },
        { $expr: { $lt: [{ $toDecimal: '$weight' }, 71.5] } },
      ],
    })
    .toArray()
);
