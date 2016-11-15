console.log('innnnnnnn');



var HelloMessage = React.createClass({
    render: function () {
        return <h1>Hello World!</h1>;
    }
});

ReactDOM.render(<HelloMessage message="World" />, document.getElementById('root'));
console.log('outtt');