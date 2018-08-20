const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    ID: '111',
    Name: "组织机构",
    Url: 'organization',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '222',
    Name: "权限",
    Url: 'rights',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '333',
    Name: "角色",
    Url: 'role',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '444',
    Name: "用户",
    Url: 'user',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '555',
    Name: "用户组",
    Url: 'userGroup',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '666',
    Name: "组织机构分类",
    Url: 'orgaType',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
{
    ID: '777',
    Name: "项目",
    Url: 'project',
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
},
]

//查询用户菜单
Mock.mock(/\/api\/menu\/listbyuser/, 'get', function (options) {
    return arr
})

//查询
Mock.mock(/\/api\/menu\/list/, 'get', function (options) {
    const Name = getParam(options.url, 'Name')
    if (Name) {
        return _.filter(arr, item => item.Name.indexOf(Name) > -1)
    } else {
        return arr
    }
})

//新增
Mock.mock('/api/menu/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.ID = Mock.Random.id()
    info.CreateTime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/menu/edit', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr, (item) => (item.ID === info.ID))
    let updated = _.assign(origin, info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/menu/delete', 'post', function (options) {
    let ID = JSON.parse(options.body).ID
    _.remove(arr, item => (
        item.ID === ID
    ))
    return { code: 1, msg: '删除成功' }
})