<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form v-on:keyup.enter="Valid">
                  <p class="card-title d-none d-lg-block">
                    <span style="font-size:28px;">ยืนยันตัวตน</span>
                    <span
                      style="font-size:18px;"
                      class="float-right"
                    >เวลาในการยืนยันตัวตน {{this.timeout}}</span>
                  </p>

                  <p class="card-title d-lg-none d-sm-block d-md-block">
                    <span
                      style="font-size:28px;"
                      class="d-lg-none d-sm-block d-md-block text-center"
                    >ยืนยันตัวตน</span>
                    <span
                      style="font-size:18px;"
                      class="d-lg-none d-sm-block d-md-block text-center"
                    >เวลาในการยืนยันตัวตน {{this.timeout}}</span>
                  </p>

                  <b-input-group class="mb-3" v-on:keyup.delete="onKeyDown">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      style="font-size: 48px;"
                      type="text"
                      class="form-control text-center"
                      autocomplete="otp"
                      v-model="Otp.a1"
                      ref="fblock"
                      maxlength="1"
                      v-on:keyup="$event.target.nextElementSibling.focus()"
                    />
                    <b-form-input
                      style="font-size: 48px;"
                      type="text"
                      class="form-control text-center"
                      autocomplete="otp"
                      v-model="Otp.a2"
                      maxlength="1"
                      v-on:keyup="$event.target.nextElementSibling.focus()"
                    />
                    <b-form-input
                      style="font-size: 48px;"
                      type="text"
                      class="form-control text-center"
                      autocomplete="otp"
                      v-model="Otp.a3"
                      maxlength="1"
                      v-on:keyup="$event.target.nextElementSibling.focus()"
                    />
                    <b-form-input
                      style="font-size: 48px;"
                      type="text"
                      class="form-control text-center"
                      autocomplete="otp"
                      v-model="Otp.a4"
                      maxlength="1"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="mb-5 text-center">
                      <b-button
                        variant="primary"
                        @click="this.Valid"
                        class="active px-4"
                        style="width:100%"
                      >ยืนยันตัวตน</b-button>
                    </b-col>
                  </b-row>

                  <b-row v-if="this.checkOutOfTime()">
                    <b-col cols="6">
                      <b-button
                        variant="primary"
                        class="px-3"
                        @click="this.Resend"
                      >ขอรหัสยืนยันตัวตนอีกครั้ง</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button
                        variant="link"
                        class="px-0"
                        to="/login"
                      >คลิกที่นี่เพื่อกลับหน้าเข้าใช้งาน</b-button>
                    </b-col>
                  </b-row>

                  <b-row v-else>
                    <b-col cols="12" class="text-center">
                      <b-button
                        variant="link"
                        class="px-0"
                        to="/login"
                      >คลิกที่นี่เพื่อกลับหน้าเข้าใช้งาน</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
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
      </b-row>
    </div>
  </div>
</template>

<script>
import api from "../../apiConnector";

export default {
  name: "ValidOTP",
  data: {
    timeout: null
  },
  data() {
    return {
      timeout: "Nan นาที",
      isOutOfTime: null,
      payload: null,
      interval: null,
      Otp: {
        a1: null,
        a2: null,
        a3: null,
        a4: null
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
  methods: {
    onKeyDown(){
      this.Otp.a1 = null
      this.Otp.a2 = null
      this.Otp.a3 = null
      this.Otp.a4 = null

      this.$refs.fblock.focus()
    },
    async Resend() {
      await api
        .post(
          "/permit/resendForgetPassword",
          {
            telNumber: this.payload.tel
          },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        )
        .then(result => {
          clearInterval(this.interval);

          var dt = new Date();
          dt.setMinutes(dt.getMinutes() + 5);

          // Clear
          this.$cookies.remove("timeout");
          this.$cookies.remove("forget");
          this.$cookies.remove("forget_step");

          // Set
          this.$cookies.set("timeout", dt.getTime(), "5MIN");
          this.$cookies.set("forget", JSON.stringify(this.payload), "5MIN");
          this.$cookies.set("forget_step", 1, "5MIN");

          this.getTimeout();
        })
        .catch(err => {
          this.saveStatus.popup.showAlert = true;
          setTimeout(() => {
            this.saveStatus.popup.showAlert = false;
          }, 3000);
          this.saveStatus.popup.variant = "danger";
          this.saveStatus.popup.message = "ไม่พบเบอร์บัญชีผู้ใช้ของคุณ";
        });
    },
    async Valid() {
      await api
        .post(
          "/permit/validOTP",
          {
            telNumber: this.payload.tel,
            type: this.payload.response.type,
            otpNum: "" + this.Otp.a1 + this.Otp.a2 + this.Otp.a3 + this.Otp.a4
          },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        )
        .then(result => {
          var obj = {
            tel: this.payload.tel,
            response: result.data
          };

          var dt = new Date();
          dt.setMinutes(dt.getMinutes() + 5);

          // Clear
          this.$cookies.remove("timeout");
          this.$cookies.remove("forget");
          this.$cookies.remove("forget_step");

          // Set
          this.$cookies.set("timeout", dt.getTime(), "5MIN");
          this.$cookies.set("forget", JSON.stringify(obj), "5MIN");
          this.$cookies.set("forget_step", 2, "5MIN");
          this.$router.push("/change-password");
        })
        .catch(err => {
          this.saveStatus.popup.showAlert = true;
          setTimeout(() => {
            this.saveStatus.popup.showAlert = false;
          }, 3000);
          this.saveStatus.popup.variant = "danger";
          this.saveStatus.popup.message = "Valid Failled";
        });
    },
    getTimeout() {
      if (this.$cookies.isKey("timeout")) {
        var v = this;
        var dt = this.$cookies.get("timeout");

        this.interval = setInterval(function() {
          const now = new Date();

          let currentTime = now.getTime();
          let eventTime = dt;

          if (currentTime > dt) {
            v.isOutOfTime = true;
            clearInterval(v.interval);
          } else {
            let remTime = eventTime - currentTime;

            let seconds = Math.floor(remTime / 1000);
            let minutes = Math.floor(seconds / 60);

            minutes %= 60;
            seconds %= 60;

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            v.timeout = minutes + ":" + seconds + " นาที";
          }
        }, 1000);
      }
    },
    getPayload() {
      if (this.$cookies.isKey("forget_step") !== null) {
        if (this.$cookies.get("forget_step") == 1) {
          this.payload = this.$cookies.get("forget")
        } else {
          this.$router.push("/forget");
        }
      } else {
        this.$router.push("/forget");
      }
    },
    checkOutOfTime() {
      if (this.isOutOfTime === null || this.isOutOfTime === false) return false;

      return true;
    }
  },
  mounted() {
    this.getTimeout();
    this.getPayload();
  }
};
</script>
