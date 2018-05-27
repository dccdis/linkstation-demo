const _ = require('lodash');
const stations = require('../data/stations.json');

function printUsage() {
  console.info('Usage:');
  console.info('node src/main.js <x-coordinate> <y-coordinate>');
  console.info('x-coordinate and y-coordinate being the point where you want to find the optimal linkstation from');
}

function printFoundStation(station, point) {
  const x = _.get(point, 'x');
  const y = _.get(point, 'y');
  const stationx = _.get(station, 'x');
  const stationy = _.get(station, 'y');
  const stationpower = _.get(station, 'power');
  console.info(`Best link station for point ${x},${y} is ${stationx},${stationy} with power ${stationpower}`);
}

function printNoStationFound(point) {
  const x = _.get(point, 'x');
  const y = _.get(point, 'y');
  console.info(`No link station within reach for point ${x},${y}`);
}

// Highschool mathematics warning, dist = sqrt((x1-x2)^2 + (y1-y2)^2)
function calculateDistance(point, station) {
  const x1 = _.get(point, 'x', 0);
  const x2 = _.get(station, 'x', 0);
  const y1 = _.get(point, 'y', 0);
  const y2 = _.get(station, 'y', 0);
  const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  return distance;
}

function calculatePower(point, station) {
  const distance = calculateDistance(point, station);
  const reach = _.get(station, 'reach');
  let power;
  if (distance < reach) {
    power = Math.pow((reach - distance), 2);
  } else {
    power = 0
  }
  return power;
}

function findOptimalStation(point) {
  const options = [];
  stations.forEach(stationOption => {
    const power = calculatePower(point, stationOption);
    _.set(stationOption, 'power', power);
    if (power > 0) {
      options.push(stationOption);
    };
  })
  const optimal = _.maxBy(options, function(f) {
    return f.power;
  });
  return optimal;
}

if (require.main === module) {
  if (process.argv.length != 4) {
    printUsage();
  } else {
    const point = {
      x: parseInt(process.argv[2]) || 0,
      y: parseInt(process.argv[3]) || 0,
    };
    const optimalStation = findOptimalStation(point);
    if (!_.isNil(optimalStation)) {
      printFoundStation(optimalStation, point);
    } else {
      printNoStationFound(point);
    }
  }
}
