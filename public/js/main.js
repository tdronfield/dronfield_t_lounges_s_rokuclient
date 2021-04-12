import LoginComponent from "./components/TheLoginComponent.js";
import AllUsers from "./components/TheAllUsersComponent.js";
import HomeComponent from "./components/TheHomeComponent.js";

const router = new VueRouter({
    routes: [
        { path: "/", name: "root", component: LoginComponent, beforeEnter: (to, from, next) => {
            // if you're logged in (in local storage), go to home page
            if (localStorage.getItem('cacheduser')){
                let user = JSON.parse(localStorage.getItem('cacheduser'));
                next({name: 'home', params: {currentuser: user}});
            } else {
                next();
            }
        }},
        { path: "/users", name: "users", component: AllUsers },
        { path: "/home", name: "home", component: HomeComponent, props: true}
    ]
});

(() => {
    const vm = new Vue({
        data: {
            authenticated: false,
            isAdmin: false,
            currentuser: undefined
        },

        created: function(){
            // *** THIS IS OLD CODE FROM BEFORE LOGIN COMPONENT IMPLEMENTED ****
            // a fetch call to grab all our movies from the database
            // fetch("/api/movies")
            //     .then(res => res.json())
            //     .then(data => {
            //         console.table(data);
            //         this.allMovies = data;
            //     })
            //     .catch(err => console.error(err));
            // *** END OLD CODE ***
        },

        methods: {
            logout(){
                // remove the cached user from localstorage if it exists
                if (localStorage.getItem('cacheduser')){
                    localStorage.removeItem('cacheduser');
                }
                // redirect the user (push) back to the root (home/index) route
                this.$router.push({ name: "root" });
                this.currentUser = undefined;
            },

            authenticateUser(user) {
                // debugger;
                this.currentUser = user;
            }
        },

        components: {
            //moviethumb: TheMovieThumb,
        },

        router
    }).$mount("#app");
})();