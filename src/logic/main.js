import sjf from "./sjf";

const main = (processes) => {
  const result = sjf(processes);

  let l = result.length;
  const avg = {
    completionTime: 0,
    turnAroundTime: 0,
    waitingTime: 0,
    responseTime: 0,
  };
  result.forEach((process) => {
    avg.completionTime += process.completionTime;
    avg.turnAroundTime += process.turnAroundTime;
    avg.waitingTime += process.waitingTime;
    avg.responseTime += process.responseTime;
  });
  for (let key in avg) {
    avg[key] = parseFloat((avg[key] / result.length).toPrecision(2));
  }

  return { result, averages: avg };
};

export default main;
