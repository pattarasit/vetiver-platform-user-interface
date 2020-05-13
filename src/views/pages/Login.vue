<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="username"
                      v-model="username"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="this.Login">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import api from "../../apiConnector";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async Login() {
      await api
        .post(
          "/permit/getAuthenticate",
          {
            username: this.username,
            password: this.password
          },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        )
        .then(result => {
          var data = result.data

          var expireTime = null;

          switch (data.expireType){
            case "min":
                expireTime = data.expire+"MIN"
                break;
            case "hr":
                expireTime = data.expire+"h";
                break;
            default:
                expireTime = data.expire+"s"
                break;
        }

          // Set cookies
          this.$cookies.set("token",data.token,expireTime);
          this.$cookies.set("logonType",data.type,expireTime);
          this.$cookies.set("username",data.username,expireTime);
          this.$cookies.set("logon",data.logon,expireTime);
          this.$cookies.set("roles",data.roles[0],expireTime);

          this.$router.push("/home")
        })
        .catch(err => alert(err));

      //this.$router.push("/home")
    }
  }
};
</script>
