/** @Author: Maliang
 * @Date: 2020-12-09 15:45:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 15:45:00
 * @Description: 企大顺api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/enterpriseDashun.js
 * */
"use strict";
module.exports.dashunApi = {
    interviewList: "/yk/c/biz_interview_record/v1/interview_list_by_customer", // 查看面谈记录列表
    interviewCancel: "/yk/c/biz_interview_record/v1/cancel_interview", // 取消面谈
    interviewConfirm: "/yk/c/biz_interview_record/v1/finish_interview", // 面谈完成确认
    interviewDetail: "/yk/c/biz_interview_record/v1/interview_detail", // 面谈详情
};
