const { deleteDuplicates, arrayToList, listToArray } = require('../src/removeduplicates.js');

describe('LeetCode #83 — Remove Duplicates from Sorted List', () => {
  test('[1,1,2] → [1,2]', () => {
    const head = arrayToList([1, 1, 2]);
    const result = deleteDuplicates(head);
    expect(listToArray(result)).toEqual([1, 2]);
  });

  test('[1,1,2,3,3] → [1,2,3]', () => {
    const head = arrayToList([1, 1, 2, 3, 3]);
    const result = deleteDuplicates(head);
    expect(listToArray(result)).toEqual([1, 2, 3]);
  });

  test('Empty list → []', () => {
    const head = arrayToList([]);
    const result = deleteDuplicates(head);
    expect(listToArray(result)).toEqual([]);
  });

  

  test('List with no duplicates remains unchanged', () => {
    const head = arrayToList([1, 2, 3, 4]);
    const result = deleteDuplicates(head);
    expect(listToArray(result)).toEqual([1, 2, 3, 4]);
  });
});
