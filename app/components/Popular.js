var React = require('react');

class Popular extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selectedLanguage: 'All'
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLanguage: lang
            }
        });
    }

    render(){
        var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        //console.log('Up Here!',this);

        return (
            
            <ul className='languages'>
                {/* <p>Selected Language : {this.state.selectedLanguage}</p> */}
                {languages.map(function(lang){

                    //console.log('Down Here!',this);

                    return (
                        <li 
                            style={lang === this.state.selectedLanguage ? {color:'#d0021b'} : null}
                            onClick={this.updateLanguage.bind(null, lang)}
                            key={lang}
                        >
                            {lang}
                        </li>
                    )
                }, this)}    
            </ul>
        )
    }
}

module.exports = Popular;