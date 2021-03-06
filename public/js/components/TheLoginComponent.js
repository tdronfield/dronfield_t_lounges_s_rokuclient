export default {
    name: "TheLoginComponent",
    
    template: `
        <div class="container">
            
                <h1 class="">Welcome to Flashback!</h1>
                <p class="">Before revisiting your favourite movies, tv shows or music from yesteryear, please log in with a valid username and password.</p>
                <hr class="">
                <form>
                    <div class="form-row align-items-center">
                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormInputName">Name</label>
                            <input v-model="input.username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>
                        </div>

                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormPassword">Name</label>
                            <input v-model="input.password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
                        </div>

                       
                        <button v-on:click.prevent="login()" type="submit" class="loginButton">Log In</button>
                        
                    </div>
                </form>            
            
        </div>
     `,
 
     data() {
         return {
             input: {
                 username: "",
                 password: ""
             },

         }
     },
 
     methods: {
         login() {
            // first check for valid input
            // if username AND password do NOT have empty strings..
            if (this.input.username !="" && this.input.password !="") {
                // do the login
                let loginData = JSON.stringify({username: this.input.username, password: this.input.password});

                let url = `/ums/admin/login`;
                fetch(url, {
                    method: 'POST', 
                    body: loginData,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        // if there is a data message, login failed, so handle that error
                        console.warn("user doesn't exist, or something broke");
                    } else {
                        // otherwise, login was successful
                        data.user_name = this.input.username;
                        this.$router.replace({ name: "users"});
                    }
                })
                .catch((err) => console.error(err));
            } else {
                // do not login
                console.log("A Username and Password is required.");
            }
         }            
    }
 }