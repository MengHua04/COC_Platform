const gateway = '/api';

// 登录
export const login = `${gateway}/login`;

// 登出
export const logout = `${gateway}/login/logout`;

// 注册
export const register = `${gateway}/register`;

// 查询用户
export const getUsers = `${gateway}/user`

// 删除用户
export const deleteUser = `${gateway}/user/delete`

// 修改用户密码
export const passwordChange = `${gateway}/user/changePassword`;

// 浏览已进入房间玩家信息
export const userinfoUpdate = `${gateway}/user/update`;

// 删除房间
export const roomDelete = `${gateway}/hall/deleteRoom`;

// 退出房间
export const roomExit = `${gateway}/hall/exitRoom`;

// 进入房间
export const roomJoin = `${gateway}/hall/joinRoom`;

// 查询所有房间
export const roomList = `${gateway}/hall/listRoom`;

// 创建房间
export const roomCreate = `${gateway}/hall/saveRoom`;

// 创建房间
export const roomUpdate = `${gateway}/hall/updateRoom`;

// 人物卡列表
export const cardGet = `${gateway}/person/list`;

// 删除人物卡
export const cardDelete = `${gateway}/person/delete`;

// 创建人物卡
export const cardCreate = `${gateway}/person/save`;

// 更新人物卡
export const cardUpdate = `${gateway}/person/update`;

// 房间管理员分配人物卡
export const cardAssign = `${gateway}/room/assignCard`;

// 房间管理员导入人物卡
export const cardImport = `${gateway}/room/importCard`;

// 浏览房间已导入人物卡
export const cardImportList = `${gateway}/room/listImportCard`;

// 浏览已进入房间玩家信息
export const roomUsers = `${gateway}/room/listRoomUser`;

// 获取对话信息
export const getChat = `${gateway}/chat-room/{sender}/to/{receive}`;

// 获取人物技能列表
export const getSkills = `${gateway}/skills/list`;

// 获取武器列表
export const getWeapons = `${gateway}/weapons/list`;

// 获取人物职业列表
export const getOccupations = `${gateway}/occupations/list`;

// 获取人物卡对应技能表
export const getPersonSkills = `${gateway}/skills-person/list`

// 获取人物卡对应武器表
export const getPersonWeapons = `${gateway}/weapons-person/list`

