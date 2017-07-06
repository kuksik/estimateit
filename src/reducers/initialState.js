export default {
  header: {
    tasks: [],
    parentTaskId: '',
    developmentTime: {
      time: [],
      percent: [],
      totalHours: 0,
      devHours: {
        minHours: 0,
        maxHours: 0,
      },
    },
    infoCollector: {
      technologies: [],
    },
  },
  main: {
    estimateOptions: {
      qa: 10,
      pm: 10,
      risks: 10,
      bugFixes: 10,
      completing: 100,
    },
    devHours: {
      minHours: 0,
      maxHours: 0,
    },
  },
};
