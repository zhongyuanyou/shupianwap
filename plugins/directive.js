/*
 * @Author: xiao pu
 * @Date: 2021-02-05 10:11:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 11:04:48
 * @Description: file content
 * @FilePath: /chips-wap/plugins/directive.js
 */

import Vue from 'vue'

import { md, mdMap } from './directive/md'

const directives = {
  md,
  mdMap,
}

Object.entries(directives).forEach((item) => {
  const [key, value] = item
  Vue.directive(value.name, value)
})
