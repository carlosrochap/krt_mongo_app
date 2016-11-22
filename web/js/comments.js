var Comments = React.createClass({


    // search: function (URL, query) {
    //     $.ajax({
    //         type: "POST",
    //         data: {'search-text': query},
    //         dataType: 'json',
    //         url: URL,
    //         success: function (response) {
    //             this.showResults(response, query);
    //         }.bind(this)
    //     });
    // },

    render: function () {

        return (
            <div className="container">
                <textarea name="text"></textarea>
                <button name="submit" value="Post Comment"/>
            </div>
        );

    },
});