import React, { Component } from "react";
import Axios from "axios";

export default class UpdateMovie extends Component {
  state = {
    movie: null
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  fetchMovie = id => {
    Axios.get(`http://localhost:5001/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
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

  handleChangeStars = (e, i) => {
    const newStars = [...this.state.movie.stars];
    newStars[i] = e.target.value;
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        stars: newStars
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    Axios.put(
      `http://localhost:5001/api/movies/${this.state.movie.id}`,
      this.state.movie
    )
      .then(() => this.props.history.push(`/movies/${this.state.movie.id}`))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <h1>Update Movie</h1>
        {this.state.movie && (
          <form className="update-form" onSubmit={this.handleSubmit}>
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
            <label htmlFor="stars">Stars: </label>
            {this.state.movie.stars.map((star, i) => (
              <input
                key={i}
                type="string"
                name="stars"
                value={this.state.movie.stars[i]}
                onChange={e => this.handleChangeStars(e, i)}
              ></input>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </>
    );
  }
}
