db.people.mapReduce(
  function () {
    emit('balance', {
      credit:
        this.sex === 'Female' && this.nationality === 'Poland'
          ? this.credit.map(({ currency, balance }) => ({
              currency,
              balance: Number(balance),
            }))
          : null,
    });
  },
  function (id, values) {
    let femalePolesCount = 0;
    const balanceSumsDict = values.reduce((total, { credit }) => {
      if (credit === null) {
        return total;
      }

      femalePolesCount++;

      credit.forEach(({ currency, balance }) => {
        total = {
          ...total,
          [currency]: currency in total ? total[currency] + balance : balance,
        };
      });
      return total;
    }, {});

    const finalDict = {};

    Object.entries(balanceSumsDict).forEach(([key, sum]) => {
      finalDict[key] = {
        sum,
        avg: sum / femalePolesCount,
      };
    });

    return finalDict;
  },
  {
    out: {
      inline: 1,
    },
  }
);
