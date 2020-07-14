import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies } from '../actions';
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
  render() {
    const {list} = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className = "tab">Movies</div>
            <div className="tab">Favourite</div>
          </div>
          <div className="list">
            {list.map((movie,index) => (
              <MovieCard movie = {movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
