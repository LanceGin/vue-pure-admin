import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
// import { object } from "vue-types";

export type UserResult = {
  success: boolean;
  data: {
    // 后台返回消息
    message: string;
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type UserListResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export type AddUserResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

export type DeleteUserResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

export type EditUserResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

export type WxClockListResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export type ListResult = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

export type ChangeResult = {
  success: boolean;
  data?: {
    // 后台返回消息
    message: string;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refreshToken"), {
    data
  });
};

// 获取用户列表
export const getUserList = (data?: object) => {
  return http.request<UserListResult>("post", baseUrlApi("userList"), {
    data
  });
};

// 新增用户
export const addUser = (data?: object) => {
  return http.request<AddUserResult>("post", baseUrlApi("addUser"), {
    data
  });
};

// 删除用户
export const deleteUser = (data?: object) => {
  return http.request<DeleteUserResult>("post", baseUrlApi("deleteUser"), {
    data
  });
};

// 编辑用户
export const editUser = (data?: object) => {
  return http.request<EditUserResult>("post", baseUrlApi("editUser"), {
    data
  });
};

// 员工打卡记录
export const getWxClockList = (data?: object) => {
  return http.request<WxClockListResult>("post", baseUrlApi("wxClockList"), {
    data
  });
};

// 获取打卡点列表
export const clockPointList = (data?: object) => {
  return http.request<ListResult>("post", baseUrlApi("clockPointList"), {
    data
  });
};

// 新增打卡点
export const addClockPoint = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("addClockPoint"), {
    data
  });
};

// 删除打卡点
export const deleteClockPoint = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("deleteClockPoint"), {
    data
  });
};

// 编辑打卡点
export const editClockPoint = (data?: object) => {
  return http.request<ChangeResult>("post", baseUrlApi("editClockPoint"), {
    data
  });
};
