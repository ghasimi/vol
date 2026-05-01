# Vol

On volatility, smile, surface, etc.

## Stochastic Volatility Inspired (SVI)

The SVI parameterization of the implied volatility smile was originally devised at Merrill Lynch in 1999
[by Jim Gatheral](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2033323).

$$
w(k) = a + b(\rho(k - m) + \sqrt{ (k - m)^2 + \sigma^2 } ) \\
		\, \\
k: \text{log-moneyness} = ln(K/F) \\

w: \text{total variance} = IV^2 * T \\
		 \,\\	
$$

To "feel" the SVI and its parameters, I created an intractive plot at [ghasimi.github.io/vol](https://ghasimi.github.io/vol/)