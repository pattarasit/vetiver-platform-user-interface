<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body>
            <form-wizard
              @on-complete="confirmToRegister"
              :start-index="0"
              color="#20a0ff"
              error-color="#ff4949"
              title="สมัครเพื่อใช้งาน"
              subtitle="กรุณากรอกข้อมูลให้ครบถ้วน"
              back-button-text="ก่อนหน้า"
              next-button-text="ถัดไป"
              finish-button-text="ยืนยัน"
            >
              <tab-content title="ข้อมูลฟาร์ม" icon="fa fa-map">
                <b-form>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>FARM-</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="farmName"
                      type="text"
                      v-model="Farm.farmCode"
                      class="form-control"
                      placeholder="โค๊ดฟาร์ม"
                      @change="this.getFarm"
                      v-cleave="{
                            delimiter: '-',
                            blocks: [8, 8],
                      }"
                    />
                  </b-input-group>
                </b-form>
              </tab-content>

              <tab-content title="ข้อมูลส่วนตัว" icon="fa fa-user">
                <b-form>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      id="fullName"
                      v-model="MemberAccount.fullName"
                      class="form-control"
                      placeholder="ชื่อ - สกุล (ไม่ต้องใส่คำนำหน้า)"
                    />
                  </b-input-group>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-mobile"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      id="tel"
                      @change="this.checkExitsTelnumber"
                      v-model="MemberAccount.tel"
                      placeholder="เบอร์โทรศัพท์"
                      :state="checkValidTelNumber"
                      maxlength="10"
                      aria-describedby="input-live-feedback1"
                    />
                  </b-input-group>
                  <b-form-invalid-feedback id="input-live-feedback1"></b-form-invalid-feedback>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      id="email"
                      v-model="MemberAccount.email"
                      placeholder="Email"
                      :state="checkValidEmail"
                      @change="this.checkEmailFormat"
                      aria-describedby="input-live-feedback2"
                    />
                  </b-input-group>
                  <b-form-invalid-feedback id="input-live-feedback2"></b-form-invalid-feedback>

                  <h5 class="mt-5">ที่อยู่</h5>
                  <hr />
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-home"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      id="other"
                      v-model="MemberAccount.address.other"
                      placeholder="บ้านเลขที่และหมู่ที่"
                      style="height:37px"
                    />

                    <ThailandAutoComplete
                      v-model="MemberAccount.address.subdistrict"
                      type="district"
                      @select="selectThailand"
                      label="ตำบล"
                      color="#00a4e4"
                      placeholder="ตำบล"
                      class="fsize mt-3"
                    />

                    <ThailandAutoComplete
                      v-model="MemberAccount.address.district"
                      type="amphoe"
                      @select="selectThailand"
                      label="อำเภอ"
                      color="#00a4e4"
                      placeholder="อำเภอ"
                      class="fsize"
                    />

                    <ThailandAutoComplete
                      v-model="MemberAccount.address.province"
                      type="province"
                      @select="selectThailand"
                      label="จังหวัด"
                      color="#00a4e4"
                      placeholder="จังหวัด"
                      class="fsize"
                    />

                    <ThailandAutoComplete
                      v-model="MemberAccount.address.zipcode"
                      type="zipcode"
                      label="รหัสไปรษณีย์"
                      @select="selectThailand"
                      color="#00a4e4"
                      placeholder="รหัสไปรษณีย์"
                      class="fsize"
                    />
                  </b-input-group>

                  <h5 class="mt-5">รหัสเข้าใช้งาน</h5>
                  <hr />

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
                  <b-form-invalid-feedback id="input-live-feedback"></b-form-invalid-feedback>
                </b-form>
              </tab-content>

              <tab-content title="ตรวจสอบข้อมูล">
                <div v-if="checkFarmIsNotNull">
                  <p>
                    <b>ชื่อฟาร์ม:</b>
                    {{ this.Farm.details.farmName }}
                  </p>
                  <p>
                    <b>ฟาร์มโค๊ด:</b>
                    {{ this.Farm.details.farmCode }}
                  </p>
                  <p>
                    <b>License:</b>
                    {{ this.Farm.details.licenseCode }}
                  </p>
                </div>
                <hr />
                <p>
                  <b>ชื่อ - สุกล:</b>
                  {{ this.MemberAccount.fullName }}
                </p>
                <p>
                  <b>เบอร์โทรศัพท์:</b>
                  {{ this.MemberAccount.tel }}
                </p>
                <p v-if="checkNotNullEmail">
                  <b>Email:</b>
                  {{ this.MemberAccount.email }}
                </p>
                <hr />
                <p class="text-center">
                  <b>ที่อยู่</b>
                </p>

                <p>
                  <b>บ้านเลขที่และหมู่ที่:</b>
                  {{ this.MemberAccount.address.other }}
                </p>

                <p>
                  <b>ตำบล:</b>
                  {{ this.MemberAccount.address.subdistrict }}
                </p>

                <p>
                  <b>อำเภอ:</b>
                  {{ this.MemberAccount.address.district }}
                </p>

                <p>
                  <b>จังหวัด:</b>
                  {{ this.MemberAccount.address.province }}
                </p>

                <p>
                  <b>รหัสไปรษณีย์:</b>
                  {{ this.MemberAccount.address.zipcode }}
                </p>
                <br />
                <p align="center">
                  <b>** หมายเหตุ</b> ในการเข้าสู่ระบบครั้งถัดไปจะใช้เบอร์โทรศัพท์ในการเข้าใช้งาน
                </p>
              </tab-content>
            </form-wizard>
            <b-col cols="12" class="mt-3 mb-3 text-center">
              <b-button variant="link" class="active mt-3" to="/">คลิกที่นี่เพื่อกลับหน้าหลัก!</b-button>
            </b-col>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import api from "../../apiConnector";

