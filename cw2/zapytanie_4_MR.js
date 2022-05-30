db.people.mapReduce(
  function () {
    emit('bmi', {
      height: Number(this.height),
      weight: Number(this.weight),
      nationality: this.nationality,
    });
  },
  function (id, values) {
    const nationalityBMIDict = values.reduce(
      (total, { height, weight, nationality }) => {
        const personBMI = weight / (height / 100) ** 2;
        return {
          ...total,
          [nationality]:
            nationality in total
              ? {
                  sum: total[nationality].sum + personBMI,
                  min: Math.min(total[nationality].min, personBMI),
                  max: Math.max(total[nationality].max, personBMI),
                  count: total[nationality].count + 1,
                }
              : { sum: personBMI, min: personBMI, max: personBMI, count: 1 },
        };
      },
      {}
    );

    const finalDict = {};

    Object.entries(nationalityBMIDict).forEach(
      ([key, { sum, count, ...rest }]) => {
        finalDict[key] = {
          ...rest,
          avg: sum / count,
        };
      }
    );

    return finalDict;
  },
  {
    out: {
      inline: 1,
    },
  }
);
