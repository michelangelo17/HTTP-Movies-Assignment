import React, { Component } from "react";
import Axios from "axios";

export default class AddMovie extends Component {
  state = {
    movie: {
      title: "",
      director: "",
      metascore: 0,
      stars: []
    },
    newStar: ""
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        [e.target.name]: e.target.value
      }
    });
  };

  addStar = e => {
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        stars: [...this.state.movie.stars, this.state.newStar]
      },
      newStar: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.post(`http://localhost:5001/api/movies/`, this.state.movie)
      .then(() => this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <h1>Add A New Movie</h1>
        {this.state.movie && (
          <>
            <form className="add-form" onSubmit={this.handleSubmit}>
              // fake submit button to preven enter from submitting form early
              <button
                type="submit"
                disabled
                style={{ display: "none" }}
                aria-hidden="true"
              ></button>
              <label htmlFor="title">Title: </label>
              <input
                type="string"
                name="title"
                value={this.state.movie.title}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="director">Director: </label>
              <input
                type="string"
                name="director"
                value={this.state.movie.director}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="metascore">Metascore: </label>
              <input
                type="number"
                name="metascore"
                value={this.state.movie.metascore}
                onChange={this.handleChange}
              ></input>
              <label htmlFor="stars">
                Stars:
                <input
                  type="string"
                  name="stars"
                  value={this.state.newStar}
                  onChange={e =>
                    this.setState({ ...this.state, newStar: e.target.value })
                  }
                ></input>
                <button onClick={this.addStar} type="button">
                  Add Star
                </button>
              </label>
              <div>
                <h2>Preview Submission</h2>
                <h3>Title: {this.state.movie.title}</h3>
                <h3>Director: {this.state.movie.director}</h3>
                <h3>Metascore: {this.state.movie.metascore}</h3>
                <h3>Stars: </h3>
                <ul>
                  {this.state.movie.stars.map((star, i) => (
                    <li key={i}>{star}</li>
                  ))}
                </ul>
              </div>
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </>
    );
  }
}
