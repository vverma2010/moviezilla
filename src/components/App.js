import React from 'react';
import {data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';
import {connect} from 'react-redux';

class App extends React.Component {

  componentDidMount () {
    // const {store} = this.props;
    // store.subscribe(()=>{
    //   console.log('UPDATED');
    //   // to update app forcefully
    //   this.forceUpdate(); 
      this.props.dispatch(addMovies(data));
    }
    // make api call
    // dispatch action
    // store.dispatch(addMovies(data));
    // console.log('state',this.props.store.getState());

  isFavourite = (movie) => {
    const {movies} = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      return true;
    }
    return false;
  }
  onChangeTab = (value) => {
    this.props.dispatch(setShowFavourite(value))
  }
  render() {
    const { movies, search } = this.props;
    const {list, favourites, showFavourite} = movies //{movies : {}, search : {}}
    const displayTab = showFavourite ? favourites : list;

    return (
      <div className="App">
        <Navbar  search = {search} />
        <div className="main">
          <div className="tabs">
            <div className = {`tab ${showFavourite ? '' : 'active-tabs'}`} onClick = {() => this.onChangeTab(false)}>Movies</div>
            <div className = {`tab ${showFavourite ? 'active-tabs' : ''}`} onClick = {() => this.onChangeTab(true)}>Favourite</div>
          </div>
          <div className="list">
            {displayTab.map((movie,index) => (
              <MovieCard 
                movie = {movie} 
                key={`movies-${index}`} 
                dispatch = {this.props.dispatch}
                isItFavourite = {this.isFavourite(movie)}
                />
            ))}
          </div>
          {displayTab.length === 0 ? <div className="no-movies">No movies to display, Go and add some movies!!</div>  :null }
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component
// {
//   render() 
//   {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store = {store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps (state)
{
  return {
    movies : state.movies,
    search : state.movies
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);


export default connectedAppComponent;
