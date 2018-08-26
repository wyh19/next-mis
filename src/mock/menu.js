const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [
    {
        id: 1,
        name: '基础管理',
        level: 1,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 2,
        name: '菜单',
        url: 'menu',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 3,
        name: '组织机构',
        url: 'organization',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 4,
        name: '组织机构类别',
        url: 'classification',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 5,
        name: '用户',
        url: 'userinfo',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 6,
        name: '用户组',
        url: 'usergroup',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 7,
        name: '项目',
        url: 'project',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 8,
        name: 'api',
        url: 'api',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 9,
        name: '角色',
        url: 'roleinfo',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
    {
        id: 10,
        name: '权限',
        url: 'operation',
        parentid: 1,
        level: 2,
        status: 0,
        creatorid:1,
        createtime:'2018-08-15',
    },
]

Mock.mock(/\/api\/main\/usermenulist/, 'get', function (options) {
    //直接返回所有菜单
    var result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].level === 1) {
            arr[i].children = []
            result.push(arr[i])
        }
    }
    for (let i = 0; i < result.length; i++) {
        var level1 = result[i]
        for (let j = 0; j < arr.length; j++) {
            if (level1.id === arr[j].parentid) {
                level1.children.push(arr[j])
            }
        }
    }
    return { code: 0, msg: '', data: result }
})

//查询
Mock.mock(/\/api\/menu\/select/, 'get', function (options) {
    //直接返回所有菜单
    var result = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].level === 1) {
            arr[i].children = []
            result.push(arr[i])
        }
    }
    for (let i = 0; i < result.length; i++) {
        var level1 = result[i]
        for (let j = 0; j < arr.length; j++) {
            if (level1.id === arr[j].parentid) {
                level1.children.push(arr[j])
            }
        }
    }
    return { code: 0, msg: '', data: result }
})

//新增
Mock.mock('/api/menu/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1
    info.createtime = Mock.Random.date()
    arr.push(info)
    return { code: 0, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/menu/update', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr, (item) => (item.id === info.id))
    let updated = _.assign(origin, info)
    return { code: 0, msg: '修改成功', data: updated }
})

//删除
Mock.mock(/\/api\/menu\/delete/, 'get', function (options) {
    let id = getParam(options.url, 'id')
    id = parseInt(id)
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 0, msg: '删除成功' }
})