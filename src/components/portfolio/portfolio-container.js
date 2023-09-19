import React, { Component } from "react";
import axios from "axios";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
    };

    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

    this.handleFilter = this.handleFilter.bind(this);

    console.log("Portfolio contanaier has rendered");
  }

  getPortfolioItems() {
    // Make a request for a user with a given ID
    axios
      .get("https://jordan.devcamp.space/portfolio/portfolio_items")

      .then((response) => {
        // handle success
        console.log("response data ", response);
        this.setState({
          data: response.data.portfolio_items,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  portfolioItems() {
    return this.state.data.map((item) => {
      //return <h1>{item}</h1>;
      console.log("item data", item);
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "Something is changing",
    });
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.category === filter;
      }),
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>isLoading...</div>;
    }

    return (
      <div className="portfolio-items-wrapper ">
        <button className="btn" onClick={() => this.handleFilter("eCommerce")}>
          eCommerce
        </button>
        <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
          Scheduling
        </button>
        <button className="btn" onClick={() => this.handleFilter("Enterprise")}>
          Enterprise
        </button>

        {this.portfolioItems()}

        
      </div>
    );
  }
}
