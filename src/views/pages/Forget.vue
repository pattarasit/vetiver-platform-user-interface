<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>ลืมรหัสผ่าน</h1>
                  <p class="text-muted">กรอกเบอร์โทรศัพท์</p>
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
                      autocomplete="tel"
                      v-model="tel"
                      maxlength="10"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button
                        variant="primary"
                        class="px-3"
                        @click="this.Forget"
                      >ขอรหัสยืนยันตัวตน</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
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
  name: "Forget",
  data() {
    return {
      tel: null,
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
    async Forget() {
      await api
        .post(
          "/permit/sendForgetPassword",
          {
            telNumber: this.tel
          },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        )
        .then(result => {
          var obj = {
            tel: this.tel,
            response: result.data
          };

          var dt = new Date();
          dt.setMinutes(dt.getMinutes() + 5);

          this.$cookies.set("timeout", dt.getTime(), "5MIN");
          this.$cookies.set("forget", JSON.stringify(obj), "5MIN");
          this.$cookies.set("forget_step", 1, "5MIN");

          this.$router.push("/valid-otp");
        })
        .catch(err => {
          this.saveStatus.popup.showAlert = true;
          setTimeout(() => {
            this.saveStatus.popup.showAlert = false;
          }, 3000);
          this.saveStatus.popup.variant = "danger";
          this.saveStatus.popup.message = "ไม่พบเบอร์บัญชีผู้ใช้ของคุณ";
        });
    }
  }
};
</script>
