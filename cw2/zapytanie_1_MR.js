db.people.mapReduce(
  function () {
    emit('height-weight', {
      height: Number(this.height),
      weight: Number(this.weight),
      sex: this.sex,
    });
  },
  function (id, values) {
    const { male, female } = values.reduce(
      (total, { height, weight, sex }) => {
        if (sex === 'Male') {
          return {
            female: total.female,
            male: {
              heightSum: total.male.heightSum + height,
              weightSum: total.male.weightSum + weight,
              count: total.male.count + 1,
            },
          };
        } else {
          return {
            male: total.male,
            female: {
              heightSum: total.female.heightSum + height,
              weightSum: total.female.weightSum + weight,
              count: total.female.count + 1,
            },
          };
        }
      },
      {
        male: { heightSum: 0, weightSum: 0, count: 0 },
        female: { heightSum: 0, weightSum: 0, count: 0 },
      }
    );

    return {
      maleAvgHeight: male.heightSum / male.count,
      maleAvgWeight: male.weightSum / male.count,
      femaleAvgHeight: female.heightSum / female.count,
      femaleAvgWeight: female.weightSum / female.count,
    };
  },
  {
    out: {
      inline: 1,
    },
  }
);
