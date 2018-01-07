var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage (props){

    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
        {/* <p>Selected Language : {this.state.selectedLanguage}</p> */}
            {languages.map(function(lang){

                //console.log('Down Here!',this);

                return (
                    <li 
                        style={lang === props.selectedLanguage ? {color:'#d0021b'} : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}
                    >
                        {lang}
                    </li>
                )
            })}    
        </ul>
     ) 
}

function RepoGrid (props){
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index){
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index+1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href = {repo.html_url}>{repo.name}</a></li>
                            <li><b>@{repo.owner.login}</b></li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
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
        this.setState(function(){
            return {
                selectedLanguage: lang,
                repos:null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function(repos){
                this.setState(function(){
                    return{
                        repos: repos
                    }
                })
                console.log(repos);
            }.bind(this));
    }

    render(){
        //var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        //console.log('Up Here!',this);

        return (
            <div>
                <SelectLanguage 
                    selectedLanguage ={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                
                {!this.state.repos ? <Loading text='Querying Github' speed={50} color='green'/> : <RepoGrid repos={this.state.repos}/>}
                
            </div>
        )
    }
}

module.exports = Popular;