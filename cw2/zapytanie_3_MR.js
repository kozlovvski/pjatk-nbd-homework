db.people.mapReduce(
  function () {
    emit('jobs', {
      job: this.job,
    });
  },
  function (id, values) {
    return Array.from(new Set(values.map(({ job }) => job)));
  },
  {
    out: {
      inline: 1,
    },
  }
);
