import React, { Component } from "react";
import "./App.css";
import instance from "./authaxios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avail: "yes",
      default: 0,
      trending: [],
      search: "",
      searchans: [],
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleChanges = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  async Search() {
    try {
      let res = await instance.get(
        "/search?api_key=BBllUXSslRRw4234LL4rT5VfMbKLLG6A&limit=10&q=" +
          this.state.search,
        {
          api_key: "BBllUXSslRRw4234LL4rT5VfMbKLLG6A",
        }
      );
      let result = await res.data.data;

      this.setState({ searchans: result });
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    try {
      let res = await instance.get(
        "/trending?api_key=BBllUXSslRRw4234LL4rT5VfMbKLLG6A&limit=10",
        {
          api_key: "BBllUXSslRRw4234LL4rT5VfMbKLLG6A",
        }
      );
      let result = await res.data.data;

      this.setState({ trending: result });
    } catch (e) {
      console.log(e);
    }
    console.log("yes");
    console.log(this.state.trending);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="topper">
          <div className="centertopper">
            <h1>Giphy Api Integration</h1>
            <h1>
              {this.state.default !== 1 && (
                <>
                  <button
                    className="normal"
                    onClick={() => this.setState({ default: 1 })}
                  >
                    Trending
                  </button>
                </>
              )}
              {this.state.default === 1 && (
                <>
                  <button
                    className="normal"
                    style={{ textDecoration: "underline" }}
                    onClick={() => this.setState({ default: 1 })}
                  >
                    Trending
                  </button>
                </>
              )}
              |
              {this.state.default !== 2 && (
                <>
                  <button
                    className="normal"
                    onClick={() => this.setState({ default: 2 })}
                  >
                    Search
                  </button>
                </>
              )}
              {this.state.default === 2 && (
                <>
                  <button
                    className="normal"
                    style={{ textDecoration: "underline" }}
                    onClick={() => this.setState({ default: 2 })}
                  >
                    Search
                  </button>
                </>
              )}
            </h1>
            {this.state.default === 0 ? (
              <p>Click any of the links above</p>
            ) : this.state.default === 1 ? (
              <p>Trending list of Giphy:</p>
            ) : (
              <p>Search List of Giphy:</p>
            )}
          </div>
        </div>
        {this.state.default === 1 && (
          <>
            <div className="lower-imager">
              {this.state.trending.map((data) => (
                <>
                  <div className="circular">
                    <embed
                      type="image/jpg"
                      src={"" + data.embed_url}
                      width="150"
                      height="70"
                    />
                    <p>{data.title}</p>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        {this.state.default === 2 && (
          <>
            <div clasName="lower-images">
              <input type="text" onChange={this.handleChanges} name="search" />
              <button onClick={() => this.Search()}>Search</button>
              <p>
                search results for{" "}
                <i style={{ color: "maroon", textDecoration: "underline" }}>
                  {this.state.search}
                </i>
              </p>
              <div className="lower-imager">
                {this.state.searchans.map((data) => (
                  <>
                    <div className="circular">
                      <embed
                        type="image/jpg"
                        src={"" + data.embed_url}
                        width="150"
                        height="70"
                      />

                      <p>{data.title}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default App;
