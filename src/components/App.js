import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';
// import movies from '../reducers';
class App extends React.Component {

  componentDidMount () {
    const {store} = this.props;
    store.subscribe(()=>{
      console.log('UPDATED');
      // to update app forcefully
      this.forceUpdate(); 
    })
    // make api call
    // dispatch action
    store.dispatch(addMovies(data));
    console.log('state',this.props.store.getState());
  }

  isFavourite = (movie) => {
    const {favourites} = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if(index !== -1)
    {
      return true;
    }
    return false;
  }
  onChangeTab = (value) => {
    this.props.store.dispatch(setShowFavourite(value))
  }
  render() {
    const {list, favourites, showFavourite} = this.props.store.getState();
    const displayTab = showFavourite ? favourites : list;
    return (
      <div className="App">
        <Navbar />
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
                dispatch = {this.props.store.dispatch}
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

export default App;
