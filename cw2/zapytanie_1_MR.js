db.people.mapReduce(
  function () {
    emit('height-weight', {
      height: Number(this.height),
      weight: Number(this.weight),
    });
  },
  function (id, values) {
    const { heightSum, weightSum } = values.reduce(
      (total, { height, weight }) => {
        return {
          heightSum: total.heightSum + height,
          weightSum: total.weightSum + weight,
        };
      },
      { heightSum: 0, weightSum: 0 }
    );

    return {
      height: heightSum / values.length,
      avgWeight: weightSum / values.length,
    };
  },
  {
    out: {
      inline: 1,
    },
  }
);
