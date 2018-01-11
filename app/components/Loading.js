const React = require('react');
const PropTypes = require('prop-types');

// var styles = {};

class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: props.text
        }

        this.styles = {
            content: {
                textAlign: 'center',
                fontSize: '35px',
                color: props.color
            }
        }
    }

    componentDidMount() {

        const {text, speed} = this.props;

        // var stopper = this.props.text + '...';
        const stopper = text + '...';

        this.interval = window.setInterval(() => {
            this.state.text === stopper ?
                this.setState(() => ({ text: this.props.text }))
            : this.setState((prevState) => ({ text: prevState.text + '.'}))
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render(){
        return (
            <p style={this.styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
    color: 'red'
};

module.exports = Loading;