<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>โปรไฟล์</strong>
      </b-dropdown-header>
      <b-dropdown-item>
        <i class="fa fa-user" /> แก้ไขโปรไฟล์
      </b-dropdown-item>
      <b-dropdown-item>
        <i class="fa fa-wrench" /> เปลี่ยนรหัสผ่าน
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>ระบบ</strong>
      </b-dropdown-header>
      <b-dropdown-item @click="Logout">
        <i class="fa fa-sign-out" /> ออกจากระบบ
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 };
  },
  methods: {
    Logout() {
      // Clear
      this.$cookies.remove("token");
      this.$cookies.remove("logonType");
      this.$cookies.remove("username");
      this.$cookies.remove("logon");
      this.$cookies.remove("roles");

      this.$router.push("/login");
    }
  }
};
</script>
