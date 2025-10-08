const longestCommonPrefix = require('../src/longestCommonPrefix.js');

describe('LeetCode #14 — Longest Common Prefix', () => {

  test('Kui ainult üks sõna', () => {
    expect(longestCommonPrefix(["hello"])).toBe("hello");
  });

  test('Kui mõni string on tühi', () => {
    expect(longestCommonPrefix(["", "b", "c"])).toBe("");
  });

  test('Kui kõik sõnad on identsed', () => {
    expect(longestCommonPrefix(["same", "same", "same"])).toBe("same");
  });

  test('Osaliselt kattuvad sõnad', () => {
  expect(longestCommonPrefix(["interview", "internet", "internal"])).toBe("inter");
  });

});
