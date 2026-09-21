export const modules = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    shortTitle: "Fundamentals",
    description:
      "Start from zero and understand what stocks are, how ownership works, and why companies enter the stock market.",
    level: "Beginner",
    duration: "45 min",
    icon: "📚",

    lessons: [
      {
        id: 101,
        title: "What is a Stock?",
        duration: "10 min",
        description:
          "Understand what a stock represents and how buying a stock gives you ownership in a company.",

        sections: [
          {
            heading: "What is a Stock?",
            content:
              "A stock represents a unit of ownership in a company. When a company divides its ownership into smaller units and offers them to investors, those units are called shares or stocks."
          },

          {
            heading: "Simple Example",
            content:
              "Suppose a company has 1,000 shares and you own 10 shares. You own 1% of the company. The exact rights attached to those shares depend on the type of share and the company's structure."
          },

          {
            heading: "Why do Companies Issue Stocks?",
            points: [
              "To raise money for business expansion.",
              "To fund new projects and products.",
              "To reduce dependence on borrowing.",
              "To provide investors an opportunity to participate in the company's growth."
            ]
          },

          {
            heading: "How Investors Make Money",
            points: [
              "Capital appreciation occurs when the market price of a stock increases.",
              "Dividends may provide income when a company distributes part of its profits to shareholders.",
              "Stock prices can also fall, so returns are not guaranteed."
            ]
          }
        ],

        keyPoints: [
          "A stock represents ownership in a company.",
          "Shares are units into which company ownership can be divided.",
          "Stock prices can rise or fall.",
          "Investing in stocks involves risk."
        ]
      },

      {
        id: 102,
        title: "Shares and Ownership",
        duration: "8 min",
        description:
          "Learn how shares represent ownership and how the number of shares affects ownership percentage.",

        sections: [
          {
            heading: "What is a Share?",
            content:
              "A share is a single unit of ownership in a company. Companies can have thousands, millions, or even billions of shares."
          },

          {
            heading: "Ownership Percentage",
            content:
              "Ownership percentage can be calculated by dividing the number of shares owned by the total number of shares outstanding and multiplying by 100."
          },

          {
            heading: "Example",
            content:
              "If a company has 10,000 outstanding shares and an investor owns 100 shares, the investor owns 1% of the shares."
          },

          {
            heading: "Important Terms",
            points: [
              "Shareholder – a person or organization that owns shares.",
              "Outstanding shares – shares currently held by shareholders.",
              "Equity – ownership interest in a company."
            ]
          }
        ],

        keyPoints: [
          "A share represents a unit of ownership.",
          "Ownership percentage depends on the number of shares owned.",
          "Shareholders may receive certain rights depending on the share class."
        ]
      },

      {
        id: 103,
        title: "Why Companies Go Public",
        duration: "9 min",
        description:
          "Understand why companies issue shares to the public and how an IPO works.",

        sections: [
          {
            heading: "What is an IPO?",
            content:
              "IPO stands for Initial Public Offering. It is the process through which a private company offers its shares to the public for the first time."
          },

          {
            heading: "Why Companies Launch an IPO",
            points: [
              "Raise capital.",
              "Expand business operations.",
              "Fund research and development.",
              "Improve public visibility.",
              "Provide an opportunity for existing investors to sell shares subject to applicable rules."
            ]
          },

          {
            heading: "After the IPO",
            content:
              "Once shares are listed on a stock exchange, investors can generally buy and sell them in the secondary market during applicable trading sessions."
          }
        ],

        keyPoints: [
          "IPO means Initial Public Offering.",
          "An IPO can help a company raise capital.",
          "Listed shares can subsequently trade in the secondary market."
        ]
      },

      {
        id: 104,
        title: "Stock Exchanges",
        duration: "10 min",
        description:
          "Learn what stock exchanges do and understand the role of exchanges such as NSE and BSE.",

        sections: [
          {
            heading: "What is a Stock Exchange?",
            content:
              "A stock exchange is an organized marketplace where securities can be listed and traded according to established rules and regulations."
          },

          {
            heading: "NSE",
            content:
              "The National Stock Exchange of India, commonly known as NSE, is one of India's major stock exchanges."
          },

          {
            heading: "BSE",
            content:
              "The BSE, formerly known as the Bombay Stock Exchange, is another major Indian stock exchange."
          },

          {
            heading: "What Happens on an Exchange?",
            points: [
              "Buyers place orders.",
              "Sellers place orders.",
              "Orders are matched according to exchange mechanisms.",
              "Transactions are recorded and processed through the market infrastructure."
            ]
          }
        ],

        keyPoints: [
          "Stock exchanges provide organized marketplaces for securities.",
          "NSE and BSE are major stock exchanges in India.",
          "Investors generally trade through brokers or trading platforms connected to exchanges."
        ]
      }
    ]
  },

  {
    id: 2,
    title: "How the Stock Market Works",
    shortTitle: "How Markets Work",
    description:
      "Understand buyers, sellers, brokers, orders, price movements and the basic process of stock trading.",
    level: "Beginner",
    duration: "50 min",
    icon: "📈",

    lessons: [
      {
        id: 201,
        title: "How Stock Trading Works",
        duration: "10 min",
        description:
          "Understand the basic journey of a buy or sell order.",

        sections: [
          {
            heading: "Basic Trading Process",
            points: [
              "An investor decides to buy or sell a stock.",
              "The investor places an order through a broker or trading platform.",
              "The order is sent to the relevant exchange.",
              "The exchange's trading system matches compatible orders.",
              "After execution, clearing and settlement processes take place."
            ]
          },

          {
            heading: "Buyers and Sellers",
            content:
              "Every executed trade requires a buyer and a seller. The interaction between buying and selling interest contributes to market prices."
          }
        ],

        keyPoints: [
          "Trades involve buyers and sellers.",
          "Orders are placed through brokers or trading platforms.",
          "Matching and settlement are separate parts of the trading process."
        ]
      },

      {
        id: 202,
        title: "Market Orders and Limit Orders",
        duration: "10 min",
        description:
          "Learn the difference between common order types.",

        sections: [
          {
            heading: "Market Order",
            content:
              "A market order is an instruction to buy or sell immediately at the best available price in the market."
          },

          {
            heading: "Limit Order",
            content:
              "A limit order specifies the maximum price at which a buyer is willing to buy or the minimum price at which a seller is willing to sell."
          },

          {
            heading: "Example",
            content:
              "If a stock is trading around ₹500, an investor might place a limit buy order at ₹490. The order would execute only if the applicable market conditions allow execution at ₹490 or better."
          }
        ],

        keyPoints: [
          "Market orders prioritize execution.",
          "Limit orders specify a price condition.",
          "An order may not execute if its conditions are not met."
        ]
      },

      {
        id: 203,
        title: "Why Stock Prices Move",
        duration: "12 min",
        description:
          "Understand the role of supply, demand, expectations and company information.",

        sections: [
          {
            heading: "Supply and Demand",
            content:
              "Stock prices are influenced by buying and selling interest. When demand for a stock is stronger relative to available selling interest, its market price may rise. When selling pressure is stronger, the price may fall."
          },

          {
            heading: "Factors Affecting Prices",
            points: [
              "Company earnings",
              "Revenue growth",
              "Industry conditions",
              "Economic conditions",
              "Interest rates",
              "News and announcements",
              "Investor expectations",
              "Market sentiment"
            ]
          }
        ],

        keyPoints: [
          "Prices change because market participants continuously buy and sell.",
          "Company information and expectations can influence demand.",
          "Short-term price movements can be difficult to predict."
        ]
      },

      {
        id: 204,
        title: "Bull Market and Bear Market",
        duration: "8 min",
        description:
          "Understand common terms used to describe broad market conditions.",

        sections: [
          {
            heading: "Bull Market",
            content:
              "A bull market generally refers to a period characterized by broadly rising market prices and positive investor expectations."
          },

          {
            heading: "Bear Market",
            content:
              "A bear market generally refers to a period characterized by broadly declining market prices and weaker investor sentiment."
          },

          {
            heading: "Important Point",
            content:
              "These terms describe broad market conditions. Individual stocks can move differently from the overall market."
          }
        ],

        keyPoints: [
          "Bull markets are associated with rising prices.",
          "Bear markets are associated with declining prices.",
          "Individual stocks may behave differently from the overall market."
        ]
      }
    ]
  },

  {
    id: 3,
    title: "Buying and Selling Stocks",
    shortTitle: "Trading Basics",
    description:
      "Learn how investors place trades, understand quantity and price, and calculate basic profit and loss.",
    level: "Beginner",
    duration: "45 min",
    icon: "💰",

    lessons: [
      {
        id: 301,
        title: "How to Buy a Stock",
        duration: "10 min",
        description:
          "Learn the basic steps involved in purchasing shares.",

        sections: [
          {
            heading: "Basic Steps",
            points: [
              "Choose a stock after researching it.",
              "Check the current market information.",
              "Choose the order type.",
              "Enter the quantity.",
              "Review the order.",
              "Submit the order through the trading platform."
            ]
          },

          {
            heading: "Example",
            content:
              "If the market price of a stock is ₹200 and you purchase 10 shares, the trade value before applicable charges is ₹2,000."
          }
        ],

        keyPoints: [
          "Always understand what you are buying.",
          "Quantity multiplied by price gives the basic trade value.",
          "Actual transactions can involve applicable charges and taxes."
        ]
      },

      {
        id: 302,
        title: "Profit and Loss",
        duration: "10 min",
        description:
          "Learn how to calculate basic gains and losses from stock price changes.",

        sections: [
          {
            heading: "Basic Profit Formula",
            content:
              "Profit = Selling Price − Buying Price, for one share when the selling price is higher."
          },

          {
            heading: "Example",
            content:
              "Suppose you buy 10 shares at ₹100 each and later sell them at ₹120 each. The price gain per share is ₹20, giving a gross gain of ₹200 before applicable costs and taxes."
          },

          {
            heading: "Loss",
            content:
              "If the selling price is below the purchase price, the difference represents a loss before considering transaction costs and taxes."
          }
        ],

        keyPoints: [
          "Profit depends on the difference between selling and buying prices.",
          "Quantity affects the total gain or loss.",
          "Transaction costs can affect the final result."
        ]
      },

      {
        id: 303,
        title: "Dividends",
        duration: "8 min",
        description:
          "Understand dividends and why some companies distribute part of their profits to shareholders.",

        sections: [
          {
            heading: "What is a Dividend?",
            content:
              "A dividend is a distribution made by a company to eligible shareholders according to the company's declared dividend terms."
          },

          {
            heading: "Dividend Example",
            content:
              "If a company declares a dividend of ₹5 per share and an investor holds 100 eligible shares, the declared dividend amount would be ₹500 before applicable taxes or other considerations."
          },

          {
            heading: "Important Point",
            content:
              "Companies are not required to pay dividends simply because they are profitable. Dividend decisions depend on the company's policies, financial position and applicable corporate processes."
          }
        ],

        keyPoints: [
          "Dividends can provide shareholder income.",
          "Dividend amounts are generally expressed per share.",
          "Dividend payments are not guaranteed."
        ]
      }
    ]
  },

  {
    id: 4,
    title: "Fundamental Analysis",
    shortTitle: "Fundamental Analysis",
    description:
      "Learn how investors study a company's business, financial performance and valuation.",
    level: "Intermediate",
    duration: "60 min",
    icon: "🔎",

    lessons: [
      {
        id: 401,
        title: "Introduction to Fundamental Analysis",
        duration: "12 min",
        description:
          "Understand how company fundamentals are studied.",

        sections: [
          {
            heading: "What is Fundamental Analysis?",
            content:
              "Fundamental analysis is an approach to evaluating a company by studying factors such as its business model, financial performance, industry, management, competitive position and valuation."
          },

          {
            heading: "What Analysts Study",
            points: [
              "Revenue",
              "Profit",
              "Cash flow",
              "Debt",
              "Assets",
              "Business model",
              "Industry",
              "Competitive position",
              "Valuation"
            ]
          }
        ],

        keyPoints: [
          "Fundamental analysis focuses on business and financial factors.",
          "Financial statements are an important source of information.",
          "No single metric provides a complete investment decision."
        ]
      },

      {
        id: 402,
        title: "Revenue, Profit and EPS",
        duration: "15 min",
        description:
          "Learn three important measures used when studying companies.",

        sections: [
          {
            heading: "Revenue",
            content:
              "Revenue is the income generated by a company from its business activities before deducting expenses."
          },

          {
            heading: "Profit",
            content:
              "Profit is the amount remaining after the relevant expenses are deducted from revenue."
          },

          {
            heading: "EPS",
            content:
              "Earnings Per Share (EPS) indicates the portion of a company's earnings attributable to each outstanding share, subject to the applicable accounting calculation."
          },

          {
            heading: "Why They Matter",
            points: [
              "Revenue helps show business scale and sales performance.",
              "Profit helps indicate profitability.",
              "EPS connects earnings with the number of shares."
            ]
          }
        ],

        keyPoints: [
          "Revenue and profit are different measures.",
          "EPS expresses earnings on a per-share basis.",
          "Trends over multiple periods can provide more context than one value."
        ]
      },

      {
        id: 403,
        title: "Understanding Financial Statements",
        duration: "15 min",
        description:
          "Learn the basic purpose of the income statement, balance sheet and cash flow statement.",

        sections: [
          {
            heading: "Income Statement",
            content:
              "The income statement summarizes revenue, expenses and profit or loss over a period."
          },

          {
            heading: "Balance Sheet",
            content:
              "The balance sheet presents a company's assets, liabilities and equity at a particular point in time."
          },

          {
            heading: "Cash Flow Statement",
            content:
              "The cash flow statement provides information about cash inflows and outflows from operating, investing and financing activities."
          }
        ],

        keyPoints: [
          "Income statement focuses on performance over a period.",
          "Balance sheet shows financial position at a point in time.",
          "Cash flow statement focuses on movement of cash."
        ]
      }
    ]
  },

  {
    id: 5,
    title: "Technical Analysis",
    shortTitle: "Technical Analysis",
    description:
      "Learn charts, trends, support, resistance, volume and commonly used technical indicators.",
    level: "Intermediate",
    duration: "55 min",
    icon: "📊",

    lessons: [
      {
        id: 501,
        title: "Introduction to Charts",
        duration: "10 min",
        description:
          "Learn why price charts are used in market analysis.",

        sections: [
          {
            heading: "What is a Price Chart?",
            content:
              "A price chart visually represents how the price of a security has changed over a selected period."
          },

          {
            heading: "Common Chart Types",
            points: [
              "Line chart",
              "Bar chart",
              "Candlestick chart"
            ]
          }
        ],

        keyPoints: [
          "Charts show historical price information.",
          "Different chart types present price data differently.",
          "Historical patterns do not guarantee future performance."
        ]
      },

      {
        id: 502,
        title: "Candlestick Charts",
        duration: "12 min",
        description:
          "Understand open, high, low and close prices.",

        sections: [
          {
            heading: "OHLC",
            content:
              "A candlestick generally represents four important prices for a selected period: Open, High, Low and Close."
          },

          {
            heading: "Candle Components",
            points: [
              "Open – price at the beginning of the period.",
              "High – highest price during the period.",
              "Low – lowest price during the period.",
              "Close – price at the end of the period."
            ]
          }
        ],

        keyPoints: [
          "Candlesticks summarize price movement over a period.",
          "OHLC values are fundamental parts of a candlestick."
        ]
      },

      {
        id: 503,
        title: "Support and Resistance",
        duration: "12 min",
        description:
          "Learn two common concepts used in technical analysis.",

        sections: [
          {
            heading: "Support",
            content:
              "Support refers to a price area where buying interest has historically appeared and where downward price movement may encounter increased demand."
          },

          {
            heading: "Resistance",
            content:
              "Resistance refers to a price area where selling interest has historically appeared and where upward price movement may encounter increased supply."
          },

          {
            heading: "Important",
            content:
              "Support and resistance are analytical concepts rather than guaranteed price levels."
          }
        ],

        keyPoints: [
          "Support is associated with potential buying interest.",
          "Resistance is associated with potential selling interest.",
          "These levels can change as market conditions change."
        ]
      }
    ]
  },

  {
    id: 6,
    title: "Financial Ratios",
    shortTitle: "Ratios",
    description:
      "Learn commonly used financial ratios and understand what they can and cannot tell an investor.",
    level: "Intermediate",
    duration: "55 min",
    icon: "🧮",

    lessons: [
      {
        id: 601,
        title: "P/E Ratio",
        duration: "10 min",
        description:
          "Understand the Price-to-Earnings ratio.",

        sections: [
          {
            heading: "Definition",
            content:
              "The Price-to-Earnings (P/E) ratio compares a company's market price per share with its earnings per share."
          },

          {
            heading: "Formula",
            content:
              "P/E = Market Price Per Share ÷ Earnings Per Share"
          },

          {
            heading: "Example",
            content:
              "If the market price is ₹500 and EPS is ₹25, the P/E ratio is 20."
          },

          {
            heading: "Limitation",
            content:
              "P/E should not be interpreted in isolation. Industry characteristics, growth expectations and accounting factors can affect comparisons."
          }
        ],

        keyPoints: [
          "P/E relates price to earnings.",
          "A higher or lower P/E does not automatically mean a stock is good or bad.",
          "Comparisons should consider relevant companies and industries."
        ]
      },

      {
        id: 602,
        title: "Debt-to-Equity Ratio",
        duration: "10 min",
        description:
          "Learn how debt is compared with shareholders' equity.",

        sections: [
          {
            heading: "Definition",
            content:
              "The Debt-to-Equity ratio compares a company's debt with its shareholders' equity."
          },

          {
            heading: "Formula",
            content:
              "Debt-to-Equity = Total Debt ÷ Shareholders' Equity"
          },

          {
            heading: "Interpretation",
            content:
              "The ratio provides information about how much debt financing a company uses relative to equity. Appropriate levels vary by industry and business model."
          }
        ],

        keyPoints: [
          "Debt-to-Equity provides information about financial leverage.",
          "Industry context is important.",
          "A ratio should be studied alongside other financial measures."
        ]
      },

      {
        id: 603,
        title: "ROE and ROCE",
        duration: "12 min",
        description:
          "Understand two profitability-related measures.",

        sections: [
          {
            heading: "ROE",
            content:
              "Return on Equity (ROE) measures profitability relative to shareholders' equity."
          },

          {
            heading: "Basic ROE Formula",
            content:
              "ROE = Net Income ÷ Average Shareholders' Equity × 100"
          },

          {
            heading: "ROCE",
            content:
              "Return on Capital Employed (ROCE) evaluates operating profitability relative to the capital employed in the business."
          },

          {
            heading: "Important",
            content:
              "Different calculation conventions can be used, so the exact formula and definitions should be checked when comparing data sources."
          }
        ],

        keyPoints: [
          "ROE relates earnings to shareholders' equity.",
          "ROCE relates operating performance to capital employed.",
          "Ratios need context when comparing companies."
        ]
      }
    ]
  },

  {
    id: 7,
    title: "Risk and Return",
    shortTitle: "Risk & Return",
    description:
      "Understand investment risk, return, diversification and portfolio basics.",
    level: "Intermediate",
    duration: "50 min",
    icon: "⚖️",

    lessons: [
      {
        id: 701,
        title: "Understanding Investment Risk",
        duration: "12 min",
        description:
          "Learn different types of risks associated with investing.",

        sections: [
          {
            heading: "What is Investment Risk?",
            content:
              "Investment risk refers to the possibility that an investment may produce a result different from what was expected, including loss of capital."
          },

          {
            heading: "Common Risks",
            points: [
              "Market risk",
              "Business risk",
              "Liquidity risk",
              "Credit risk",
              "Interest-rate risk",
              "Inflation risk"
            ]
          }
        ],

        keyPoints: [
          "All investments involve some form of risk.",
          "Different investments have different risk characteristics.",
          "Risk should be considered together with expected return."
        ]
      },

      {
        id: 702,
        title: "Diversification",
        duration: "10 min",
        description:
          "Learn how diversification can reduce concentration risk.",

        sections: [
          {
            heading: "What is Diversification?",
            content:
              "Diversification means spreading investments across different assets, companies, sectors or other categories rather than concentrating everything in one investment."
          },

          {
            heading: "Example",
            content:
              "An investor holding stocks from multiple sectors may be less exposed to a problem affecting only one particular sector than an investor whose entire portfolio is concentrated in that sector."
          },

          {
            heading: "Important",
            content:
              "Diversification can reduce certain company-specific or concentration risks, but it cannot eliminate market risk or guarantee profits."
          }
        ],

        keyPoints: [
          "Diversification spreads exposure.",
          "It can reduce concentration risk.",
          "It does not guarantee positive returns."
        ]
      },

      {
        id: 703,
        title: "Risk and Return Relationship",
        duration: "10 min",
        description:
          "Understand the basic relationship between risk and expected return.",

        sections: [
          {
            heading: "Basic Idea",
            content:
              "Investments with greater uncertainty may offer higher potential returns, but they can also involve greater potential losses."
          },

          {
            heading: "Important Principle",
            content:
              "Higher potential return does not mean a guaranteed higher return. Investors should consider their objectives, time horizon and ability to tolerate losses."
          }
        ],

        keyPoints: [
          "Potential return and risk are related.",
          "Higher risk does not guarantee higher returns.",
          "Investment decisions should account for uncertainty."
        ]
      }
    ]
  },

  {
    id: 8,
    title: "Advanced Stock Market Concepts",
    shortTitle: "Advanced",
    description:
      "Build on your foundation with portfolio thinking, market indices and practical analysis.",
    level: "Advanced",
    duration: "60 min",
    icon: "🚀",

    lessons: [
      {
        id: 801,
        title: "Market Indices",
        duration: "10 min",
        description:
          "Understand what stock market indices represent.",

        sections: [
          {
            heading: "What is a Market Index?",
            content:
              "A market index tracks the performance of a selected group or basket of securities according to a defined methodology."
          },

          {
            heading: "Why Indices Matter",
            points: [
              "They provide a broad market reference.",
              "They can be used as benchmarks.",
              "They help investors understand overall market movements."
            ]
          }
        ],

        keyPoints: [
          "An index represents a defined basket or group of securities.",
          "Indices can be used as market benchmarks."
        ]
      },

      {
        id: 802,
        title: "Portfolio Management Basics",
        duration: "15 min",
        description:
          "Learn the basic principles of managing a collection of investments.",

        sections: [
          {
            heading: "What is a Portfolio?",
            content:
              "A portfolio is a collection of investments held by an individual or organization."
          },

          {
            heading: "Portfolio Considerations",
            points: [
              "Asset allocation",
              "Diversification",
              "Risk tolerance",
              "Investment horizon",
              "Liquidity requirements",
              "Investment objectives"
            ]
          }
        ],

        keyPoints: [
          "A portfolio can contain multiple investments.",
          "Diversification and asset allocation are important portfolio concepts.",
          "Portfolio construction depends on individual circumstances."
        ]
      },

      {
        id: 803,
        title: "Building a Research Process",
        duration: "15 min",
        description:
          "Learn how to organize a structured process for researching stocks.",

        sections: [
          {
            heading: "Step 1 – Understand the Business",
            content:
              "Study what the company sells, how it makes money, who its customers are and what industry it operates in."
          },

          {
            heading: "Step 2 – Study Financials",
            content:
              "Review revenue, profit, cash flow, debt and other relevant financial information."
          },

          {
            heading: "Step 3 – Study Valuation",
            content:
              "Use relevant valuation measures and compare them with appropriate peers and historical context."
          },

          {
            heading: "Step 4 – Consider Risk",
            content:
              "Identify business, market, financial and other risks that could affect the investment."
          }
        ],

        keyPoints: [
          "Research should use multiple sources of information.",
          "No single ratio or indicator is sufficient by itself.",
          "A structured process can make analysis more consistent."
        ]
      }
    ]
  }
];

export default modules;