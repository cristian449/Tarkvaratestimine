//Ei osand teha seda 

const { minDepth } = require('../src/binarytreemindepht.js');

describe('LeetCode #111 — Minimum Depth of Binary Tree', () => {
  test('[3,9,20,null,null,15,7] → 2', () => {
    const root = ([3, 9, 20, null, null, 15, 7]);
    expect(minDepth(root)).toBe(2);
  });

  test('Right-skewed tree [1,null,2,null,3] → depth 3', () => {
    const root = ([1, null, 2, null, 3]);
    expect(minDepth(root)).toBe(3);
  });

  test('Empty tree → depth 0', () => {
    const root = ([]);
    expect(minDepth(root)).toBe(0);
  });
});
