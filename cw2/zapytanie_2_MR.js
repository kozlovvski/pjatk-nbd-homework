db.people.mapReduce(
  function () {
    emit('balance', {
      credit: this.credit.map(({ currency, balance }) => ({
        currency,
        balance: Number(balance),
      })),
    });
  },
  function (id, values) {
    const balanceSumsDict = values.reduce((total, { credit }) => {
      credit.forEach(({ currency, balance }) => {
        total = {
          ...total,
          [currency]: currency in total ? total[currency] + balance : balance,
        };
      });
      return total;
    }, {});

    return balanceSumsDict;
  },
  {
    out: {
      inline: 1,
    },
  }
);
