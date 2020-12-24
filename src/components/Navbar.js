import React from 'react';
import { addMoviesToList, handleMovieSearch } from '../actions';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchText : ''
    }

  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMoviesToList(movie));
    this.setState({
      showSearchResults: false
    });
  }

  handleSearch = () => {
    const {searchText} = this.state;
    //console.log('this', this.props);
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleChange = (e) => {
    this.setState({
      searchText : e.target.value
    });
  }
  render () 
  {
    // const {  } = this.state;
    const {result:movie,showSearchResults} = this.props.search;
    return (
        <div className = "nav">
          <div className ="search-container">
              <input placeholder="Search movies..." onChange = {this.handleChange} />
              <button id="search-btn" onClick = {this.handleSearch}>Search</button>

              {
                showSearchResults && 
                <div className = "search-results">
                  <div className = "search-result">
                    <img src = {movie.Poster} alt ="search-pic" />

                    <div className = "movie-info">
                      <span> {movie.Title}</span>
                      <button onClick = {() => this.handleAddToMovies(movie)}>Add to Movies</button>
                    </div>
                  </div>
                </div>
              }
          </div>
      </div>
    );
  }
}


// class NavWrapper extends React.Component
// {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch = {store.dispatch} search = {this.props.search}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps({search})
{
  return {
    search
  }
}

const ConnectNavComponent = connect(mapStateToProps)(Navbar);

export default ConnectNavComponent;




// logomakr.com/53PevQ