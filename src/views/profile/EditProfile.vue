<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col mb-1">
        <div class="card">
          <div class="card-body">
            <div class="e-profile">
              <div class="row">
                <div class="col-12 col-sm-auto mb-3">
                  <div class="mx-auto" style="width: 140px;">
                    <div class="d-flex justify-content-center rounded" style="height:">
                      <img src="../../assets/images/logo1.png" class="img-thumbnail" />
                    </div>
                  </div>
                </div>
                <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div class="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{{ this.memberDetails.fullName }}</h4>
                    <p class="mb-0">Username: {{this.$cookies.get("username")}}</p>
                    <div class="text-muted">
                      <small
                        class="d-none d-lg-block"
                      >เข้าสู่ระบบครั้งล่าสุดเมื่อ {{this.getDate(this.memberDetails.lastLogin)}}</small>
                      <small class="d-lg-none d-sm-block">
                        เข้าสู่ระบบครั้งล่าสุดเมื่อ
                        <br />
                        {{this.getDate(this.memberDetails.lastLogin)}}
                      </small>
                    </div>
                  </div>
                  <div class="text-center text-sm-right">
                    <span
                      class="badge badge-secondary"
                    >ความสามารถในการเข้าถึง {{this.$cookies.get("roles")}}</span>
                    <div class="text-muted">
                      <small
                        class="d-none d-lg-block"
                      >เข้าเป็นสมาชิกเมื่อ {{ this.getDate(this.memberDetails.joinDate) }}</small>
                      <small class="d-lg-none d-sm-block">
                        เข้าเป็นสมาชิกเมื่อ
                        <br />
                        {{ this.getDate(this.memberDetails.joinDate) }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a href class="active nav-link">ข้อมูลส่วนตัว</a>
                </li>
              </ul>
              <div class="tab-content pt-3">
                <div class="tab-pane active">
                  <div class="row">
                    <div class="col">
                      <h5 class="mt-4">ข้อมูลพื้นฐาน</h5>
                      <hr />

                      <div class="row">
                        <div class="col-sm">
                          <div class="form-group">
                            <label>Full Name</label>
                            <b-form-input
                              class="form-control"
                              type="text"
                              id="fullName"
                              placeholder="ชื่อ - สกุล"
                              v-model="memberDetails.fullName"
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <label>เบอร์โทรศัพท์</label>

                            <b-form-input
                              class="form-control"
                              type="text"
                              id="tel"
                              maxlength="10"
                              aria-describedby="input-live-feedback"
                              :state="checkValidTelNumber"
                              placeholder="เบอร์โทรศัพท์"
                              @change="this.checkExitsTelnumber"
                              v-model="memberDetails.telNumber"
                            />
                          </div>
                          <b-form-invalid-feedback id="input-live-feedback"></b-form-invalid-feedback>
                        </div>

                        <div class="col-sm">
                          <div class="form-group">
                            <label>Email</label>
                            <b-form-input
                              class="form-control"
                              type="text"
                              id="email"
                              aria-describedby="input-live-feedback1"
                              :state="checkValidEmail"
                              placeholder="Email"
                              @change="this.checkEmailFormat"
                              v-model="memberDetails.email"
                            />
                          </div>
                          <b-form-invalid-feedback id="input-live-feedback1"></b-form-invalid-feedback>
                        </div>
                      </div>

                      <h5 class="mt-4">ที่อยู่</h5>
                      <hr />
                      <label>บ้านเลขที่และหมู่ที่</label>
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
                          v-model="memberDetails.address.other"
                          placeholder="บ้านเลขที่และหมู่ที่"
                          style="height:37px"
                        />
                      </b-input-group>
                      <div class="row">
                        <div class="col-sm">
                          <ThailandAutoComplete
                            v-model="memberDetails.address.subDistrict"
                            type="district"
                            @select="selectThailand"
                            label="ตำบล"
                            color="#00a4e4"
                            placeholder="ตำบล"
                            class="fsize"
                          />
                        </div>
                        <div class="col-sm">
                          <ThailandAutoComplete
                            v-model="memberDetails.address.district"
                            type="amphoe"
                            @select="selectThailand"
                            label="อำเภอ"
                            color="#00a4e4"
                            placeholder="อำเภอ"
                            class="fsize"
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm">
                          <ThailandAutoComplete
                            v-model="memberDetails.address.province"
                            type="province"
                            @select="selectThailand"
                            label="จังหวัด"
                            color="#00a4e4"
                            placeholder="จังหวัด"
                            class="fsize"
                          />
                        </div>
                        <div class="col-sm">
                          <ThailandAutoComplete
                            v-model="memberDetails.address.zipcode"
                            type="zipcode"
                            label="รหัสไปรษณีย์"
                            @select="selectThailand"
                            color="#00a4e4"
                            placeholder="รหัสไปรษณีย์"
                            class="fsize"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col text-center mt-3">
                    <b>หมายเหตุ **</b> หากทำการเปลี่ยนแปลงเบอร์โทรศัพท์ต้องทำการเข้าสู่ระบบใหม่อีกครั้ง
                  </div>
                  <div class="row mt-5">
                    <div class="col text-center">
                      <button class="btn btn-primary px-4" @click="this.ChangeProfile">แก้ไขข้อมูล</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../apiConnector";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";

export default {
  name: "EditProfile",
  components: {
    ThailandAutoComplete
  },
  data() {
    return {
      memberDetails: {
        joinDate: "",
        lastLogin: "",
        fullName: "",
        role: "",
        telNumber: "",
        address: {
          other: "",
          subDistrict: "",
          district: "",
          province: "",
          zipcode: ""
        }
      },
      Valid: {
        tel: null,
        email: null,
        tempEmail: null,
        telFormat: null,
        emailFormat: null
      }
    };
  },
  computed: {
    checkNotNullEmail() {
      return this.memberDetails.email !== null;
    },
    checkValidTelNumber() {
      if (this.memberDetails.telNumber === this.$cookies.get("username")) {
        this.Valid.telFormat = true;
        this.Valid.tel = null;
      } else if (
        this.memberDetails.telNumber != null &&
        this.memberDetails.telNumber !== this.$cookies.get("username")
      ) {
        var patt = /0[689]{1}\d+/i;
        var result = this.memberDetails.telNumber.match(patt);
        if (result != null && this.memberDetails.telNumber.length == 10) {
          this.Valid.telFormat = true;
        } else if (
          result == null &&
          this.memberDetails.telNumber.length == 10
        ) {
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
    async ChangeProfile() {
      await api
        .post(
          "/authorized/editMemberAccount",
          {
            memberId: this.memberDetails.id,
            fullName: this.memberDetails.fullName,
            telNumber: this.memberDetails.telNumber,
            subDistrict: this.memberDetails.address.subDistrict,
            district: this.memberDetails.address.district,
            province: this.memberDetails.address.province,
            zipcode: this.memberDetails.address.zipcode,
            addressOther: this.memberDetails.address.other,
            email: this.memberDetails.email
          },
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            headers: {
              Authorization:
                this.$cookies.get("logonType") +
                " " +
                this.$cookies.get("token")
            }
          }
        )
        .then(result => {
          this.$root.getAlertBox("success", "เปลี่ยนแปลงข้อมูลสำเร็จ", 3);
          if (this.memberDetails.telNumber != this.$cookies.get("username")) {
            var v = this
            setTimeout(function() {
              v.$root.clearCookieLogon();
              v.$router.push("/login");
            }, 3000);
          }
        })
        .catch(error => {
          this.$root.getAlertBox("danger", "เปลี่ยนแปลงข้อมูลไม่สำเร็จ", 3);
        });
    },
    async getMemberDetails() {
      this.memberDetails.telNumber = this.$cookies.get("username");
      console.log(this.memberDetails.telNumber);
      await api
        .get(
          "/authorized/getMemberAccountByTelNumber/" +
            this.memberDetails.telNumber,
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            headers: {
              Authorization:
                this.$cookies.get("logonType") +
                " " +
                this.$cookies.get("token")
            }
          }
        )
        .then(result => {
          this.memberDetails = result.data;
          this.Valid.tempEmail = this.memberDetails.email;
          console.log(this.memberDetails);
        });
    },
    selectThailand(address) {
      this.memberDetails.address.subDistrict = address.subdistrict;
      this.memberDetails.address.district = address.amphoe;
      this.memberDetails.address.province = address.province;
      this.memberDetails.address.zipcode = address.zipcode;
    },
    checkEmailFormat() {
      if (
        this.memberDetails.email != null &&
        this.memberDetails.email != this.Valid.tempEmail
      ) {
        var patt = /[\w.]+@[\w.]+/i;
        var result = this.memberDetails.email.match(patt);

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
      } else if (this.memberDetails.email == this.Valid.tempEmail) {
        this.Valid.emailFormat = true;
        this.Valid.email = null;
      }
    },
    checkExitsTelnumber() {
      if (
        this.Valid.telFormat == true &&
        this.memberDetails.telNumber !== this.$cookies.get("username")
      ) {
        api
          .get(
            "/permit/getMemberIdByTelNumber/" + this.memberDetails.telNumber,
            {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          )
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
      } else if (this.memberDetails.telNumber.length != 10) {
        this.Valid.telFormat = false;
        this.Valid.tel = false;
        this.$root.getAlertBox(
          "warning",
          "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
          3
        );
      }
    },
    getDate(date) {
      var parseDate = new Date(date);
      var thday = new Array(
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัส",
        "ศุกร์",
        "เสาร์"
      );
      var thmonth = new Array(
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      );

      // hours as 2 digits (hh)
      var hours = ("0" + parseDate.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ("0" + parseDate.getMinutes()).slice(-2);

      var date =
        "วัน" +
        thday[parseDate.getDay()] +
        "ที่ " +
        parseDate.getDate() +
        " " +
        thmonth[parseDate.getMonth()] +
        " " +
        (0 + parseDate.getFullYear() + 543) +
        " " +
        hours +
        ":" +
        minutes;

      return date;
    }
  },
  mounted() {
    this.getMemberDetails();
  }
};
</script>
<style>
.fsize ::placeholder {
  font-size: 14px;
}
</style>