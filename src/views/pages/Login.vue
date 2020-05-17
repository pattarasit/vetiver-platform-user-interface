<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form v-on:keyup.enter="Login">
                  <h1>เข้าสู่ระบบ</h1>
                  <p class="text-muted">กรอกเบอร์โทรศัพท์และรหัสผ่านของคุณ</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-mobile"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="เบอร์โทรศัพท์"
                      autocomplete="username"
                      v-model="username"
                      maxlength="10"
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
                      placeholder="รหัสผ่าน"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-3" @click="this.Login">เข้าใช้งาน</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" to="forget" class="px-0">ลืมรหัสผ่าน</b-button>
                    </b-col>
                    <b-col cols="12" class="d-sm-block d-lg-none mt-3 text-center">
                      <b-button
                        variant="primary"
                        class="active px-2 mr-1 d-md-block d-none d-lg-none"
                        to="register"
                      >สมัครเพื่อเข้าใช้งาน</b-button>
                      <b-button
                        variant="primary"
                        class="active px-2 d-md-block mt-1 d-none d-lg-none"
                        to="register-with-farm"
                      >สมัครเพื่อเข้าใช้งาน ด้วยรหัสฟาร์ม</b-button>

                      <b-button
                        variant="primary"
                        class="active px-2 mr-1 d-sm-block d-md-none d-lg-none"
                        to="register"
                      >สมัครเพื่อเข้าใช้งาน</b-button>
                      <b-button
                        variant="primary"
                        class="active px-2 d-sm-block mt-1 d-md-none d-lg-none"
                        to="register-with-farm"
                      >สมัครเพื่อเข้าใช้งาน ด้วยรหัสฟาร์ม</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>หากคุณยังไม่เป็นสมาชิก</h2>
                  <p>สามารถสมัครสมาชิกเพื่อใช้งานระบบได้โดยการคลิกที่ปุ่มด้านล่างนี้</p>
                  <b-button
                    variant="primary"
                    class="active mt-3"
                    to="register"
                  >สมัครเพื่อเข้าใช้งาน!</b-button>
                  <p
                    class="mt-5"
                  >หากคุณต้องการสมัครโดยมีฟาร์มของคุณอยู่ในระบบอยู่แล้วให้คลิกที่ปุ่มด้านล่างนี้</p>
                  <b-button
                    variant="primary"
                    class="active"
                    to="register-with-farm"
                  >สมัครเพื่อเข้าใช้งาน ด้วยรหัสฟาร์ม</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>

                  <b-alert
          :show="saveStatus.popup.showAlert"
          dismissible
          fade
          :variant="saveStatus.popup.variant"
          class="position-fixed fixed-top pt-4 pb-3 text-center m-0 rounded-0"
          style="z-index: 2000;"
        ><h4>{{this.saveStatus.popup.message}}</h4></b-alert>
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
      password: null,
      saveStatus: {
        popup: {
          showAlert: false,
          variant: "danger",
          message: ""
        }
      }
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
          var data = result.data;

          var expireTime = null;

          switch (data.expireType) {
            case "min":
              expireTime = data.expire + "MIN";
              break;
            case "hr":
              expireTime = data.expire + "h";
              break;
            default:
              expireTime = data.expire + "s";
              break;
          }

          var date = new Date()
          date.setMinutes( date.getMinutes() + data.expire );

          // Set cookies
          this.$cookies.set("token", data.token, expireTime);
          this.$cookies.set("logonType", data.type, expireTime);
          this.$cookies.set("username", data.username, expireTime);
          this.$cookies.set("logon", data.logon, expireTime);
          this.$cookies.set("roles", data.roles[0], expireTime);
          this.$cookies.set("logonExpire", date, expireTime )
          this.$router.push("/dashboard")
        })
        .catch(err => {
          this.saveStatus.popup.showAlert = true;
          setTimeout(() => {
            this.saveStatus.popup.showAlert = false;
          }, 3000);
          this.saveStatus.popup.variant = "danger";
          this.saveStatus.popup.message =
            "การเข้าสู่ระบบล้มเหลว";
        });
    },
    checkLogin() {
      if (this.$cookies.isKey("logon")) this.$router.push("/dashboard");
    }
  },
  mounted() {
    this.checkLogin();
  }
};
</script>
