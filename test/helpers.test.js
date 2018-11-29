const exportedObj = require('../js/helpers.js');

const checkFrameNo = exportedObj.checkFrameNo;
const randomObstacleXCoordinate = exportedObj.randomObstacleXCoordinate;

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

  it('should return false for frame number 499', () => {
    expect(checkFrameNo(499)).toBeFalsy();
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
