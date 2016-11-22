var App = React.createClass({

    getInitialState: function () {
        return {
            searchResults: [],
            query: ''
        }
    },

    showResults: function (response, query) {
        this.setState({
            searchResults: response,
            query: query
        })
    },

    search: function (URL, query) {
        $.ajax({
            type: "POST",
            data: {'search-text': query},
            dataType: 'json',
            url: URL,
            success: function (response) {
                this.showResults(response, query);
            }.bind(this)
        });
    },

    render: function () {

        if (this.state.searchResults.length > 0) {
            return (
                <div className="container">
                    <SearchBox search={this.search}/>
                    <Results searchResults={this.state.searchResults} query={this.state.query} actorDetail={null}/>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <SearchBox search={this.search}/>
                </div>
            );
        }
    },


});
var DropdownButton = ReactBootstrap.DropdownButton,
    MenuItem = ReactBootstrap.MenuItem;

var SearchBox = React.createClass({

    getInitialState: function () {
        return {
            searchCondition: {index: 1, text: 'Wrap Around'}
        }
    },

    applyCondition: function (type) {
        this.setState({
            searchCondition: {index: type, text: event.target.textContent}
        });
    },

    _handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.createAjax();
        }
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="input-group">
                        <div className="input-group-btn search-panel">
                            <DropdownButton ref="searchCondition" title={this.state.searchCondition.text}>
                                <MenuItem onClick={ this.applyCondition.bind(this, 1) }>Wrap Around</MenuItem>
                                <MenuItem onClick={ this.applyCondition.bind(this, 2) }>Full Word Only</MenuItem>
                            </DropdownButton>
                        </div>
                        <input onKeyPress={this._handleKeyPress} ref="query" type="text" className="form-control" placeholder="Search for..."/>
                        <span className="input-group-btn">
                        <button onClick={this.createAjax} className="btn btn-default form-control" type="button"><span
                            className="glyphicon glyphicon-search"/> Go!</button>
                      </span>
                    </div>

                    <div className="input-group">
                        <label className="checkbox-inline"><input type="checkbox" value="stemming"/>Enable Stemming
                            Search</label>
                        <label className="checkbox-inline"><input type="checkbox" value="match-case"/>Match Case</label>
                        <label className="checkbox-inline"><input type="checkbox" value="start-with"/>Start With</label>
                    </div>
                </div>
            </div>
        );
    },

    createAjax: function () {
        var query = ReactDOM.findDOMNode(this.refs.query).value;
        // var category = ReactDOM.findDOMNode(this.refs.category).value;
        var URL = '/MongoProject_war_exploded/actor-search';
        this.props.search(URL, query)
    }

});

var events = new EventEmitter();
var Results = React.createClass({
    //
    // getInitialState: function () {
    //     return {
    //         actorDetail: null
    //     }
    // },

    // getDefaultProps: function(){
    //     return { actorDetail: null };
    // },

    showItemDetail: function (selectedActor) {
        // this.setState({
        //     actorDetail: selectedActor
        // });

        this.props.actorDetail = selectedActor;
        this.forceUpdate();
    },

    render: function () {
        var resultItems = '';

        if (this.props.actorDetail) {
            resultItems = (
                <div className="row">
                    <a href="#" onClick={this.showItemDetail.bind(this, null)} > Back to Search </a>
                    {/*<h2>{this.state.actorDetail.actor}</h2>*/}
                    {/*<p>{this.state.actorDetail.biography}</p>*/}

                    <article className="search-result row">
                        <div className="col-xs-12 col-sm-12 col-md-3">
                            <a href="#" title="Lorem ipsum" className="thumbnail">
                                <img src={"" + this.props.actorDetail.image_url} alt={"" + this.props.actorDetail.actor}/>
                            </a>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-9 excerpet">
                            <h3><a href="#" title="">{this.props.actorDetail.actor}</a>
                            </h3>
                            <p>{this.props.actorDetail.biography}</p>
                            <hr />
                            <div>
                                <Comments docId={this.props.actorDetail._id} comments={this.props.actorDetail.comments} />
                            </div>

                        </div>
                        <span className="clearfix borda"></span>
                    </article>
                </div>


            );
        } else {
            resultItems = this.props.searchResults.map(function (result) {
                // return <ResultItem key={result.trackId} actor={result.actor} trackName={result.biography} />
                // return <ResultItem actor={result.actor} biography={result.biography} picture={result.image_url}/>
                return (
                    <article className="search-result row">
                        <div className="col-xs-12 col-sm-12 col-md-3">
                            <a href="#" title="Lorem ipsum" className="thumbnail">
                                <img src={"" + result.image_url} alt={"" + result.actor}/>
                            </a>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-9 excerpet">
                            <h3><a href="#" title="" onClick={this.showItemDetail.bind(this, result)}>{result.actor}</a>
                            </h3>
                            <p>{result.biography.substr(0, 600)}...</p>

                        </div>
                        <span className="clearfix borda"></span>
                    </article>
                );
            }.bind(this));

            resultItems = (
                <div className="form-group">
                    <hgroup className="mb20">
                        <h1>Search Results</h1>
                        <h2 className="lead"><strong className="text-danger">
                            {this.props.searchResults.length}</strong> results were found for <strong className="text-danger">{this.props.query}</strong>
                        </h2>
                    </hgroup>
                            <section className="col-xs-12 col-sm-6 col-md-12">{resultItems}
                    </section>
                </div>
            );
        }
        return (
            <div className="row">
                <br />
                {resultItems}
            </div>
        );
    }
});

var ResultItemDetail = React.createClass({
    render: function () {
        return (
            <div className="row">
                <h2>{this.props.actor.actor}</h2>
                <p>{this.props.actor.biography}</p>
            </div>
        );
    }
});

var Comments = React.createClass({


    // search: function (URL, query) {
    //
    // },

    postComment: function () {
        var commentText = ReactDOM.findDOMNode(this.refs.comment).value;
        ReactDOM.findDOMNode(this.refs.comment).value = '';

        this.props.comments.push({text:commentText});

        $.ajax({
            type: "POST",
            data: {docId: this.props.docId['$oid'], text: commentText},
            dataType: 'json',
            url: '/MongoProject_war_exploded/comments',
            success: function (response) {
                // this.showResults(response, query);

            }.bind(this)
        })

        this.forceUpdate();
    },

    componentWillMount: function () {
        // console.log('fetching comments');
        $.ajax({
            type: "GET",
            // data: {documentId: this.props.docId['$oid']},
            dataType: 'json',
            url: '/MongoProject_war_exploded/comments/?docId='+this.props.docId['$oid'],
            success: function (response) {
                this.showResults(response, query);
            }.bind(this)
        });
    },

    render: function () {

        var comments = this.props.comments.map(function (result) {
            return <p>{result.text}<hr /></p>;
        });

        return (
            <div>
                <div className="row"><hr />{comments}</div>
                <div className="row">


                    <textarea ref="comment"></textarea>
                    <button onClick={this.postComment} name="submit">Post Comment</button>
                </div>
            </div>

        );

    },
});

ReactDOM.render(<App />, document.getElementById("root"));
