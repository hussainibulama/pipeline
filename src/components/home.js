import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import data from "./filter.json";
import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      login: "no",
      username: "admin",
      password: "admin",
      activeshapes: "Round",
      activeIndex: 0,
      selections: [],
    };
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  async decision() {
    if (
      this.state.selections.length ===
      Object.keys(data.Color).length * Object.keys(data.Shape).length
    ) {
      this.setState({ test: "All items" });
    } else if (
      this.state.selections.every(
        (val, i, arr) =>
          val.shape === arr[0].shape && this.state.selections.length > 1
      ) &&
      !this.state.selections.every(
        (val, i, arr) => val.color === arr[0].color
      ) &&
      this.state.selections.length > Object.keys(data.Color).length - 1
    ) {
      this.setState({
        test: "All " + this.state.selections[0].shape + " items",
      });
    } else if (
      this.state.selections.every(
        (val, i, arr) => val.color === arr[0].color
      ) &&
      !this.state.selections.every(
        (val, i, arr) => val.color === arr[0].shape
      ) &&
      this.state.selections.length > Object.keys(data.Shape).length - 1
    ) {
      this.setState({
        test: "All " + this.state.selections[0].color + " items",
      });
    } else if (this.state.selections.length === 1) {
      this.setState({
        test:
          this.state.selections[0].shape +
          " " +
          this.state.selections[0].color +
          " " +
          "items",
      });
    } else if (
      this.state.selections.every(
        (val, i, arr) => val.color === arr[0].color
      ) &&
      !this.state.selections.every((val, i, arr) => val.shape === arr[0].shape)
    ) {
      this.setState({
        test: "Multiple " + this.state.selections[0].color + " items",
      });
    } else if (
      this.state.selections.every(
        (val, i, arr) => val.shape === arr[0].shape
      ) &&
      !this.state.selections.every((val, i, arr) => val.color === arr[0].color)
    ) {
      this.setState({
        test: "Multiple " + this.state.selections[0].shape + " items",
      });
    } else {
      this.setState({
        test: "Multiple items",
      });
    }
  }

  async remove(color) {
    if (this.state.selections.length === 1) {
      this.addall();
    } else {
      let index = this.state.selections.findIndex(
        (v) => v.shape === this.state.activeshapes && v.color === color
      );
      this.state.selections.splice(index, 1);
      this.setState(this.state.selections);
      this.decision();
    }
  }
  async add(colo) {
    this.state.selections.push({ shape: this.state.activeshapes, color: colo });
    this.setState(this.state.selections);
    this.decision();
  }
  async addall() {
    this.state.selections.push(
      {
        shape: "Round",
        color: "Red",
      },
      {
        shape: "Round",
        color: "Blue",
      },
      {
        shape: "Round",
        color: "Green",
      },
      {
        shape: "Round",
        color: "Brown",
      },
      {
        shape: "Round",
        color: "Yellow",
      },
      {
        shape: "Oval",
        color: "Red",
      },
      {
        shape: "Oval",
        color: "Blue",
      },
      {
        shape: "Oval",
        color: "Green",
      },
      {
        shape: "Oval",
        color: "Brown",
      },
      {
        shape: "Oval",
        color: "Yellow",
      },
      {
        shape: "Rectangle",
        color: "Red",
      },
      {
        shape: "Rectangle",
        color: "Blue",
      },
      {
        shape: "Rectangle",
        color: "Green",
      },
      {
        shape: "Rectangle",
        color: "Brown",
      },
      {
        shape: "Rectangle",
        color: "Yellow",
      },
      {
        shape: "Square",
        color: "Red",
      },
      {
        shape: "Square",
        color: "Blue",
      },
      {
        shape: "Square",
        color: "Green",
      },
      {
        shape: "Square",
        color: "Brown",
      },
      {
        shape: "Square",
        color: "Yellow",
      }
    );
    this.decision();
  }

  async Login() {
    this.setState({ loading: true });
    if (this.state.username === "admin" && this.state.password === "admin") {
      this.setState({ login: "yes" });
    } else {
      alert("Invalid username or password");
    }
  }
  async Logout() {
    this.setState({ login: "no" });
  }
  async componentDidMount() {
    this.addall();
  }
  render() {
    if (this.state.login === "no") {
      return (
        <>
          <div className="body-login">
            <div className="loginform">
              <div className="sign-in-container">
                <h1>Sign in</h1>
                <form onSubmit={this.handleSubmit}>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="username"
                    value={this.state.username ? this.state.username : ""}
                    placeholder="Username"
                  />

                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    value={this.state.password ? this.state.password : ""}
                    placeholder="Password"
                  />
                  <button onClick={() => this.Login()}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="header_topper">
            <div className="wrapit">
              <div className="headers">
                <div className="logo">SHAPES</div>
                <div className="logout" onClick={() => this.Logout()}>
                  Logout{" "}
                  <FontAwesomeIcon
                    onClick={() => this.Logout()}
                    style={{ fontSize: "15px" }}
                    icon={faSignOutAlt}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="wrapit">
              <h1>Filters </h1>
              <h6>Shapes</h6>
              <div className="button-shapes">
                {data.Shape.map((datas, key) => (
                  <>
                    <button
                      className={key === this.state.activeIndex ? "active" : ""}
                      onClick={() =>
                        this.setState({
                          activeIndex: key,
                          activeshapes: datas.shape,
                        })
                      }
                    >
                      {datas.shape}
                    </button>
                  </>
                ))}
              </div>
              <h6>Colors</h6>
              <div className="button-colors">
                {data.Color.map((datas, key) => (
                  <div style={{ display: "inline-block" }} key={key}>
                    {this.state.selections.some(
                      (code) =>
                        (code.shape === this.state.activeshapes) &
                        (code.color === datas.color)
                    ) && (
                      <>
                        {" "}
                        <button
                          onClick={() => this.remove(datas.color)}
                          style={{
                            background: datas.color,
                            border: "2px solid blue",
                          }}
                        ></button>
                      </>
                    )}
                    {!this.state.selections.some(
                      (code) =>
                        (code.shape === this.state.activeshapes) &
                        (code.color === datas.color)
                    ) && (
                      <>
                        {" "}
                        <button
                          onClick={() => this.add(datas.color)}
                          style={{ background: datas.color }}
                        ></button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <h1>{this.state.test}</h1>
              <div className="colorshape">
                {this.state.selections.map((data, key) => (
                  <div className="bg">
                    <div
                      className={data.shape}
                      style={{ background: data.color }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Home;
