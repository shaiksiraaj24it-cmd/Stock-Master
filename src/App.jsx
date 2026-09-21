import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import LearningHome from "./components/Learning/LearningHome";

import StockBasics from "./components/StockMarket/StockBasics";
import StockExplorer from "./components/StockMarket/StockExplorer";

import FundamentalAnalysis from "./components/Analysis/FundamentalAnalysis";
import TechnicalAnalysis from "./components/Analysis/TechnicalAnalysis";
import FinancialRatios from "./components/Analysis/FinancialRatios";

import StockSimulator from "./components/Practice/StockSimulator";

import QuizHome from "./components/Quiz/QuizHome";

import Watchlist from "./components/Watchlist/Watchlist";

import Footer from "./components/Common/Footer";

import { initialStocks } from "./data/stocks";

import "./App.css";


/* =========================================================
   YOUTUBE LEARNING RESOURCES
========================================================= */

const youtubeResources = [
  {
    id: 1,
    title: "Stock Market Basics",
    description:
      "Introduction to stocks, stock market and how investing works.",
    url: "https://youtu.be/p5ORIeMULIg?si=AL9JP4Ah9F4I2wvL",
  },
  {
    id: 2,
    title: "Understanding the Stock Market",
    description:
      "Learn the basic concepts required before starting stock analysis.",
    url: "https://youtu.be/2jC1iAvqExw?si=wF2YreI5R-nvMdH_",
  },
  {
    id: 3,
    title: "Fundamental Analysis",
    description:
      "Understand company fundamentals and how investors evaluate businesses.",
    url: "https://youtu.be/k8AXprgX3Fw?si=8kB03feluaQFW8vK",
  },
  {
    id: 4,
    title: "Technical Analysis",
    description:
      "Introduction to charts, trends and technical analysis concepts.",
    url: "https://youtu.be/qcWZ5pYYCXs?si=1p16CaW_FmsXbMhw",
  },
  {
    id: 5,
    title: "Stock Market Learning",
    description:
      "Additional learning material for strengthening stock market concepts.",
    url: "https://youtu.be/ukOEaNLNiG8?si=O1exLP4tFEYBsw0F",
  },
];


/* =========================================================
   YOUTUBE RESOURCE SECTION
   Appears at the end of learning-related modules
========================================================= */