export default {
  name: "Register",
  components: {
    FormWizard,
    TabContent,
    ThailandAutoComplete
  },
  data() {
    return {
      Farm: {
        farmCode: null,
        details: null
      },
      MemberAccount: {
        fullName: null,
        tel: null,
        email: null,
        address: {
          other: "",
          subdistrict: "",
          district: "",
          province: "",
          zipcode: ""
        },
        newPasswd: null,
        rePasswd: null
      },
      Valid: {
        tel: null,
        email: null,
        telFormat: null,
        emailFormat: null
      }
    };
  },
  computed: {
    checkFarmIsNotNull() {
      if (this.Farm.details === null) return false;
      else return true;
    },
    checkMatchPasswd() {
      if (
        this.MemberAccount.newPasswd === null &&
        this.MemberAccount.rePasswd === null
      )
        return null;

      return this.MemberAccount.newPasswd == this.MemberAccount.rePasswd;
    },
    checkNotNullEmail() {
      return this.MemberAccount.email !== null;
    },
    checkValidTelNumber() {
      if (this.MemberAccount.tel != null) {
        var patt = /0[689]{1}\d+/i;
        var result = this.MemberAccount.tel.match(patt);
        if (result != null && this.MemberAccount.tel.length == 10) {
          this.Valid.telFormat = true;
        } else if (result == null && this.MemberAccount.tel.length == 10) {
          this.Valid.telFormat = false;
          this.Valid.tel = false;

          this.$root.getAlertBox(
            "warning",
            "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง ตัวอย่างรูปแบบ 06xxxxxxxx 08xxxxxxxx 09xxxxxxxx",
            3
          );
        }
      }

      return this.Valid.tel;
    },
    checkValidEmail() {
      return this.Valid.email;
    }
  },
  methods: {
    selectThailand(address) {
      this.MemberAccount.address.subdistrict = address.subdistrict;
      this.MemberAccount.address.district = address.amphoe;
      this.MemberAccount.address.province = address.province;
      this.MemberAccount.address.zipcode = address.zipcode;
    },
    checkEmailFormat() {
      if (this.MemberAccount.email != null) {
        var patt = /[\w.]+@[\w.]+/i;
        var result = this.MemberAccount.email.match(patt);

        if (result != null) {
          this.Valid.emailFormat = true;
          this.Valid.email = true;
        } else if (result == null) {
          this.Valid.emailFormat = false;
          this.Valid.email = false;
          this.$root.getAlertBox(
            "warning",
            "รูปแบบ Email ไม่ถูกต้อง ตัวอย่างรูปแบบ ABC@domain.xxx",
            3
          );
        }
      }
    },
    checkExitsTelnumber() {
      if (this.Valid.telFormat == true) {
        api
          .get("/permit/getMemberIdByTelNumber/" + this.MemberAccount.tel, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          })
          .then(result => {
            this.Valid.tel = false;
            this.Valid.tel = false;
            this.$root.getAlertBox(
              "danger",
              "เบอร์โทรศัพท์นี้ลงทะเบียนแล้ว",
              3
            );
          })
          .catch(err => {
            this.Valid.tel = true;
          });
      } else if (this.MemberAccount.tel.length != 10) {
        this.Valid.telFormat = false;
        this.Valid.tel = false;
        this.$root.getAlertBox(
          "warning",
          "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
          3
        );
      }
    },

    confirmToRegister() {
      if (
        this.Valid.tel === false ||
        this.Valid.email === false ||
        this.MemberAccount.newPasswd != this.MemberAccount.rePasswd
      ) {
        this.$root.getAlertBox(
          "warning",
          "กรุณากรอกรหัสผ่าน - เบอร์โทรศัพท์หรือ Email ให้ถูกต้อง !",
          3
        );
      } else if (
        this.Valid.tel === null ||
        this.Valid.email === null ||
        this.MemberAccount.newPasswd === null ||
        this.MemberAccount.rePasswd === null ||
        this.MemberAccount.fullName === null ||
        this.MemberAccount.email === null ||
        this.MemberAccount.address.other === null ||
        this.MemberAccount.address.subdistrict === null ||
        this.MemberAccount.address.district === null ||
        this.MemberAccount.address.province === null ||
        this.MemberAccount.address.zipcode === null ||
        this.MemberAccount.newPasswd === "" ||
        this.MemberAccount.rePasswd === "" ||
        this.MemberAccount.fullName === "" ||
        this.MemberAccount.email === "" ||
        this.MemberAccount.address.other === "" ||
        this.MemberAccount.address.subdistrict === "" ||
        this.MemberAccount.address.district === "" ||
        this.MemberAccount.address.province === "" ||
        this.MemberAccount.address.zipcode === ""
      ) {
        this.$root.getAlertBox("warning", "กรุณากรอกข้อมูลให้ครบถ้วน", 3);
      } else if (this.MemberAccount.email === null) {
        this.$root.getAlertBox("warning", "กรุณากรอก email!", 3);
      } else {
        this.$bvModal.msgBoxConfirm("ยืนยันข้อมูล").then(value => {
          if (value === true && this.Farm.details !== null) {
            this.Register();
          } else {
            this.$root.getAlertBox("danger", "ไม่พบข้อมูลฟาร์ม", 3);
          }
        });
      }
    },

    getFarm() {
      api
        .get("/permit/getFarmByCode/FARM-" + this.Farm.farmCode, {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        })
        .then(result => {
          this.Farm.details = result.data;
        })
        .catch(error => {
          this.$root.getAlertBox("danger", "ไม่พบฟาร์ม", 3);
        });
    },

    Register() {
      if (this.Farm.details !== null) {
        api
          .post(
            "/permit/addMemberAccount",
            {
              farmId: this.Farm.details.farmId,
              fullName: this.MemberAccount.fullName,
              subDistrict: this.MemberAccount.address.subdistrict,
              district: this.MemberAccount.address.district,
              province: this.MemberAccount.address.province,
              zipcode: this.MemberAccount.address.zipcode,
              addressOther: this.MemberAccount.address.other,
              email: this.MemberAccount.email,
              tel: this.MemberAccount.tel,
              password: this.MemberAccount.newPasswd
            },
            {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          )
          .then(result => {
            this.$root.getAlertBox("success", "สมัครใช้งานสำเร็จ", 3);
            this.Login()
          })
          .catch(err => {
            this.$root.getAlertBox("danger", "สมัครใช้งานไม่สำเร็จ", 3);
          });
      }
    },
    async Login() {
      await api
        .post(
          "/permit/getAuthenticate",
          {
            username: this.MemberAccount.tel,
            password: this.MemberAccount.newPasswd
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
          this.$cookies.set("logonExpire", date.getTime(), expireTime )

          this.$router.push("/dashboard");
        })
        .catch(err => alert(err));

      //this.$router.push("/home")
    }
  }
};
</script>
