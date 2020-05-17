<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>โปรไฟล์</strong>
      </b-dropdown-header>
      <b-dropdown-item to="edit-profile">
        <i class="fa fa-user" /> แก้ไขโปรไฟล์
      </b-dropdown-item>
      <b-dropdown-item v-b-modal.modal-prevent-closing>
        <i class="fa fa-wrench" /> เปลี่ยนรหัสผ่าน
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>ระบบ</strong>
      </b-dropdown-header>
      <b-dropdown-item @click="Logout">
        <i class="fa fa-sign-out" /> ออกจากระบบ
      </b-dropdown-item>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="เปลี่ยนรหัสผ่านเข้าใช้งาน"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="checkMatchPasswd"
            label="Name"
            label-for="name-input"
            invalid-feedback="รหัสผ่านไม่ตรงกัน"
          >
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
                v-model="rePasswd.oldPasswd"
                placeholder="รหัสผ่านเดิม"
                autocomplete="new-password"
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
                :state="checkMatchPasswd"
                id="rePasswd"
                v-model="rePasswd.newPasswd"
                aria-describedby="input-live-feedback"
                placeholder="รหัสผ่านใหม่"
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
                id="agianPasswd"
                v-model="rePasswd.agianPasswd"
                aria-describedby="input-live-feedback"
                placeholder="รหัสผ่านใหม่อีกครั้ง"
                autocomplete="new-password"
              />
            </b-input-group>
            <b-form-invalid-feedback id="input-live-feedback"></b-form-invalid-feedback>
          </b-form-group>
        </form>
      </b-modal>
      
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import api from "../apiConnector";
export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  computed: {
    checkMatchPasswd() {
      if (
        this.rePasswd.newPasswd === null &&
        this.rePasswd.agianPasswd === null
      ) {
        this.rePasswd.valid = false;
        return null;
      }
      this.rePasswd.valid = true;
      return this.rePasswd.newPasswd == this.rePasswd.agianPasswd;
    }
  },
  data: () => {
    return {
      itemsCount: 42,
      rePasswd: {
        oldPasswd: null,
        newPasswd: null,
        agianPasswd: null,
        valid: false
      },
    };
  },
  methods: {
    Logout() {
      // Clear
      this.$root.clearCookieLogon()
      this.$router.push("/login");
    },
    async ChangePassword() {
      await api
        .post(
          "/authorized/changePassword",
          {
            telNumber: this.$cookies.get("username"),
            oldPassword: this.rePasswd.oldPasswd,
            password: this.rePasswd.newPasswd
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

          this.$root.getAlertBox("success","เปลี่ยนรหัสผ่านสำเร็จ",3)

          this.$nextTick(() => {
            this.$bvModal.hide("modal-prevent-closing");
          });

          this.resetModal();
        })
        .catch(error => {
          this.$root.getAlertBox("danger","เปลี่ยนรหัสผ่านไม่สำเร็จ",3)
        });

    },
    resetModal() {
      this.rePasswd.oldPasswd = null;
      this.rePasswd.newPasswd = null;
      this.rePasswd.agianPasswd = null;
      this.rePasswd.valid = false;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.rePasswd.valid) {
        return;
      }
      this.ChangePassword();
    }
  }
};
</script>
