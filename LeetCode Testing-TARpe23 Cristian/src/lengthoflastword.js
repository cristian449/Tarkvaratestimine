function lengthOfLastWord(s) {
  const words = s.trim().split(" ");
  const filtered = words.filter(word => word.length > 0);
  return filtered[filtered.length - 1].length;
}

module.exports = lengthOfLastWord;
