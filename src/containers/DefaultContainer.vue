<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <img
          class="navbar-brand-full"
          src="../assets/images/logo2.png"
          width="120"
          height="35"
          alt="Vetiver Logo"
        />
        <img
          class="navbar-brand-minimized"
          src="../assets/images/logo2.png"
          width="30"
          height="30"
          alt="Vetiver Logo"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="true" />

      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt />
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <span class="ml-1">&copy; 2020 เกษตรก้าวหน้า</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Based on Vetiver-Platform</span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    TheFooter,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },
  methods:{
    checkLogin(){
      if(!this.$cookies.isKey("logon"))
        this.$router.push("/login")
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  mounted(){
    this.checkLogin()

  }
}
</script>
