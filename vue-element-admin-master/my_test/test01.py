import time


def time_wrap(func):
    def warp(*args, **kwargs):
        s = time.time()
        a = func(*args, **kwargs)
        e = time.time()
        print(e - s)
        return a
    return warp


@time_wrap
def f(n):
    dp = {}
    dp[1] = dp[2] = 1
    for i in range(3, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]


# @time_wrap
def f1(n):
    if n == 1 or n == 2:
        return 1
    # return f1(n-1)+f1(n-2)
    p = c = 1
    for _ in range(3, n+1):
        p, c = c, p+c
    return c


def f2(n):
    prev = curr = 1
    for _ in range(3, n+1):
        prev, curr = curr, curr+prev
    return curr


a = f(30)
b = f1(30)
print('as', a)


def oo(n):
    if n == 1 or n == 2:
        return 1
    list = [0]*(n+1)
    if list[n-1] != 0:
        return list[n]
    list[n] = oo(n-1) + oo(n-2)
    return list[n]


dict_01 = {}


def coinChange(coins, counts):
    if counts == 0:
        return 0
    if counts < 0:
        return -1
    if counts in dict_01:
        return dict_01[counts]
    sum = float('INF')
    for coin in coins:
        sub = coinChange(coins, counts - coin)
        if sub == -1:
            continue
        sum = min(sum, coinChange(coins, counts - coin) + 1)
    dict_01[counts] = sum if sum != float('INF') else -1

    return dict_01[counts]


def c_change(coins, n):
    dp = {}
    dp[0] = 0
    for i in range(1, n+1):
        dp[i] = float('INF')
        for coin in coins:
            if i - coin < 0:
                continue
            dp[i] = min(dp[i], dp[i-coin]+1)
    if dp[n] == float('INF'):
        return -1
    return dp[n]


f = c_change([1, 2, 5], 11)
print(f)


def findMaxForm(strs, m, n):
    if len(strs) == 0:
        return 0
    dp = [[0] * (n+1) for _ in range(m+1)]
    for strs_item in strs:
        print(strs_item)
        zeros = strs_item.count("0")
        ones = strs_item.count("1")
        for i in range(zeros, m+1):
            for j in range(ones, n+1):
                print("dp[i][j]", dp[i][j])
                print("1+dp[i - zeros][j-ones]", 1+dp[i - zeros][j-ones])
                dp[i][j] = max(dp[i][j], 1+dp[i - zeros][j-ones])
    return dp[m][n]


demo = dict()


def dp(K, N):
    res = float('INF')
    if K == 1:
        return N
    if N == 0:
        return 0
    if (K, N) in demo:
        return demo[(K, N)]
    for i in range(1, N+1):
        print(max(dp(K-1, i-1), dp(K, N-i))+1)
        res = min(res, max(dp(K-1, i-1), dp(K, N-i))+1)
    print(res)
    demo[(K, N)] = res
    return res


strs1 = ["11001", "10", "0001", "1", "0"]
m = 5
n = 3
# d = findMaxForm(strs1, m, n)
print('start')
d = dp(3, 14)
print('end')
print(d)
