var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var AppComponent = require('./components/AppComponent');
var Home = require('./components/home/HomeComponent');
var Repositories = require('./components/repositories/RepositoriesComponent');
var Repository = require('./components/repository/RepositoryComponent');

var routes = (
    <Route name="app" path="/" handler={AppComponent}>
        <Route name="home" handler={Home}/>
        <Route name="repositories" path='repositories' handler={Repositories}>
            <Route name="repository" path=':repositoryId' handler={Repository}/>
            <DefaultRoute handler={Repositories}/>
        </Route>
        <DefaultRoute handler={Home}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});