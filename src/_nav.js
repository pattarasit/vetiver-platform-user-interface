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
          url: '/home/avg',
          icon: 'icon-globe-alt'
        },
        {
          name: 'ตรวจสอบค่าแบบเจาะจง',
          url: '/home/specific',
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
          url: '/home/add',
          icon: 'icon-plus'
        },
        {
          name: 'ลบฟาร์ม',
          url: '/home/del',
          icon: 'icon-trash'
        },
        {
          name: 'จัดการแปลงของฟาร์ม',
          url: '/home/plot',
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
          url: '/home/add',
          icon: 'icon-plus'
        },
        {
          name: 'ลบตัวจัดการอุปกรณ์',
          url: '/home/del',
          icon: 'icon-trash'
        },
        {
          name: 'จัดการอุปกรณ์',
          url: '/home/device',
          icon: 'icon-grid'
        }
      ]
    }
  ]
}
