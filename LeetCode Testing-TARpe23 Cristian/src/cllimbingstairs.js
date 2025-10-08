function climbStairs(n) {
  if (n <= 2) return n;

  let first = 1, second = 2;

  for (let i = 3; i <= n; i++) {
    const current = first + second;
    first = second;
    second = current;
  }

  return second;
}

module.exports = climbStairs;
