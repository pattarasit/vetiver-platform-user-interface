<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form v-on:keyup.enter="Change">
                  <h1>รหัสผ่านใหม่ของคุณ</h1>
                  <p class="text-muted">กรอกรหัสผ่าน</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      id="newPasswd"
                      v-model="MemberAccount.newPasswd"
                      :state="checkMatchPasswd"
                      aria-describedby="input-live-feedback"
                      placeholder="รหัสผ่าน"
                      autocomplete="new-password"
                    />
                  </b-input-group>
                  <b-form-invalid-feedback id="input-live-feedback"></b-form-invalid-feedback>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      :state="checkMatchPasswd"
                      id="rePasswd"
                      v-model="MemberAccount.rePasswd"
                      aria-describedby="input-live-feedback"
                      placeholder="รหัสผ่านอีกครั้ง"
                      autocomplete="new-password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-center">
                      <b-button variant="primary" class="px-3" @click="this.Change">เปลี่ยนรหัสผ่าน</b-button>
                    </b-col>
                  </b-row>
                </b-form>
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
          >
            <h4>{{this.saveStatus.popup.message}}</h4>
          </b-alert>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import api from "../../apiConnector";

export default {
  name: "Forget",
  data() {
    return {
      MemberAccount: {
        newPasswd: null,
        rePasswd: null
      },
      saveStatus: {
        popup: {
          showAlert: false,
          variant: "danger",
          message: ""
        }
      }
    };
  },
  computed: {
    checkMatchPasswd() {
      if (
        this.MemberAccount.newPasswd === null &&
        this.MemberAccount.rePasswd === null
      )
        return null;

      return this.MemberAccount.newPasswd == this.MemberAccount.rePasswd;
    }
  },
  methods: {
    async Change() {
      if (this.MemberAccount.newPasswd == this.MemberAccount.rePasswd) {
        console.log(this.payload.response.payload);
        await api
          .post(
            "/permit/changePassword",
            {
              telNumber: this.payload.tel,
              type: this.payload.response.type,
              otpNum: this.payload.response.payload,
              password: this.MemberAccount.newPasswd
            },
            {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          )
          .then(result => {
            this.$cookies.remove("timeout");
            this.$cookies.remove("forget");
            this.$cookies.remove("forget_step");

            api
              .post(
                "/permit/getAuthenticate",
                {
                  username: this.payload.tel,
                  password: this.MemberAccount.newPasswd
                },
                {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json"
                }
              )
              .then(result => {
                var data = result.data;

                this.$root.getAlertBox("success", "เปลี่ยนรหัสผ่านสำเร็จ", 3);

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

                // Set cookies
                this.$cookies.set("token", data.token, expireTime);
                this.$cookies.set("logonType", data.type, expireTime);
                this.$cookies.set("username", data.username, expireTime);
                this.$cookies.set("logon", data.logon, expireTime);
                this.$cookies.set("roles", data.roles[0], expireTime);

                this.$router.push("/dashboard");
              })
              .catch(err => {
                this.$root.getAlertBox("danger", "การเข้าสู่ระบบล้มเหลว", 3);
              });
          })
          .catch(err => {
            this.$root.getAlertBox("danger", "การเปลี่ยนรหัสผ่านล้มเหลว", 3);
          });
      }
    },
    getPayload() {
      if (this.$cookies.isKey("forget_step") !== null) {
        if (this.$cookies.get("forget_step") == 2) {
          this.payload = this.$cookies.get("forget")
        } else {
          this.$router.push("/forget");
        }
      } else {
        this.$router.push("/forget");
      }
    }
  },
  mounted() {
    this.getPayload();
  }
};
</script>
