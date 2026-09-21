export const learningModules = [
  {
    id: 1,
    level: "Beginner",
    title: "Introduction to Investing",
    shortTitle: "Investing Basics",
    description:
      "Start from absolute zero. Learn what money, saving, investing, returns, risk and compounding mean before entering the stock market.",
    duration: "45 min",
    lessons: [
      {
        id: 1,
        title: "What is Money?",
        duration: "5 min",
        content: `
Money is a medium of exchange that people use to buy goods and services.

In simple words, money is something that people generally accept in exchange for products, services and other forms of value.

Before learning about investing, it is important to understand why money matters.

People generally earn money through employment, business, freelancing, investments and other sources.

The money that you earn can be used for three broad purposes:

1. Spending
2. Saving
3. Investing

Spending means using money for present needs.

Saving means keeping money aside for future needs.

Investing means putting money into assets with the expectation that they may generate returns over time.

Example:

Suppose you earn ₹30,000 per month.

You spend ₹20,000 on your needs and save ₹10,000.

If you simply keep the ₹10,000 aside, it remains available for future use.

If you invest a portion of it in an appropriate investment, the investment may potentially grow over time.

However, investments also involve risk, so returns are not guaranteed.
        `,
        example: `
Suppose you receive ₹10,000.

If you spend the entire ₹10,000, you have no money left.

If you save ₹10,000, you retain the money for future use.

If you invest ₹10,000, the value may increase or decrease depending on the investment.
        `,
        keyPoints: [
          "Money is a medium of exchange.",
          "Saving means keeping money aside.",
          "Investing means putting money into assets with the expectation of returns.",
          "Investments involve risk."
        ],
        practice: {
          question:
            "Which statement best describes investing?",
          options: [
            "Spending all your money immediately",
            "Keeping money only for daily expenses",
            "Putting money into an asset with the expectation of a future return",
            "Borrowing money from a bank"
          ],
          answer: 2,
          explanation:
            "Investing involves putting money into an asset with the expectation that it may generate a return."
        }
      },

      {
        id: 2,
        title: "Saving vs Investing",
        duration: "6 min",
        content: `
Saving and investing are related but different concepts.

Saving generally means setting money aside for future use.

Investing means putting money into an asset with the expectation of generating a return.

Savings are generally used for short-term needs and emergencies.

Investments are generally associated with longer-term financial goals.

The major difference is that savings focus more on preserving readily available money, while investments involve the possibility of growth as well as the possibility of loss.

Examples of savings include:

• Bank savings account
• Emergency fund
• Short-term deposits

Examples of investments include:

• Stocks
• Bonds
• Mutual funds
• Real estate

The choice between saving and investing depends on the individual's financial goals, time horizon and ability to handle risk.
        `,
        example: `
Imagine you need ₹50,000 for an emergency within the next few months.

Keeping that money accessible as savings may be more appropriate than placing the entire amount into a volatile investment.

On the other hand, money intended for a long-term goal may be considered for investment depending on the person's circumstances.
        `,
        keyPoints: [
          "Saving focuses on keeping money available.",
          "Investing involves potential growth and risk.",
          "Short-term needs and emergency funds are different from long-term investment goals."
        ],
        practice: {
          question:
            "Which of the following is generally associated with investing?",
          options: [
            "Potential return and risk",
            "Guaranteed profit in every situation",
            "No possibility of loss",
            "Only daily spending"
          ],
          answer: 0,
          explanation:
            "Investments can potentially generate returns, but they also involve varying levels of risk."
        }
      },

      {
        id: 3,
        title: "What is Investment?",
        duration: "6 min",
        content: `
An investment is an asset or activity in which money or resources are committed with the expectation of receiving some benefit or return in the future.

In financial markets, investments can include stocks, bonds, mutual funds and other financial instruments.

The basic idea is:

Money today → Investment → Potential future value

However, the future value is not guaranteed.

Every investment has some combination of:

• Expected return
• Risk
• Time horizon
• Liquidity

Before making an investment decision, these factors should be understood.
        `,
        example: `
If you invest ₹10,000 in an asset and its value later becomes ₹11,000, your gain is ₹1,000 before considering applicable costs or taxes.

If the value falls to ₹9,000, you have an unrealized loss of ₹1,000.
        `,
        keyPoints: [
          "Investment means committing resources for a future benefit.",
          "Returns are not guaranteed.",
          "Risk, return, time and liquidity are important factors."
        ],
        practice: {
          question:
            "Which factor describes how quickly an investment can be converted into cash?",
          options: [
            "Liquidity",
            "Revenue",
            "Dividend",
            "Market capitalization"
          ],
          answer: 0,
          explanation:
            "Liquidity describes how easily an asset can be converted into cash."
        }
      },

      {
        id: 4,
        title: "Risk and Return",
        duration: "7 min",
        content: `
Risk refers to the possibility that the actual result of an investment may differ from what was expected.

Return is the gain or loss generated by an investment over a period of time.

For example, if you invest ₹10,000 and the value becomes ₹12,000, the gain is ₹2,000.

If the value becomes ₹8,000, the loss is ₹2,000.

Different investments have different levels of risk.

A common financial principle is that higher potential returns are generally associated with higher levels of risk.

This does NOT mean that taking more risk guarantees a higher return.

Risk management is therefore an important part of investing.
        `,
        example: `
Investment A may have relatively low price fluctuations.

Investment B may experience large price fluctuations.

Investment B may offer greater potential for growth, but it may also experience larger losses.
        `,
        keyPoints: [
          "Risk is the possibility of an unfavorable or unexpected outcome.",
          "Return represents gain or loss.",
          "Higher risk does not guarantee higher returns."
        ],
        practice: {
          question:
            "Does higher risk guarantee a higher return?",
          options: [
            "Yes",
            "No",
            "Only for stocks",
            "Only for large companies"
          ],
          answer: 1,
          explanation:
            "Higher risk may involve greater potential return, but it never guarantees a higher return."
        }
      },

      {
        id: 5,
        title: "Compounding",
        duration: "8 min",
        content: `
Compounding is the process in which returns generated by an investment can themselves generate additional returns when they remain invested.

Simple growth considers the original amount.

Compounding considers:

Original investment + accumulated returns.

For example, suppose ₹10,000 grows by 10%.

After one period:

₹10,000 × 1.10 = ₹11,000

If the next period also produces 10% growth:

₹11,000 × 1.10 = ₹12,100

The second period's return is calculated on ₹11,000 rather than only the original ₹10,000.

Time can therefore have a significant effect on long-term compounding.

However, actual investment returns vary and are not guaranteed.
        `,
        example: `
Starting amount = ₹10,000

Annual growth = 10%

After one year = ₹11,000

After two years = ₹12,100

The additional ₹100 comes from earning a return on the previous return.
        `,
        keyPoints: [
          "Compounding means earning returns on accumulated returns.",
          "Time is an important factor.",
          "Actual market returns are not fixed or guaranteed."
        ],
        practice: {
          question:
            "What is the main idea behind compounding?",
          options: [
            "Returns can generate additional returns when reinvested",
            "Investments can never lose value",
            "Only the original investment earns returns",
            "Taxes disappear over time"
          ],
          answer: 0,
          explanation:
            "Compounding occurs when accumulated returns remain invested and can themselves generate further returns."
        }
      }
    ],
    assessment: [
      {
        question: "What is investing?",
        options: [
          "Only spending money",
          "Putting resources into an asset expecting a future benefit",
          "Borrowing money",
          "Avoiding all financial risk"
        ],
        answer: 1
      },
      {
        question: "What does liquidity describe?",
        options: [
          "Company profit",
          "Ease of converting an asset into cash",
          "Stock ownership",
          "Dividend amount"
        ],
        answer: 1
      },
      {
        question: "Which statement about risk is correct?",
        options: [
          "Risk guarantees profit",
          "Risk never exists in stocks",
          "Risk represents uncertainty in outcomes",
          "Risk only applies to companies"
        ],
        answer: 2
      },
      {
        question: "What is compounding?",
        options: [
          "Earning returns on accumulated returns",
          "Selling every investment",
          "Reducing the original investment",
          "Avoiding investments"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Stock Market Basics",
        description:
          "Begin with the basic concepts of the stock market.",
        videoId: "p5ORIeMULIg"
      }
    ]
  },

  {
    id: 2,
    level: "Beginner",
    title: "Understanding Stocks",
    shortTitle: "Stocks",
    description:
      "Understand companies, shares, equity, ownership and why businesses issue shares.",
    duration: "50 min",
    lessons: [
      {
        id: 1,
        title: "What is a Company?",
        duration: "6 min",
        content: `
A company is an organization created to conduct business activities.

Companies may produce goods, provide services or operate platforms and technologies.

A company needs resources to operate and grow.

These resources can include:

• Employees
• Equipment
• Technology
• Buildings
• Working capital
• Research and development

Companies need money to acquire and develop these resources.

They can raise money through several methods, including borrowing and issuing ownership interests.
        `,
        example: `
A technology company may need money to build new products.

It could use internally generated money, borrow money or raise capital from investors.
        `,
        keyPoints: [
          "Companies require capital to operate and grow.",
          "Capital can come from different sources.",
          "Companies can raise ownership capital by issuing shares."
        ],
        practice: {
          question:
            "Why might a company need capital?",
          options: [
            "To operate and grow",
            "Only to pay shareholders",
            "To eliminate all competition",
            "To prevent trading"
          ],
          answer: 0,
          explanation:
            "Companies need capital for activities such as operations, expansion and investment."
        }
      },

      {
        id: 2,
        title: "What is a Share?",
        duration: "7 min",
        content: `
A share represents a unit of ownership in a company.

When a company divides its ownership into units, each unit can be represented by a share.

Suppose a company has 1,00,000 shares.

If you own 1,000 shares:

Ownership percentage =
1,000 / 1,00,000 × 100

= 1%

Therefore, owning shares can give an investor an ownership interest in the company.

The exact rights associated with shares depend on the type of security and applicable rules.
        `,
        example: `
Company shares = 1,00,000

Your shares = 5,000

Ownership:

5,000 / 1,00,000 × 100 = 5%
        `,
        keyPoints: [
          "A share represents a unit of ownership.",
          "Ownership percentage depends on the number of shares owned relative to total shares.",
          "Different classes of shares may have different rights."
        ],
        practice: {
          question:
            "A company has 50,000 shares and you own 2,500. What is your ownership percentage?",
          options: [
            "2%",
            "5%",
            "10%",
            "20%"
          ],
          answer: 1,
          explanation:
            "2,500 / 50,000 × 100 = 5%."
        }
      },

      {
        id: 3,
        title: "Why Do Companies Issue Shares?",
        duration: "7 min",
        content: `
Companies may issue shares to raise capital.

Suppose a company wants to expand into a new city.

The expansion may require money for:

• Buildings
• Employees
• Technology
• Marketing
• Equipment

Instead of raising all the money through borrowing, a company may raise equity capital.

Investors provide capital and receive shares representing an ownership interest.

This creates a relationship:

Company receives capital
↓
Investor receives shares
↓
Investor becomes a shareholder
        `,
        example: `
A company wants to raise ₹10 crore for expansion.

It may issue shares to investors to raise the required capital.

The investors receive shares while the company receives capital.
        `,
        keyPoints: [
          "Companies can raise capital by issuing shares.",
          "Investors receive an ownership interest in exchange for capital.",
          "Equity financing differs from borrowing."
        ],
        practice: {
          question:
            "What does a company generally receive when it issues new equity shares?",
          options: [
            "Capital",
            "A guaranteed profit",
            "Free products",
            "A bank loan automatically"
          ],
          answer: 0,
          explanation:
            "Issuing equity shares can provide the company with capital from investors."
        }
      },

      {
        id: 4,
        title: "Investor vs Trader",
        duration: "7 min",
        content: `
An investor generally purchases assets with a longer-term perspective.

A trader generally focuses more on shorter-term price movements.

The distinction is based primarily on approach and time horizon rather than a strict legal definition.

Investors may study:

• Business performance
• Financial statements
• Competitive position
• Long-term growth

Traders may focus more heavily on:

• Price movement
• Charts
• Volume
• Short-term market conditions

Both approaches involve risk.
        `,
        example: `
Person A purchases shares because they believe the underlying business may grow over several years.

Person B buys a stock expecting to benefit from a price movement over several days.

The first approach is more consistent with long-term investing, while the second is more consistent with trading.
        `,
        keyPoints: [
          "Investors often have longer time horizons.",
          "Traders often focus on shorter-term price movements.",
          "Both involve risk."
        ],
        practice: {
          question:
            "Which factor commonly distinguishes investing from short-term trading?",
          options: [
            "Time horizon",
            "Whether money is involved",
            "Whether a company exists",
            "Whether prices can change"
          ],
          answer: 0,
          explanation:
            "Time horizon and strategy are important distinctions between investing and trading."
        }
      }
    ],
    assessment: [
      {
        question: "What does a share represent?",
        options: [
          "A bank loan",
          "A unit of ownership",
          "A tax payment",
          "A trading fee"
        ],
        answer: 1
      },
      {
        question: "Why may companies issue shares?",
        options: [
          "To raise capital",
          "To eliminate all risk",
          "To guarantee investor returns",
          "To stop trading"
        ],
        answer: 0
      },
      {
        question: "You own 1,000 of 10,000 shares. Your ownership is:",
        options: [
          "1%",
          "5%",
          "10%",
          "50%"
        ],
        answer: 2
      },
      {
        question: "What commonly differentiates an investor from a short-term trader?",
        options: [
          "Time horizon and strategy",
          "Nationality",
          "Bank account",
          "Company size"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Understanding the Stock Market",
        description:
          "A beginner-friendly introduction to stocks and the market.",
        videoId: "2jC1iAvqExw"
      }
    ]
  },

  {
    id: 3,
    level: "Beginner",
    title: "Stock Market Ecosystem",
    shortTitle: "Market Ecosystem",
    description:
      "Learn about stock exchanges, brokers, SEBI, Demat accounts, trading accounts and how a trade moves through the market.",
    duration: "55 min",
    lessons: [
      {
        id: 1,
        title: "What is a Stock Exchange?",
        duration: "7 min",
        content: `
A stock exchange is an organized marketplace where eligible securities can be traded according to established rules.

In India, two major stock exchanges are:

• National Stock Exchange (NSE)
• BSE Ltd. (formerly Bombay Stock Exchange)

Stock exchanges provide an infrastructure through which buyers and sellers can interact.

They also operate according to regulatory and technological frameworks designed to support orderly trading.
        `,
        example: `
If an investor wants to buy shares of a listed company and another market participant wants to sell them, the exchange's trading system facilitates the matching of compatible orders.
        `,
        keyPoints: [
          "Stock exchanges provide organized trading infrastructure.",
          "NSE and BSE are major Indian stock exchanges.",
          "Buy and sell orders are matched through trading systems."
        ],
        practice: {
          question:
            "What is one major function of a stock exchange?",
          options: [
            "Facilitate organized trading",
            "Guarantee investor profits",
            "Set every company's profit",
            "Eliminate market risk"
          ],
          answer: 0,
          explanation:
            "Stock exchanges provide organized infrastructure for trading securities."
        }
      },

      {
        id: 2,
        title: "SEBI and Regulation",
        duration: "7 min",
        content: `
SEBI stands for Securities and Exchange Board of India.

SEBI is India's securities-market regulator.

Its responsibilities include regulatory and supervisory functions related to India's securities markets.

Regulation is important because financial markets involve investors, companies, intermediaries and significant amounts of capital.

A regulated market requires rules concerning areas such as disclosure, intermediaries, market conduct and investor protection.
        `,
        example: `
When a listed company publishes information that may be important to investors, securities-market regulations can impose disclosure requirements.
        `,
        keyPoints: [
          "SEBI is India's securities-market regulator.",
          "Regulation supports transparency and market integrity.",
          "Investors should understand that regulation does not eliminate investment risk."
        ],
        practice: {
          question:
            "What does SEBI stand for?",
          options: [
            "Securities and Exchange Board of India",
            "Stock Exchange Banking Institution of India",
            "Securities Equity Banking Institute",
            "Stock Evaluation Board of Investments"
          ],
          answer: 0,
          explanation:
            "SEBI stands for Securities and Exchange Board of India."
        }
      },

      {
        id: 3,
        title: "Demat Account",
        duration: "7 min",
        content: `
A Demat account is used to hold securities in electronic form.

The word Demat comes from dematerialization.

Instead of receiving physical share certificates, securities are maintained electronically.

A Demat account and a trading account serve different purposes.

The trading account is used for buying and selling securities through a broker.

The Demat account is used to hold eligible securities electronically.
        `,
        example: `
If you buy 10 shares and the transaction settles successfully, those securities can be credited to your Demat account.
        `,
        keyPoints: [
          "Demat accounts hold securities electronically.",
          "Trading accounts facilitate transactions.",
          "The two accounts have different roles."
        ],
        practice: {
          question:
            "What is the primary purpose of a Demat account?",
          options: [
            "Hold securities electronically",
            "Calculate income tax",
            "Set stock prices",
            "Create company profits"
          ],
          answer: 0,
          explanation:
            "A Demat account is used to hold securities in electronic form."
        }
      },

      {
        id: 4,
        title: "How a Stock Trade Happens",
        duration: "8 min",
        content: `
A simplified stock transaction can be understood as a sequence.

Investor decides to buy
↓
Order is submitted through a broker
↓
Order enters the exchange trading system
↓
Compatible buy and sell orders may be matched
↓
Trade is executed
↓
Clearing and settlement occur
↓
Securities and funds are transferred according to the applicable settlement process

The actual infrastructure is more complex, but this model helps beginners understand the overall flow.
        `,
        example: `
Suppose you submit an order to buy 10 shares.

Another market participant has a compatible sell order.

If the conditions match, the trading system can execute the transaction.

The subsequent settlement process transfers the securities and funds according to the applicable rules.
        `,
        keyPoints: [
          "Orders are submitted through trading infrastructure.",
          "Compatible buy and sell orders can be matched.",
          "Execution and settlement are separate stages."
        ],
        practice: {
          question:
            "What generally happens after a compatible buy and sell order are matched?",
          options: [
            "The trade is executed",
            "The company closes",
            "The stock becomes risk-free",
            "The investor automatically receives dividends"
          ],
          answer: 0,
          explanation:
            "A compatible buy and sell order can result in trade execution."
        }
      }
    ],
    assessment: [
      {
        question: "Name one major Indian stock exchange.",
        options: [
          "NSE",
          "NASA",
          "WHO",
          "UNESCO"
        ],
        answer: 0
      },
      {
        question: "SEBI is primarily associated with:",
        options: [
          "Securities-market regulation",
          "Weather forecasting",
          "Railway operations",
          "Telecommunications"
        ],
        answer: 0
      },
      {
        question: "A Demat account is mainly used to:",
        options: [
          "Hold securities electronically",
          "Set market prices",
          "Issue loans",
          "Calculate GDP"
        ],
        answer: 0
      },
      {
        question: "What is settlement?",
        options: [
          "The process following trade execution through which obligations are completed",
          "Creating a company",
          "Writing a financial article",
          "Predicting stock prices"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Stock Market Learning Session",
        description:
          "Additional beginner material for understanding the market ecosystem.",
        videoId: "k8AXprgX3Fw"
      }
    ]
  },

  {
    id: 4,
    level: "Beginner",
    title: "Stock Market Terminology",
    shortTitle: "Terminology",
    description:
      "Master the most important words used when discussing stocks and markets.",
    duration: "60 min",
    lessons: [
      {
        id: 1,
        title: "Market Capitalization",
        duration: "7 min",
        content: `
Market capitalization represents the market value of a company's outstanding equity shares.

A simplified formula is:

Market Capitalization =
Current Share Price × Number of Outstanding Shares

Example:

Share price = ₹500
Outstanding shares = 1 crore

Market capitalization =
₹500 × 1 crore

= ₹500 crore

Market capitalization is commonly used to classify companies into broad size categories.

It should not be confused with the company's revenue, profit or total assets.
        `,
        example: `
Company A:

Share price = ₹100
Shares = 10 lakh

Market capitalization =
₹100 × 10,00,000
= ₹10 crore
        `,
        keyPoints: [
          "Market capitalization depends on share price and outstanding shares.",
          "It represents market value of equity.",
          "Market capitalization is different from revenue and profit."
        ],
        practice: {
          question:
            "If a company has 1,00,000 shares trading at ₹100, its market capitalization is:",
          options: [
            "₹1 lakh",
            "₹10 lakh",
            "₹1 crore",
            "₹10 crore"
          ],
          answer: 2,
          explanation:
            "1,00,000 × ₹100 = ₹1,00,00,000, which is ₹1 crore."
        }
      },

      {
        id: 2,
        title: "Volume and Liquidity",
        duration: "7 min",
        content: `
Trading volume refers to the quantity of securities traded during a particular period.

Liquidity refers to how easily an asset can generally be bought or sold without causing a significant price impact.

High trading volume can sometimes be associated with greater market activity, but volume and liquidity are not identical concepts.

A stock may have periods of high or low liquidity depending on market conditions.
        `,
        example: `
Stock A has many buyers and sellers and frequent transactions.

Stock B has very few transactions.

Stock A may generally be easier to trade than Stock B, although actual liquidity depends on the market conditions and order book.
        `,
        keyPoints: [
          "Volume measures trading activity.",
          "Liquidity describes ease of trading.",
          "Volume and liquidity are related but not identical."
        ],
        practice: {
          question:
            "What does trading volume generally measure?",
          options: [
            "Quantity of securities traded",
            "Company profit",
            "Number of employees",
            "Dividend percentage"
          ],
          answer: 0,
          explanation:
            "Trading volume represents the quantity of securities traded during a specified period."
        }
      },

      {
        id: 3,
        title: "Bull Market and Bear Market",
        duration: "6 min",
        content: `
A bull market generally describes a sustained period of rising market prices or optimistic market conditions.

A bear market generally describes a sustained period of declining prices or pessimistic market conditions.

These are broad market descriptions.

A bull market does not mean every stock rises.

Similarly, a bear market does not mean every stock falls.

Individual securities can behave differently from the broader market.
        `,
        example: `
If a broad market index experiences a prolonged upward movement, commentators may describe the period as bullish.

If the index experiences a prolonged downward movement, the period may be described as bearish.
        `,
        keyPoints: [
          "Bull markets are generally associated with rising prices.",
          "Bear markets are generally associated with declining prices.",
          "Individual stocks can behave differently from the overall market."
        ],
        practice: {
          question:
            "A bear market is generally associated with:",
          options: [
            "Declining market prices",
            "Guaranteed profits",
            "Zero volatility",
            "Only IPOs"
          ],
          answer: 0,
          explanation:
            "Bear markets are generally associated with declining prices and pessimistic market conditions."
        }
      }
    ],
    assessment: [
      {
        question: "Market capitalization is calculated using:",
        options: [
          "Share price × outstanding shares",
          "Revenue × employees",
          "Profit × tax",
          "Assets × liabilities"
        ],
        answer: 0
      },
      {
        question: "Volume generally measures:",
        options: [
          "Quantity traded",
          "Company debt",
          "Dividend yield",
          "Number of shareholders only"
        ],
        answer: 0
      },
      {
        question: "A bull market is generally associated with:",
        options: [
          "Rising prices",
          "Permanent losses",
          "No trading",
          "Zero demand"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Stock Market Concepts",
        description:
          "Use this resource to reinforce basic stock-market terminology.",
        videoId: "qcWZ5pYYCXs"
      }
    ]
  },

  {
    id: 5,
    level: "Intermediate",
    title: "Buying and Selling Stocks",
    shortTitle: "Buying & Selling",
    description:
      "Learn how orders work, including market orders, limit orders and stop-loss orders.",
    duration: "60 min",
    lessons: [
      {
        id: 1,
        title: "How to Buy a Stock",
        duration: "8 min",
        content: `
Buying a stock involves submitting an order through a trading platform or broker.

A simplified process is:

Select security
↓
Choose quantity
↓
Select order type
↓
Enter price if required
↓
Submit order
↓
Order may be matched
↓
Trade execution
↓
Settlement

The actual interface varies between brokers.

A buy order does not guarantee execution merely because it has been submitted.
        `,
        example: `
You want to buy 10 shares of a stock.

You select:

Quantity = 10
Order type = Market

The broker sends the order to the market.

The order may execute at available market prices, subject to market conditions.
        `,
        keyPoints: [
          "An order must be submitted before execution can occur.",
          "Order type affects how the order behaves.",
          "Order submission does not always guarantee execution."
        ],
        practice: {
          question:
            "What is selected before submitting a stock order?",
          options: [
            "Quantity and order type",
            "Company employees",
            "GDP",
            "Annual rainfall"
          ],
          answer: 0,
          explanation:
            "A trader generally selects the security, quantity and order type before submitting an order."
        }
      },

      {
        id: 2,
        title: "Market Order",
        duration: "6 min",
        content: `
A market order is an order to buy or sell a security at the best available prices in the market.

The main priority is generally execution rather than a specific price.

However, the actual execution price can differ from the price you saw immediately before submitting the order, especially in volatile or less liquid markets.

Therefore, market orders carry execution-price uncertainty.
        `,
        example: `
A stock is currently displayed around ₹500.

You place a market buy order.

The order may execute at ₹500.10, ₹500.30 or another available price depending on the order book and market conditions.
        `,
        keyPoints: [
          "Market orders prioritize execution.",
          "The exact execution price is not guaranteed.",
          "Price uncertainty can be greater during volatile conditions."
        ],
        practice: {
          question:
            "What is the main priority of a market order?",
          options: [
            "Execution at the best available market price",
            "Guaranteed execution at your chosen price",
            "Guaranteed profit",
            "Avoiding all volatility"
          ],
          answer: 0,
          explanation:
            "Market orders prioritize execution at available market prices rather than specifying an exact price."
        }
      },

      {
        id: 3,
        title: "Limit Order",
        duration: "6 min",
        content: `
A limit order specifies the maximum price at which you are willing to buy or the minimum price at which you are willing to sell.

A buy limit order can execute at the specified price or lower.

A sell limit order can execute at the specified price or higher.

However, execution is not guaranteed.

If the market never reaches the specified price, the order may remain unexecuted.
        `,
        example: `
Current stock price = ₹500

You place a buy limit order at ₹480.

The order can execute at ₹480 or better if a compatible sell order is available.

If the stock remains above ₹480, the order may not execute.
        `,
        keyPoints: [
          "Limit orders specify a price condition.",
          "Execution is not guaranteed.",
          "Buy limits specify a maximum price.",
          "Sell limits specify a minimum price."
        ],
        practice: {
          question:
            "A buy limit order at ₹480 generally means:",
          options: [
            "Buy at ₹480 or lower if execution occurs",
            "Buy only above ₹480",
            "Guaranteed profit",
            "Sell at ₹480"
          ],
          answer: 0,
          explanation:
            "A buy limit order specifies the maximum price you are willing to pay."
        }
      },

      {
        id: 4,
        title: "Stop-Loss",
        duration: "7 min",
        content: `
A stop-loss order is designed to help limit potential losses by triggering an order when a specified price condition is reached.

For example, an investor who owns a stock may set a stop-loss condition below the current market price.

If the trigger condition is reached, the order can become active according to the selected order type.

Stop-loss orders do not guarantee that the eventual execution price will exactly equal the stop price.

Fast-moving markets can result in execution at a different price.
        `,
        example: `
You buy a stock at ₹500.

You decide that you want to limit your downside and set a stop condition around ₹450.

If the specified trigger condition is reached, the order mechanism is activated according to its rules.
        `,
        keyPoints: [
          "Stop-loss orders are used as a risk-management tool.",
          "They do not guarantee a specific execution price.",
          "Market conditions can affect execution."
        ],
        practice: {
          question:
            "What is a common purpose of a stop-loss order?",
          options: [
            "Risk management",
            "Guaranteeing profit",
            "Increasing company revenue",
            "Creating dividends"
          ],
          answer: 0,
          explanation:
            "Stop-loss orders can be used as part of a strategy to manage downside risk."
        }
      }
    ],
    assessment: [
      {
        question: "A market order primarily prioritizes:",
        options: [
          "Execution",
          "Guaranteed price",
          "Guaranteed profit",
          "Dividend"
        ],
        answer: 0
      },
      {
        question: "A buy limit order specifies:",
        options: [
          "Maximum purchase price",
          "Minimum purchase price",
          "Guaranteed profit",
          "Company revenue"
        ],
        answer: 0
      },
      {
        question: "Is execution guaranteed for a limit order?",
        options: [
          "Yes, always",
          "No",
          "Only for large companies",
          "Only during IPOs"
        ],
        answer: 1
      },
      {
        question: "Stop-loss is commonly associated with:",
        options: [
          "Risk management",
          "Company incorporation",
          "Dividend creation",
          "Market capitalization"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Stock Market Order Concepts",
        description:
          "Additional material for understanding stock-market transactions.",
        videoId: "ukOEaNLNiG8"
      }
    ]
  },

  {
    id: 6,
    level: "Intermediate",
    title: "Why Stock Prices Move",
    shortTitle: "Price Movement",
    description:
      "Understand supply, demand, company performance, news, sentiment and economic factors.",
    duration: "50 min",
    lessons: [
      {
        id: 1,
        title: "Supply and Demand",
        duration: "8 min",
        content: `
Stock prices are determined in the market through interactions between buyers and sellers.

When buying interest increases relative to available selling interest, the market price may rise.

When selling pressure increases relative to buying interest, the market price may fall.

This is a simplified explanation. Real markets involve order books, liquidity, market participants and many other factors.
        `,
        example: `
If many participants are willing to buy a stock while relatively few participants are willing to sell at current prices, buyers may need to offer higher prices to obtain shares.
        `,
        keyPoints: [
          "Prices emerge from interactions between buyers and sellers.",
          "Demand and supply influence prices.",
          "Order-book conditions affect actual execution."
        ],
        practice: {
          question:
            "What can happen when buying demand increases significantly?",
          options: [
            "Price may rise",
            "Price must become zero",
            "Trading stops permanently",
            "The company automatically doubles its profit"
          ],
          answer: 0,
          explanation:
            "Increased buying demand can contribute to upward price pressure."
        }
      }
    ],
    assessment: [
      {
        question: "Which two forces directly interact in a market?",
        options: [
          "Buyers and sellers",
          "Banks and schools",
          "Students and teachers",
          "Employees and customers only"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 7,
    level: "Intermediate",
    title: "Types of Stocks",
    shortTitle: "Stock Types",
    description:
      "Understand large-cap, mid-cap, small-cap, growth, value, dividend and other stock classifications.",
    duration: "55 min",
    lessons: [
      {
        id: 1,
        title: "Large-Cap, Mid-Cap and Small-Cap",
        duration: "8 min",
        content: `
Stocks can be classified by the size of the company.

Market capitalization is commonly used for this purpose.

Large-cap companies are generally larger companies by market capitalization.

Mid-cap companies fall between large-cap and small-cap categories.

Small-cap companies have smaller market capitalizations relative to large-cap companies.

The exact classification thresholds can be defined by market regulators or index providers and can change over time.

Size classification does not automatically determine whether a stock is good or bad.
        `,
        example: `
Two companies can operate in the same industry while having very different market capitalizations.

The larger company may be categorized differently from the smaller company based on the applicable classification framework.
        `,
        keyPoints: [
          "Market capitalization is commonly used for size classification.",
          "Classification thresholds can change.",
          "Company size alone does not determine investment suitability."
        ],
        practice: {
          question:
            "Which measure is commonly used to classify companies by size?",
          options: [
            "Market capitalization",
            "Number of employees only",
            "Office size",
            "Advertising budget"
          ],
          answer: 0,
          explanation:
            "Market capitalization is commonly used for broad company-size classification."
        }
      }
    ],
    assessment: [
      {
        question: "Large-cap, mid-cap and small-cap primarily describe:",
        options: [
          "Company size based on market capitalization",
          "Trading hours",
          "Dividend dates",
          "Order types"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 8,
    level: "Intermediate",
    title: "Stock Market Indices",
    shortTitle: "Market Indices",
    description:
      "Learn what indexes are and understand NIFTY, SENSEX and index movements.",
    duration: "45 min",
    lessons: [
      {
        id: 1,
        title: "What is a Stock Market Index?",
        duration: "8 min",
        content: `
A stock market index is a statistical measure designed to represent the performance of a selected group of securities.

An index allows investors to observe the general movement of a market segment.

Examples in India include NIFTY 50 and SENSEX.

An index is not the same thing as an individual stock.

When an index rises, it does not mean every stock in the market has risen.
        `,
        example: `
If an index contains several companies and most of those companies increase in value, the index may rise depending on its methodology and constituent weights.
        `,
        keyPoints: [
          "An index represents a selected group of securities.",
          "NIFTY 50 and SENSEX are major Indian market indexes.",
          "Index movement does not mean every individual stock moves identically."
        ],
        practice: {
          question:
            "What does a stock-market index generally represent?",
          options: [
            "A selected group of securities",
            "One person's portfolio",
            "A bank account",
            "A single company"
          ],
          answer: 0,
          explanation:
            "An index represents the performance of a selected group of securities according to its methodology."
        }
      }
    ],
    assessment: [
      {
        question: "NIFTY 50 is:",
        options: [
          "A stock market index",
          "A Demat account",
          "A broker",
          "A company"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 9,
    level: "Analysis",
    title: "Fundamental Analysis",
    shortTitle: "Fundamental Analysis",
    description:
      "Learn how financial statements and business metrics are used to study a company.",
    duration: "90 min",
    lessons: [
      {
        id: 1,
        title: "What is Fundamental Analysis?",
        duration: "10 min",
        content: `
Fundamental analysis is the study of a company, its business, financial statements, industry and other relevant factors to understand its financial condition and valuation.

The objective is to understand the underlying business rather than focusing only on short-term price movements.

Common areas include:

• Revenue
• Profit
• Cash flow
• Debt
• Assets
• Liabilities
• Earnings
• Profitability
• Valuation
• Competitive position

Fundamental analysis should not be treated as a guarantee of future stock performance.
        `,
        example: `
An analyst may study a company's revenue growth, profit margins, debt levels and valuation before forming an opinion about the company's financial position.
        `,
        keyPoints: [
          "Fundamental analysis studies the underlying business.",
          "Financial statements are important sources of information.",
          "Analysis does not guarantee future returns."
        ],
        practice: {
          question:
            "Fundamental analysis primarily focuses on:",
          options: [
            "The underlying business and financial information",
            "Only candle colors",
            "Only intraday price changes",
            "Only trading volume"
          ],
          answer: 0,
          explanation:
            "Fundamental analysis examines business and financial factors."
        }
      },

      {
        id: 2,
        title: "Financial Statements",
        duration: "12 min",
        content: `
Three major financial statements are:

1. Balance Sheet
2. Income Statement
3. Cash Flow Statement

The Balance Sheet provides information about assets, liabilities and equity at a particular point in time.

The Income Statement reports revenues, expenses and profit or loss over a period.

The Cash Flow Statement provides information about cash flows from operating, investing and financing activities.

Together, these statements help users understand different aspects of a company's financial condition and performance.
        `,
        example: `
A company can report accounting profit while having weak cash generation.

That is one reason why looking at only one financial statement may provide an incomplete picture.
        `,
        keyPoints: [
          "Balance Sheet focuses on financial position.",
          "Income Statement focuses on performance over a period.",
          "Cash Flow Statement focuses on cash movements."
        ],
        practice: {
          question:
            "Which statement primarily reports assets, liabilities and equity?",
          options: [
            "Balance Sheet",
            "Income Statement",
            "Cash Flow Statement",
            "Order Book"
          ],
          answer: 0,
          explanation:
            "The Balance Sheet reports assets, liabilities and equity."
        }
      },

      {
        id: 3,
        title: "EPS and P/E Ratio",
        duration: "12 min",
        content: `
EPS means Earnings Per Share.

A simplified formula is:

EPS = Net Profit attributable to equity shareholders / Number of shares

The P/E ratio means Price-to-Earnings ratio.

A simplified formula is:

P/E = Market Price Per Share / EPS

Example:

Market price = ₹200
EPS = ₹20

P/E = ₹200 / ₹20
P/E = 10

P/E should not be interpreted in isolation.

Comparisons may consider the company's historical values, industry peers, growth expectations and other factors.
        `,
        example: `
Company A:

Share price = ₹500
EPS = ₹50

P/E = 500 / 50
P/E = 10
        `,
        keyPoints: [
          "EPS relates earnings to each share.",
          "P/E compares market price with earnings per share.",
          "Ratios should be interpreted in context."
        ],
        practice: {
          question:
            "If share price is ₹300 and EPS is ₹30, the simplified P/E is:",
          options: [
            "3",
            "5",
            "10",
            "30"
          ],
          answer: 2,
          explanation:
            "P/E = 300 / 30 = 10."
        }
      }
    ],
    assessment: [
      {
        question: "What does EPS stand for?",
        options: [
          "Earnings Per Share",
          "Equity Price System",
          "Estimated Profit Stock",
          "Earnings Payment Scheme"
        ],
        answer: 0
      },
      {
        question: "P/E is calculated using:",
        options: [
          "Price per share / EPS",
          "Revenue / employees",
          "Debt / revenue",
          "Assets / liabilities"
        ],
        answer: 0
      },
      {
        question: "Which statement reports assets, liabilities and equity?",
        options: [
          "Balance Sheet",
          "Income Statement",
          "Cash Flow Statement",
          "Trading Statement"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Fundamental Analysis Resource",
        description:
          "Use this video as additional learning after studying the fundamentals.",
        videoId: "qcWZ5pYYCXs"
      },
      {
        title: "Understanding ROCE, ROE and ROA",
        description:
          "Additional learning resource for important profitability ratios.",
        videoId: "ukOEaNLNiG8"
      }
    ]
  },

  {
    id: 10,
    level: "Analysis",
    title: "Technical Analysis",
    shortTitle: "Technical Analysis",
    description:
      "Learn charts, candlesticks, trends, support, resistance and technical indicators.",
    duration: "90 min",
    lessons: [
      {
        id: 1,
        title: "What is Technical Analysis?",
        duration: "10 min",
        content: `
Technical analysis is an approach that studies market data such as price and volume to identify patterns and trends.

Common technical-analysis tools include:

• Charts
• Candlesticks
• Moving averages
• RSI
• MACD
• Support and resistance
• Volume

Technical analysis does not guarantee future price movements.

Historical patterns can fail, and market conditions can change.
        `,
        example: `
A trader may observe that a stock repeatedly finds buying interest around a particular price range.

That range may be studied as a possible support area.
        `,
        keyPoints: [
          "Technical analysis studies market data.",
          "Charts and indicators are commonly used.",
          "Technical analysis cannot guarantee future outcomes."
        ],
        practice: {
          question:
            "Technical analysis commonly studies:",
          options: [
            "Price and volume data",
            "Only employee salaries",
            "Only company buildings",
            "Only tax returns"
          ],
          answer: 0,
          explanation:
            "Technical analysis commonly studies market price, volume and related market data."
        }
      },

      {
        id: 2,
        title: "Candlestick Charts",
        duration: "12 min",
        content: `
A candlestick represents price information for a specific period.

The four basic values are:

Open
High
Low
Close

A candle contains a body and wicks.

The body represents the relationship between opening and closing prices.

The upper and lower wicks show the high and low reached during the period.

Candlesticks can help visualize price movement, but individual patterns should not be treated as guaranteed signals.
        `,
        example: `
If a stock opens at ₹100 and closes at ₹110:

Open = ₹100
Close = ₹110

If the highest price during the period is ₹115 and the lowest is ₹98:

High = ₹115
Low = ₹98
        `,
        keyPoints: [
          "Candlesticks show Open, High, Low and Close.",
          "The body represents opening and closing prices.",
          "Wicks represent price extremes."
        ],
        practice: {
          question:
            "Which four values form the basic OHLC data?",
          options: [
            "Open, High, Low, Close",
            "Order, Holding, Loan, Capital",
            "Output, High, Liability, Cost",
            "Open, Holding, Level, Company"
          ],
          answer: 0,
          explanation:
            "OHLC stands for Open, High, Low and Close."
        }
      },

      {
        id: 3,
        title: "Support and Resistance",
        duration: "10 min",
        content: `
Support is a price area where buying interest may become stronger relative to selling pressure.

Resistance is a price area where selling pressure may become stronger relative to buying interest.

These are analytical concepts rather than guarantees.

Prices can break through both support and resistance.

Traders often use historical price behavior to identify possible support and resistance zones.
        `,
        example: `
If a stock repeatedly declines toward ₹400 and then finds buying interest, ₹400 may be studied as a possible support area.

If the stock repeatedly struggles around ₹500, that area may be studied as possible resistance.
        `,
        keyPoints: [
          "Support refers to a possible buying-interest area.",
          "Resistance refers to a possible selling-pressure area.",
          "Both can fail."
        ],
        practice: {
          question:
            "A price area where selling pressure may increase is commonly called:",
          options: [
            "Resistance",
            "Dividend",
            "EPS",
            "Liquidity"
          ],
          answer: 0,
          explanation:
            "Resistance is a technical-analysis concept referring to an area where selling pressure may increase."
        }
      }
    ],
    assessment: [
      {
        question: "Technical analysis commonly studies:",
        options: [
          "Price and volume",
          "Only company employees",
          "Only dividends",
          "Only balance sheets"
        ],
        answer: 0
      },
      {
        question: "OHLC stands for:",
        options: [
          "Open High Low Close",
          "Order High Loan Capital",
          "Open Holding Loss Cost",
          "Output High Level Company"
        ],
        answer: 0
      },
      {
        question: "Support is generally associated with:",
        options: [
          "A potential buying-interest area",
          "Guaranteed profit",
          "Company debt",
          "Dividend payment"
        ],
        answer: 0
      }
    ],
    videos: [
      {
        title: "Technical Analysis Learning Resource",
        description:
          "Use this video as supplementary material while learning technical analysis.",
        videoId: "p5ORIeMULIg"
      }
    ]
  },

  {
    id: 11,
    level: "Advanced",
    title: "Portfolio Management",
    shortTitle: "Portfolio",
    description:
      "Learn holdings, portfolio value, profit and loss, diversification and asset allocation.",
    duration: "65 min",
    lessons: [
      {
        id: 1,
        title: "What is a Portfolio?",
        duration: "8 min",
        content: `
A portfolio is a collection of investments owned by an individual or organization.

A portfolio can contain multiple securities or asset classes.

Example:

10 shares of Company A
5 shares of Company B
Units of a mutual fund
A bond

A portfolio allows investors to view their investments together.

Portfolio management involves decisions concerning allocation, diversification, risk and objectives.
        `,
        example: `
Portfolio:

Company A = ₹20,000
Company B = ₹15,000
Company C = ₹10,000

Total portfolio value = ₹45,000
        `,
        keyPoints: [
          "A portfolio is a collection of investments.",
          "Multiple securities can form a portfolio.",
          "Portfolio management involves allocation and risk considerations."
        ],
        practice: {
          question:
            "What is a portfolio?",
          options: [
            "A collection of investments",
            "A single stock only",
            "A stock exchange",
            "A bank loan"
          ],
          answer: 0,
          explanation:
            "A portfolio is a collection of investments held by an investor."
        }
      }
    ],
    assessment: [
      {
        question: "A portfolio is:",
        options: [
          "A collection of investments",
          "A single transaction",
          "A stock exchange",
          "A broker"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 12,
    level: "Advanced",
    title: "IPO and Corporate Actions",
    shortTitle: "IPO & Corporate Actions",
    description:
      "Understand IPOs, dividends, bonus shares, stock splits, rights issues and buybacks.",
    duration: "70 min",
    lessons: [
      {
        id: 1,
        title: "What is an IPO?",
        duration: "10 min",
        content: `
IPO stands for Initial Public Offering.

An IPO is a process through which a company offers shares to the public under the applicable regulatory framework and seeks listing on a stock exchange.

A simplified journey is:

Company
↓
IPO process
↓
Investor applications
↓
Allotment
↓
Listing
↓
Secondary-market trading

The exact process involves regulatory, legal and financial requirements.
        `,
        example: `
A company that was previously privately held may decide to raise capital from public investors and seek listing through an IPO process.
        `,
        keyPoints: [
          "IPO stands for Initial Public Offering.",
          "An IPO can allow a company to raise capital from public investors.",
          "Listing allows shares to trade in the secondary market subject to applicable rules."
        ],
        practice: {
          question:
            "What does IPO stand for?",
          options: [
            "Initial Public Offering",
            "Investment Price Order",
            "Indian Public Ownership",
            "Initial Portfolio Operation"
          ],
          answer: 0,
          explanation:
            "IPO stands for Initial Public Offering."
        }
      }
    ],
    assessment: [
      {
        question: "IPO stands for:",
        options: [
          "Initial Public Offering",
          "Investment Portfolio Order",
          "Indian Price Operation",
          "Initial Private Ownership"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 13,
    level: "Advanced",
    title: "Trading",
    shortTitle: "Trading",
    description:
      "Learn different trading styles, entries, exits, stop-loss, targets and risk-reward concepts.",
    duration: "70 min",
    lessons: [
      {
        id: 1,
        title: "Investing vs Trading",
        duration: "8 min",
        content: `
Investing and trading are different approaches to participating in financial markets.

Investing often focuses on longer-term ownership and the underlying asset or business.

Trading often focuses more on shorter-term price movements.

Trading styles can include:

• Intraday trading
• Swing trading
• Position trading
• Scalping

Every trading approach involves risk.

Short-term price movements can be unpredictable.
        `,
        example: `
An investor may hold a stock for several years based on a long-term thesis.

A swing trader may hold a position for several days or weeks based on a trading strategy.
        `,
        keyPoints: [
          "Investing often has a longer time horizon.",
          "Trading often focuses on shorter-term price movements.",
          "Both involve risk."
        ],
        practice: {
          question:
            "Which approach generally focuses more on shorter-term price movement?",
          options: [
            "Trading",
            "Long-term investing only",
            "Saving",
            "Budgeting"
          ],
          answer: 0,
          explanation:
            "Trading commonly focuses more on shorter-term price movements."
        }
      }
    ],
    assessment: [
      {
        question: "Intraday trading generally means:",
        options: [
          "Opening and closing trades within the same trading day",
          "Holding every stock for ten years",
          "Only buying IPOs",
          "Avoiding markets"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 14,
    level: "Advanced",
    title: "Derivatives",
    shortTitle: "Derivatives",
    description:
      "Learn the basics of futures, options, calls, puts, strike prices, premiums and expiry.",
    duration: "80 min",
    lessons: [
      {
        id: 1,
        title: "What are Derivatives?",
        duration: "10 min",
        content: `
A derivative is a financial instrument whose value is derived from an underlying asset, index or other reference.

Common derivatives include:

• Futures
• Options

The underlying can be a stock, index, commodity, currency or another reference depending on the contract.

Derivatives can be complex and can involve substantial risk, including leverage-related losses.
        `,
        example: `
An option contract may derive its value partly from the movement of an underlying stock.

The option itself is a separate financial instrument.
        `,
        keyPoints: [
          "Derivatives derive value from an underlying reference.",
          "Futures and options are common derivatives.",
          "Derivatives can involve substantial risk."
        ],
        practice: {
          question:
            "A derivative derives its value from:",
          options: [
            "An underlying asset or reference",
            "Only a savings account",
            "Only company employees",
            "A tax return"
          ],
          answer: 0,
          explanation:
            "A derivative's value is linked to an underlying asset, index or other reference."
        }
      }
    ],
    assessment: [
      {
        question: "Which is a derivative?",
        options: [
          "Option",
          "Savings account",
          "Company employee",
          "Invoice"
        ],
        answer: 0
      }
    ],
    videos: []
  },

  {
    id: 15,
    level: "Advanced",
    title: "Risk Management and Investor Psychology",
    shortTitle: "Risk & Psychology",
    description:
      "Understand market risk, diversification, position sizing, fear, greed, FOMO and common behavioral biases.",
    duration: "70 min",
    lessons: [
      {
        id: 1,
        title: "Understanding Investment Risk",
        duration: "10 min",
        content: `
Investment risk is the possibility that an investment may produce an unexpected outcome, including a loss.

Common forms include:

• Market risk
• Business risk
• Liquidity risk
• Concentration risk
• Volatility risk

Risk management involves identifying risks and using appropriate methods to control or reduce exposure.

Diversification is one commonly discussed risk-management approach.

Diversification does not eliminate risk.
        `,
        example: `
If an investor puts their entire portfolio into one company, poor performance of that company can have a large effect on the portfolio.

Holding investments across different assets or companies may reduce concentration risk, although it cannot eliminate all losses.
        `,
        keyPoints: [
          "Risk cannot be completely eliminated.",
          "Diversification can reduce concentration risk.",
          "Risk management is an important part of investing."
        ],
        practice: {
          question:
            "What is concentration risk?",
          options: [
            "Risk created by having too much exposure to one investment or area",
            "Guaranteed profit",
            "Dividend income",
            "Trading volume"
          ],
          answer: 0,
          explanation:
            "Concentration risk occurs when a portfolio has excessive exposure to one investment or area."
        }
      },

      {
        id: 2,
        title: "Fear, Greed and FOMO",
        duration: "10 min",
        content: `
Investment decisions are not always based purely on financial analysis.

Emotions can influence decisions.

Fear may cause an investor to sell during a sudden decline.

Greed may encourage excessive risk-taking.

FOMO means Fear Of Missing Out.

An investor experiencing FOMO may purchase an asset simply because other people appear to be making money.

Recognizing emotional biases can help investors make more deliberate decisions.
        `,
        example: `
A stock rises sharply over several days.

A person who sees others discussing large profits may feel pressure to buy without understanding the company or the risk.

That emotional reaction can be described as FOMO.
        `,
        keyPoints: [
          "Emotions can influence financial decisions.",
          "FOMO can lead to impulsive decisions.",
          "Understanding behavioral biases can improve decision-making discipline."
        ],
        practice: {
          question:
            "What does FOMO stand for?",
          options: [
            "Fear Of Missing Out",
            "Financial Order Market Operation",
            "Future Ownership Market Option",
            "Fixed Order Management Output"
          ],
          answer: 0,
          explanation:
            "FOMO means Fear Of Missing Out."
        }
      }
    ],
    assessment: [
      {
        question: "What is concentration risk?",
        options: [
          "Excessive exposure to one investment or area",
          "Guaranteed profit",
          "Dividend income",
          "Trading volume"
        ],
        answer: 0
      },
      {
        question: "FOMO means:",
        options: [
          "Fear Of Missing Out",
          "Future Order Market Operation",
          "Financial Ownership Management Option",
          "Fixed Order Market Output"
        ],
        answer: 0
      }
    ],
    videos: []
  }
];

export default learningModules;