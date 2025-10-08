const lengthOfLastWord = require('../src/lengthoflastword');

describe('LeetCode #58 — Length of Last Word', () => {
  test('Hello World! → 6', () => {
    expect(lengthOfLastWord("Hello World!")).toBe(6);
  });

  test('fly me   to   the moon   → 4', () => {
    expect(lengthOfLastWord("   fly me   to   the moon  ")).toBe(4);
  });

  test('luffy is still joyboy → 6', () => {
    expect(lengthOfLastWord("luffy is still joyboy")).toBe(6);
  });

  test('String with trailing spaces', () => {
    expect(lengthOfLastWord("singleword   ")).toBe(10);
  });

  test('Single word string', () => {
    expect(lengthOfLastWord("hello")).toBe(5);
  });

  test('Multiple spaces between words', () => {
    expect(lengthOfLastWord("a  b   c")).toBe(1);
  });
});