function YouTubeResources() {
  return (
    <section className="youtube-section">

      <div className="youtube-heading">

        <span className="youtube-label">
          🎥 ADDITIONAL RESOURCES
        </span>

        <h2>
          Continue Learning with Video Tutorials
        </h2>

        <p>
          Completed the module? Strengthen your understanding
          with these carefully selected video resources.
        </p>

      </div>


      <div className="youtube-grid">

        {youtubeResources.map((video) => (

          <div
            className="youtube-card"
            key={video.id}
          >

            <div className="youtube-icon">
              ▶
            </div>

            <div className="youtube-content">

              <h3>
                {video.title}
              </h3>

              <p>
                {video.description}
              </p>

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button"
              >
                Watch on YouTube →
              </a>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================================================
   MODULE INFORMATION
========================================================= */

const learningModules = [

  {
    id: 1,
    title: "Stock Market Fundamentals",
    icon: "📚",
    description:
      "Start from zero and understand what stocks, companies, exchanges, investors and markets are.",
  },

  {
    id: 2,
    title: "Understanding Stock Prices",
    icon: "📈",
    description:
      "Learn why stock prices move, supply and demand, market trends and price changes.",
  },

  {
    id: 3,
    title: "Fundamental Analysis",
    icon: "🔎",
    description:
      "Learn how investors study a company's financial health and business performance.",
  },

  {
    id: 4,
    title: "Technical Analysis",
    icon: "📊",
    description:
      "Understand charts, trends, support, resistance and basic technical indicators.",
  },

  {
    id: 5,
    title: "Financial Ratios",
    icon: "🧮",
    description:
      "Learn important ratios such as P/E, P/B, ROE, EPS and debt-related ratios.",
  },

  {
    id: 6,
    title: "Practical Stock Trading",
    icon: "💰",
    description:
      "Practice buying and selling stocks using virtual money without financial risk.",
  },

];


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [stocks, setStocks] =
    useState(initialStocks);

  const [watchlist, setWatchlist] =
    useState([]);

  const [balance, setBalance] =
    useState(100000);

  const [portfolio, setPortfolio] =
    useState({});


  /* =========================================================
     NAVIGATION HELPER
  ========================================================= */

  const navigateTo = (page) => {
    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================================================
     PRICE INCREASE
  ========================================================= */

  const increasePrice = (id) => {

    setStocks((currentStocks) =>

      currentStocks.map((stock) => {

        if (stock.id !== id) {
          return stock;
        }

        const newPrice =
          Math.round(stock.price * 1.05);

        return {
          ...stock,
          previousPrice: stock.price,
          price: newPrice,
        };

      })

    );
  };


  /* =========================================================
     PRICE DECREASE
  ========================================================= */

  const decreasePrice = (id) => {

    setStocks((currentStocks) =>

      currentStocks.map((stock) => {

        if (stock.id !== id) {
          return stock;
        }

        const newPrice =
          Math.round(stock.price * 0.95);

        return {
          ...stock,
          previousPrice: stock.price,
          price: newPrice,
        };

      })

    );
  };


  /* =========================================================
     WATCHLIST
  ========================================================= */

  const toggleWatchlist = (id) => {

    setWatchlist((current) => {

      if (current.includes(id)) {

        return current.filter(
          (stockId) => stockId !== id
        );

      }

      return [
        ...current,
        id,
      ];

    });

  };


  /* =========================================================
     BUY STOCK
  ========================================================= */

  const buyStock = (stock, quantity) => {

    if (!quantity || quantity <= 0) {
      alert("Enter a valid quantity.");
      return;
    }

    const total =
      stock.price * quantity;


    if (total > balance) {

      alert(
        "Insufficient virtual balance."
      );

      return;
    }


    setBalance(
      (current) =>
        current - total
    );


    setPortfolio((current) => {

      const existing =
        current[stock.id];


      const oldQuantity =
        existing?.quantity || 0;


      const oldAverage =
        existing?.averagePrice ||
        0;


      const newQuantity =
        oldQuantity + quantity;


      const newAveragePrice =
        oldQuantity === 0
          ? stock.price
          : (
              (
                oldQuantity * oldAverage
              ) +
              (
                quantity * stock.price
              )
            ) /
            newQuantity;


      return {

        ...current,

        [stock.id]: {

          quantity:
            newQuantity,

          averagePrice:
            Number(
              newAveragePrice.toFixed(2)
            ),

        },

      };

    });


    alert(
      `Bought ${quantity} shares of ${stock.symbol}`
    );

  };


  /* =========================================================
     SELL STOCK
  ========================================================= */

  const sellStock = (stock, quantity) => {

    if (!quantity || quantity <= 0) {
      alert("Enter a valid quantity.");
      return;
    }


    const owned =
      portfolio[stock.id]?.quantity || 0;


    if (owned === 0) {

      alert(
        `You do not own any shares of ${stock.symbol}.`
      );

      return;
    }


    if (quantity > owned) {

      alert(
        "You don't own enough shares."
      );

      return;
    }


    const total =
      stock.price * quantity;


    setBalance(
      (current) =>
        current + total
    );


    const remaining =
      owned - quantity;


    setPortfolio((current) => {

      const updated = {
        ...current,
      };


      if (remaining === 0) {

        delete updated[stock.id];

      } else {

        updated[stock.id] = {

          ...updated[stock.id],

          quantity:
            remaining,

        };

      }


      return updated;

    });


    alert(
      `Sold ${quantity} shares of ${stock.symbol}`
    );

  };


  /* =========================================================
     DASHBOARD
  ========================================================= */

  const Dashboard = () => {

    const rising =
      stocks.filter(
        (stock) =>
          stock.price >
          stock.previousPrice
      ).length;


    const falling =
      stocks.filter(
        (stock) =>
          stock.price <
          stock.previousPrice
      ).length;


    const portfolioCount =
      Object.keys(portfolio).length;


    return (

      <div className="page">


        {/* HERO */}

        <section className="hero-section">

          <div className="hero-content">

            <span className="hero-label">
              📚 LEARN • ANALYZE • PRACTICE
            </span>


            <h1>
              Welcome to StockMaster 👋
            </h1>


            <p>
              Your interactive journey from
              understanding your first stock to
              analyzing companies and practicing
              virtual trading.
            </p>


            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() =>
                  navigateTo("Learn")
                }
              >
                Start Learning →
              </button>


              <button
                className="secondary-button"
                onClick={() =>
                  navigateTo("Practice")
                }
              >
                Practice Trading
              </button>

            </div>

          </div>


          <div className="hero-illustration">
            📈
          </div>

        </section>


        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card blue-card">

            <span>📊</span>

            <h2>
              {stocks.length}
            </h2>

            <p>
              Stocks Available
            </p>

          </div>


          <div className="stat-card green-card">

            <span>🚀</span>

            <h2>
              {rising}
            </h2>

            <p>
              Rising Stocks
            </p>

          </div>


          <div className="stat-card red-card">

            <span>📉</span>

            <h2>
              {falling}
            </h2>

            <p>
              Falling Stocks
            </p>

          </div>


          <div className="stat-card purple-card">

            <span>⭐</span>

            <h2>
              {watchlist.length}
            </h2>

            <p>
              Watchlist
            </p>

          </div>

        </section>


        {/* LEARNING PATH */}

        <section className="content-section">

          <div className="section-title">

            <div>

              <span className="section-label">
                YOUR LEARNING PATH
              </span>

              <h2>
                Learn Stock Market Step-by-Step
              </h2>

              <p>
                No previous knowledge required.
                Start from the basics and gradually
                move towards analysis and practical trading.
              </p>

            </div>

          </div>


          <div className="module-grid">

            {learningModules.map(
              (module, index) => (

                <div
                  className="module-card"
                  key={module.id}
                >

                  <div className="module-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>


                  <div className="module-icon">
                    {module.icon}
                  </div>


                  <h3>
                    {module.title}
                  </h3>


                  <p>
                    {module.description}
                  </p>


                  <button
                    className="module-button"
                    onClick={() => {

                      if (
                        module.id === 1 ||
                        module.id === 2
                      ) {
                        navigateTo("Learn");
                      }

                      if (module.id === 3) {
                        navigateTo("Analysis");
                      }

                      if (module.id === 4) {
                        navigateTo("Analysis");
                      }

                      if (module.id === 5) {
                        navigateTo("Analysis");
                      }

                      if (module.id === 6) {
                        navigateTo("Practice");
                      }

                    }}
                  >
                    Start Module →
                  </button>

                </div>

              )
            )}

          </div>

        </section>


        {/* FEATURED LEARNING */}

        <section className="content-section">

          <div className="section-title">

            <div>

              <span className="section-label">
                EXPLORE STOCKMASTER
              </span>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>


          <div className="feature-grid">


            <div
              className="feature-card"
              onClick={() =>
                navigateTo("Learn")
              }
            >

              <div className="feature-icon">
                📖
              </div>

              <h3>
                Learn Stocks
              </h3>

              <p>
                Start from zero and learn stocks,
                exchanges, dividends, risk,
                returns and investing concepts.
              </p>

              <span>
                Start Learning →
              </span>

            </div>


            <div
              className="feature-card"
              onClick={() =>
                navigateTo("Market")
              }
            >

              <div className="feature-icon">
                📈
              </div>

              <h3>
                Explore Market
              </h3>

              <p>
                Explore companies and understand
                how stock prices and markets work.
              </p>

              <span>
                Explore Market →
              </span>

            </div>


            <div
              className="feature-card"
              onClick={() =>
                navigateTo("Analysis")
              }
            >

              <div className="feature-icon">
                🔎
              </div>

              <h3>
                Analyze Stocks
              </h3>

              <p>
                Study companies using fundamental
                analysis, technical analysis and
                financial ratios.
              </p>

              <span>
                Analyze Stocks →
              </span>

            </div>


            <div
              className="feature-card"
              onClick={() =>
                navigateTo("Practice")
              }
            >

              <div className="feature-icon">
                💰
              </div>

              <h3>
                Practice Trading
              </h3>

              <p>
                Buy and sell stocks using virtual
                money and build your portfolio
                without real financial risk.
              </p>

              <span>
                Start Practice →
              </span>

            </div>

          </div>

        </section>


        {/* VIDEO RESOURCES */}

        <YouTubeResources />

      </div>

    );

  };


  /* =========================================================
     LEARNING PAGE
  ========================================================= */

  const LearnPage = () => {

    return (

      <div className="page">

        <LearningHome
          onNavigate={navigateTo}
        />


        <YouTubeResources />

      </div>

    );

  };


  /* =========================================================
     MARKET PAGE
  ========================================================= */

  const MarketPage = () => {

    return (

      <div className="page">

        <section className="page-header">

          <span className="section-label">
            STOCK MARKET
          </span>

          <h1>
            Explore the Stock Market
          </h1>

          <p>
            Learn how stocks behave and explore
            companies available in StockMaster.
          </p>

        </section>


        <StockBasics />


        <StockExplorer
          stocks={stocks}
          watchlist={watchlist}
          onWatch={toggleWatchlist}
        />


        <YouTubeResources />

      </div>

    );

  };


  /* =========================================================
     ANALYSIS PAGE
  ========================================================= */

  const AnalysisPage = () => {

    return (

      <div className="page">

        <section className="page-header">

          <span className="section-label">
            STOCK ANALYSIS
          </span>

          <h1>
            Learn How to Analyze a Stock
          </h1>

          <p>
            Move beyond simply looking at stock
            prices. Learn how investors study
            businesses, financial statements,
            ratios and price charts.
          </p>

        </section>


        <FundamentalAnalysis />


        <TechnicalAnalysis />


        <FinancialRatios />


        <YouTubeResources />

      </div>

    );

  };


  /* =========================================================
     PRACTICE PAGE
  ========================================================= */

  const PracticePage = () => {

    return (

      <div className="page">

        <section className="page-header">

          <span className="section-label">
            PRACTICE ZONE
          </span>

          <h1>
            Practice Trading Without Real Money
          </h1>

          <p>
            Use your virtual balance to buy and
            sell stocks, understand portfolio
            management and learn from your decisions.
          </p>

        </section>


        <StockSimulator
          stocks={stocks}
          balance={balance}
          portfolio={portfolio}
          onBuy={buyStock}
          onSell={sellStock}
        />


        <section className="practice-info">

          <div>

            <span>
              💡
            </span>

            <h3>
              Remember
            </h3>

            <p>
              StockMaster uses virtual money for
              educational purposes. No real money
              is invested through this simulator.
            </p>

          </div>

        </section>


        <YouTubeResources />

      </div>

    );

  };


  /* =========================================================
     QUIZ PAGE
  ========================================================= */

  const QuizPage = () => {

    return (

      <div className="page">

        <section className="page-header">

          <span className="section-label">
            ASSESSMENT
          </span>

          <h1>
            Test Your Stock Market Knowledge
          </h1>

          <p>
            Complete quizzes after learning the
            concepts and check how well you understand
            the stock market.
          </p>

        </section>


        <QuizHome
          onNavigate={navigateTo}
        />

      </div>

    );

  };


  /* =========================================================
     WATCHLIST PAGE
  ========================================================= */

  const WatchlistPage = () => {

    return (

      <div className="page">

        <section className="page-header">

          <span className="section-label">
            YOUR WATCHLIST
          </span>

          <h1>
            Track Stocks You Are Interested In
          </h1>

          <p>
            Add stocks to your watchlist and monitor
            their virtual market prices.
          </p>

        </section>


        <Watchlist
          stocks={stocks}
          watchlist={watchlist}
          onWatch={toggleWatchlist}
        />

      </div>

    );

  };


  /* =========================================================
     PAGE ROUTER
  ========================================================= */

  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":
        return <Dashboard />;


      case "Learn":
        return <LearnPage />;


      case "Market":
        return <MarketPage />;


      case "Analysis":
        return <AnalysisPage />;


      case "Practice":
        return <PracticePage />;


      case "Quiz":
        return <QuizPage />;


      case "Watchlist":
        return <WatchlistPage />;


      default:
        return <Dashboard />;

    }

  };


  /* =========================================================
     APPLICATION UI
  ========================================================= */

  return (

    <div className="app">


      <Navbar />


      <div className="app-body">


        <Sidebar
          activePage={activePage}
          setActivePage={navigateTo}
        />


        <main className="main-content">

          {renderPage()}

          <Footer />

        </main>


      </div>


    </div>

  );

}


export default App;