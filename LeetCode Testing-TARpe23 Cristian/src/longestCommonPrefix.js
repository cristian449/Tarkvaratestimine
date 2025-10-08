/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return "";

  // Start with the first string as the prefix
  let prefix = strs[0];

  // Compare the prefix with each string in the array
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      // Reduce the prefix length until it matches
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

module.exports = longestCommonPrefix;
