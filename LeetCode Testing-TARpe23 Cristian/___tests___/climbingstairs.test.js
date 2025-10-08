const climbStairs = require('../src/cllimbingstairs.js');

describe('LeetCode #70 — Climbing Stairs', () => {
  test('n = 3 → 3', () => {
    expect(climbStairs(3)).toBe(3);
  });
  
  test('n = 4 → 5', () => {
    expect(climbStairs(4)).toBe(5);
  });

  test('n = 5 → 8', () => {
    expect(climbStairs(5)).toBe(8);
  });

  test('n = 10 → 89', () => {
    expect(climbStairs(10)).toBe(89);
  });
});
