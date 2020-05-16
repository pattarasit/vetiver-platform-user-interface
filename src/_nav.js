export default {
  items: [
    {
      name: 'หน้าหลักแผงควบคุม',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'โซลูชั่นส์',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'ตรวจสอบค่า NPK',
      icon: 'icon-drop',
      children:[
        {
          name: 'ตรวจสอบค่าแบบเฉลี่ย',
          url: '/dashboard/npk/avg',
          icon: 'icon-globe-alt'
        },
        {
          name: 'ตรวจสอบค่าแบบเจาะจง',
          url: '/dashboard/npk/specific',
          icon: 'icon-globe-alt'
        }
      ]
    },
    {
      title: true,
      name: 'เกี่ยวกับฟาร์ม',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'จัดการฟาร์ม',
      icon: 'icon-map',
      children:[
        {
          name: 'เพิ่มฟาร์ม',
          url: '/dashboard/farm/add',
          icon: 'icon-plus'
        },
        {
          name: 'ลบฟาร์ม',
          url: '/dashboard/farm/del',
          icon: 'icon-trash'
        },
        {
          name: 'จัดการแปลงของฟาร์ม',
          url: '/dashboard/farm/plot',
          icon: 'icon-grid'
        }
      ]
    },
    {
      title: true,
      name: 'เกี่ยวกับอุปกรณ์',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'ตัวจัดการอุปกรณ์',
      icon: 'icon-puzzle',
      children:[
        {
          name: 'เพิ่มตัวจัดการอุปกรณ์',
          url: '/dashboard/dm/add',
          icon: 'icon-plus'
        },
        {
          name: 'ลบตัวจัดการอุปกรณ์',
          url: '/dashboard/dm/del',
          icon: 'icon-trash'
        },
        {
          name: 'จัดการอุปกรณ์',
          url: '/dashboard/dm/device',
          icon: 'icon-grid'
        }
      ]
    }
  ]
}
