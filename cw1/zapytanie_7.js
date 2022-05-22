printjson(
  db.people.remove({
    $expr: { $gt: [{ $toDecimal: '$height' }, 190] },
  })
);
