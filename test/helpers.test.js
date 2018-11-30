const exportedObj = require('../js/helpers.js');

const { checkFrameNo, randomObstacleXCoordinate, prepareLeaderboardArr } = exportedObj;

describe('function checkFrameNo test', () => {
  it('should return true for frame number 1', () => {
    expect(checkFrameNo(1)).toBeTruthy();
  });

  it('should return true for frame number 500', () => {
    expect(checkFrameNo(500)).toBeTruthy();
  });

  it('should return false for frame number 2', () => {
    expect(checkFrameNo(2)).toBeFalsy();
  });

  it('should return false for frame number 250', () => {
    expect(checkFrameNo(250)).toBeFalsy();
  });
});

describe('function randomObstacleXCoordinate test', () => {
  it('should return number greater than 1 or equal', () => {
    expect(randomObstacleXCoordinate(500, 50)).toBeGreaterThanOrEqual(1);
  });

  it('should return number less than 450 or equal', () => {
    expect(randomObstacleXCoordinate(500, 50)).toBeLessThanOrEqual(450);
  });

  it('should return number greater than 1 or equal', () => {
    expect(randomObstacleXCoordinate(10, 2)).toBeGreaterThanOrEqual(1);
  });

  it('should return number less than 8 or equal', () => {
    expect(randomObstacleXCoordinate(10, 2)).toBeLessThanOrEqual(450);
  });
});

describe('function prepareLeaderboardArr test', () => {
  const someArr = [{ name: 'vasia', score: 20 }, { name: 'petia', score: 1 }, { name: 'gena', score: 900 },
    { name: 'vadim', score: 2 }, { name: 'alexander', score: 9999 }, { name: 'alex', score: 200 },
    { name: 'nadia', score: 30 }, { name: 'dima', score: 300 }, { name: 'sveta', score: 390 },
    { name: 'volodia', score: 40 }, { name: 'anna', score: 90 }, { name: 'boris', score: 22 },
    { name: 'pavel', score: 500 }, { name: 'artur', score: 700 }, { name: 'zina', score: 70 }];

  const resultArr = [{ name: 'alexander', score: 9999 }, { name: 'gena', score: 900 }, { name: 'artur', score: 700 },
    { name: 'pavel', score: 500 }, { name: 'sveta', score: 390 }, { name: 'dima', score: 300 },
    { name: 'alex', score: 200 }, { name: 'anna', score: 90 }, { name: 'zina', score: 70 },
    { name: 'volodia', score: 40 }];

  it('function should return sorted and cutted array', () => {
    expect(prepareLeaderboardArr(someArr)).toEqual(resultArr);
  });
});
