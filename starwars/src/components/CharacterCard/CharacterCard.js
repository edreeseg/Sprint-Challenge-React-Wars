import React from 'react';
import PropTypes from 'prop-types';
import './CharacterCard.css';

 class CharacterCard extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             myRef: React.createRef(),
             flipped: false,
         };
     }
    componentDidMount(){
         for (let key in this.props.character){
             if (key === 'url'){
                 this.setState({ [key]: this.props.character[key] });
             }
             else if (Array.isArray(this.props.character[key])){
                 this.setState({[key]: []},() => {
                     this.props.character[key].forEach(x => {
                        fetch(x)
                            .then(res => res.json())
                            .then(data => this.setState((prevState) => { return { [key]: prevState[key].concat(data.name || data.title)}}))
                            .catch(err => { throw new Error(err) });
                        });
                 });
                }
             else if (/^http/gi.test(this.props.character[key])){
                 fetch(this.props.character[key])
                 .then(res => res.json())
                 .then(data => this.setState({ [key]: data.name }))
                 .catch(err => { throw new Error(err) });
             } else {
                 this.setState({ [key]: this.props.character[key] })
             }
         }
     }
     flip = e => {
         const target = this.state.myRef.current;
            target.classList.add('flip-vertical-left')
            target.style.color = 'transparent';
            setTimeout(() => {
                target.classList.remove('flip-vertical-left');
                this.setState((prevState) => { return { flipped: !prevState.flipped } });
                target.style.color = '#222';
            }, 400);
     }
     
     // componentDidUpdate method should be set in place to check for changes and repeat process above if changed.

     render(){
         return (
            <div className="character-card" onClick={this.flip} ref={this.state.myRef}>
            {this.state.flipped ? (
                <div className="flipped-true">
                    <p><span>Name:</span> {this.state.name}</p>
                    <p><span>Born:</span> {this.state.birth_year}</p>
                    <p><span>Gender:</span> {this.state.gender}</p>
                    <p><span>Species:</span> {this.state.species}</p>
                    <p><span>Height:</span> {this.state.height}</p>
                    <p><span>Mass:</span> {this.state.mass}</p>
                    <p><span>Hair/Skin/Eye Color:</span> {this.state.hair_color} / {this.state.skin_color} / {this.state.eye_color}</p>
                    <p><span>Homeworld:</span> {this.state.homeworld}</p>
                    <p><span>Vehicles:</span> {(this.state.vehicles||[]).length ? (this.state.vehicles||[]).join(', ') : 'None'}</p>
                    <p><span>Starships:</span> {(this.state.starships||[]).length ? (this.state.starships||[]).join(', ') : 'None'}</p>
                    <p><span>Films:</span> {(this.state.films||[]).join(', ')}</p>
                </div>
            ) : (
                <div className="flipped-false">
                    <h2>{this.state.name}</h2>
                </div>
            )}
            </div>
        );
     }
 }

/* birth_year:
"112BBY"
created:
"2014-12-10T15:10:51.357000Z"
edited:
"2014-12-20T21:17:50.309000Z"
eye_color:
"yellow"
films:
Array[6]
gender:
"n/a"
hair_color:
"n/a"
height:
"167"
homeworld:
"https://swapi.co/api/planets/1/"
mass:
"75"
name:
"C-3PO"
skin_color:
"gold"
species:
Array[1]
starships:
Array[0]
url:
"https://swapi.co/api/people/2/"
vehicles:
Array[0] */

CharacterCard.propTypes = {
    character: PropTypes.shape({
        birth_year: PropTypes.string,
        created: PropTypes.string,
        edited: PropTypes.string,
        eye_color: PropTypes.string,
        films: PropTypes.arrayOf(PropTypes.string),
        gender: PropTypes.string,
        hair_color: PropTypes.string,
        height: PropTypes.string,
        homeworld: PropTypes.string,
        mass: PropTypes.string,
        name: PropTypes.string,
        skin_color: PropTypes.string,
        species: PropTypes.arrayOf(PropTypes.string),
        starships: PropTypes.arrayOf(PropTypes.string),
        url: PropTypes.string,
        vehicles: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default CharacterCard;