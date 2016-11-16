var App = React.createClass({

    getInitialState: function() {
        return {
            searchResults: []
        }
    },

    showResults: function(response){
        console.log(response);
        this.setState({
            searchResults: response
        })
    },

    search: function(URL, query){
        $.ajax({
            type: "POST",
            data:{'search-text': query},
            dataType: 'json',
            url: URL,
            success: function(response){
                this.showResults(response);
            }.bind(this)
        });
    },

    render: function(){
        return (
            <div className="container">
                <SearchBox search={this.search} />
                <Results searchResults={this.state.searchResults} />
            </div>
        );
    },


});

var SearchBox = React.createClass({

    render: function(){
        return (

                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2">
                        <div className="input-group">
                            <div className="input-group-btn search-panel">

                            </div>
                            <input ref="query" type="text" className="form-control" placeholder="Search for..." />
                          <span className="input-group-btn">
                            <button onClick={this.createAjax} className="btn btn-default form-control" type="button"><span className="glyphicon glyphicon-search" /> Go!</button>
                          </span>
                        </div>

                        <div className="input-group">
                            <label className="checkbox-inline"><input type="checkbox" value="" />Enable Fulltext Search</label>
                            <label className="checkbox-inline"><input type="checkbox" value="" />Option 2</label>
                        </div>
                    </div>
                </div>
        );
    },

    createAjax: function(){
        var query    = ReactDOM.findDOMNode(this.refs.query).value;
        // var category = ReactDOM.findDOMNode(this.refs.category).value;
        var URL      = '/MongoProject_war_exploded/hello';// + query +'&country=us&entity=' + category;
        this.props.search(URL, query)
    }

});

var Results = React.createClass({

    render: function(){
        var resultItems = this.props.searchResults.map(function(result) {
            // return <ResultItem key={result.trackId} actor={result.actor} trackName={result.biography} />
            return <ResultItem actor={result.actor} biography={result.biography} picture={result.image_url} />
        });
        return(
            <div className="row">
                <hgroup className="mb20">
                    <h1>Search Results</h1>
                    <h2 className="lead"><strong className="text-danger">3</strong> results were found for the search for <strong className="text-danger">Lorem</strong></h2>
                </hgroup>
                <section className="col-xs-12 col-sm-6 col-md-12">
                    {resultItems}
                </section>
            </div>
        );
    }
});

var ResultItem = React.createClass({

    render: function() {
        // return <li><table><tr><td><img src={""+this.props.picture} /></td><td>{this.props.biography.substr(0, 600)}...</td></tr></table></li>;
        return (
            <article className="search-result row">
                <div className="col-xs-12 col-sm-12 col-md-3">
                    <a href="#" title="Lorem ipsum" className="thumbnail"><img
                        src={""+this.props.picture} alt={""+this.props.actor}/></a>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-2">
                    <ul className="meta-search">
                        <li><i className="glyphicon glyphicon-calendar"></i> <span>02/15/2014</span></li>
                        <li><i className="glyphicon glyphicon-time"></i> <span>4:28 pm</span></li>
                        <li><i className="glyphicon glyphicon-tags"></i> <span>People</span></li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-7 excerpet">
                    <h3><a href="#" title="">{this.props.actor}</a></h3>
                    <p>{this.props.biography.substr(0, 600)}...</p>
                    <span className="plus"><a href="#" title={""+this.props.actor}><i className="glyphicon glyphicon-plus"></i></a></span>
                </div>
                <span className="clearfix borda"></span>
            </article>
        );
    }
})

ReactDOM.render(<App />,  document.getElementById("root"));
