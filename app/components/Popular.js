import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import Loading from './Loading';

function SelectLanguage ({selectedLanguage, onSelect}){

    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
        {/* <p>Selected Language : {this.state.selectedLanguage}</p> */}
            {languages.map((lang) => (
                    <li 
                        style={lang === selectedLanguage ? {color:'#d0021b'} : null}
                        onClick={() => onSelect(lang)}
                        key={lang}
                    >
                        {lang}
                    </li>
                )
            )}    
        </ul>
     ) 
}

function RepoGrid ({repos}){
    return (
        <ul className='popular-list'>
            {repos.map( ({owner, html_url, stargazers_count, name}, index) => (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index+1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={'Avatar for ' + owner.login}
                                />
                            </li>
                            <li><a href = {html_url}>{name}</a></li>
                            <li><b>@{owner.login}</b></li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            )}
        </ul>
    )
}

// class SelectLanguage extends React.Component{
//     render(){

//         var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
//          return (
//             <ul className='languages'>
//             {/* <p>Selected Language : {this.state.selectedLanguage}</p> */}
//                 {languages.map(function(lang){

//                     //console.log('Down Here!',this);

//                     return (
//                         <li 
//                             style={lang === this.props.selectedLanguage ? {color:'#d0021b'} : null}
//                             onClick={this.props.onSelect.bind(null, lang)}
//                             key={lang}
//                         >
//                             {lang}
//                         </li>
//                     )
//                 }, this)}    
//             </ul>
//          )
//     }
// }

SelectLanguage.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
    repos :PropTypes.array.isRequired
}

class Popular extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    //lifecycle

    componentDidMount(){
        
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang){
        this.setState(() => ({
                selectedLanguage: lang,
                repos:null
            }
        ));

        fetchPopularRepos(lang)
            .then((repos) => this.setState( () => ({ repos })));
    }

    render(){
        //var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        //console.log('Up Here!',this);

        const {selectedLanguage, repos} = this.state;

        return (
            <div>
                <SelectLanguage 
                    selectedLanguage ={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                
                {!this.state.repos ? <Loading text='Querying Github' speed={50} color='green'/> : <RepoGrid repos={repos}/>}
                
            </div>
        )
    }
}

// module.exports = Popular;
export default Popular;