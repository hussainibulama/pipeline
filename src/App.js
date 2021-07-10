import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import instance from "./authaxios";
import "react-alice-carousel/lib/alice-carousel.css";
let subdomain = window.location.host.split(".")[0];
if (subdomain === "www") {
  subdomain = window.location.host.split(".")[1];
} else {
  subdomain = window.location.host.split(".")[0];
}
let customer_key =
  Math.floor(100000 + Math.random() * 900000) +
  String(Math.floor(100 + Math.random() * 999));
localStorage.setItem("customer_id", customer_key);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avail: "yes",
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  async componentDidMount() {
    console.log(subdomain);
    try {
      let res = await instance.post("/checkstore", {
        username: subdomain,
      });
      let result = await res.data;
      if (result && result.success) {
        this.setState({ avail: "yes" });
        localStorage.setItem("owner_id", result.store_id);
        localStorage.setItem("subdomain", subdomain);
        localStorage.setItem("name", result.name);
        localStorage.setItem("description", result.description);
        localStorage.setItem("logo", result.logo);
        localStorage.setItem("address", result.address);
        localStorage.setItem("phone", result.phone);
        localStorage.setItem("delivery", result.delivery);
        localStorage.setItem("delivery_fee", result.delivery_fee);
        localStorage.setItem("bg", result.bg);
      } else if (result && result.success === false) {
        this.setState({ avail: "no" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );

    /*
  
   const { avail } = this.state;
    if (avail === "yes") {
      return (
        <div>
          <Main />
        </div>
      );
    } else if (avail === "no") {
      return (
        <div className="domain404">
          <div className="domain4041">
            <h2>404 Not Found</h2>

            <p>
              The subdomain {subdomain}.swip.ng doesn`t exist. please use this
              link to signup if you are a new swip user.
            </p>
            <a href="http://swip.ng">Swip Home</a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="domain404">
          <div className="domain4041">
            <h2>404 Not Found</h2>

            <p>
              The subdomain {subdomain}.swip.ng doesn`t exist. please use this
              link to signup if you are a new swip user.
            </p>
            <a href="http://swip.ng">Swip Home</a>
          </div>
        </div>
      );
    }
  */
  }
}

export default App;
