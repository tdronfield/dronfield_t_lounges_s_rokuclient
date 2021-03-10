import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import TheMovieThumb from './components/TheMovieThumbnailComponent.js';

(() => {
    console.log('fired!');
    
    const vm = new Vue({
        
        data: {
            allMovies: []
        },

        created: function(){
            // a fetch call to grab all our movies from the database
            fetch("/api/movies")
                .then(res => res.json())
                .then(data => {
                    console.table(data);
                    this.allMovies = data;
                })
                .catch(err => console.error(err));
        },

        methods: {

        },

        components: {
            moviethumb: TheMovieThumb
        }
    }).$mount("#app");
})();