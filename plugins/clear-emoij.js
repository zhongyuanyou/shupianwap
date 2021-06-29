import Vue from 'vue'
import emojiRegex from 'emoji-regex' // npm install emoji-regex
Vue.directive('clearEmoij', {
  bind(el, binding, vnode, oldVnode) {
    const regex = emojiRegex()
    const obj = el.querySelectorAll('.sp-field__control')[0]
    const zclearNoNum = function (e) {
      if (e.target.composing) return
      const match = regex.exec(obj.value) // 也可以直接用正则表达式判断
      if (match) {
        // / *for (let i=0;i<match.length;i++) {
        // obj.value = obj.value.replace(match[i],"");
        // } */
        obj.value = obj.value.replace(
          /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,
          ''
        )
        zclearNoNum(e)
      }
      // 触发v-model的更新
      obj.dispatchEvent(new Event('input'))
    }
    const zblur = function (e) {
      zclearNoNum(e)
      setTimeout(() => {
        const match = regex.exec(obj.value)
        if (match) {
          obj.value = obj.value.replace(
            /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,
            ''
          )
          zclearNoNum(e)
        }
        // 触发v-model的更新
        obj.dispatchEvent(new Event('change'))
      }, 50)
    }
    obj.onkeyup = zclearNoNum
    obj.onblur = zblur

    function onCompositionStart(e) {
      e.target.composing = true
    }
    function onCompositionEnd(e) {
      e.target.composing = false
      obj.dispatchEvent(new Event('input'))
    }
    // https://segmentfault.com/a/1190000009246058
    obj.addEventListener('compositionstart', onCompositionStart)
    obj.addEventListener('compositionend', onCompositionEnd)
  },
  update(el, binding, vnode, oldVnode) {},
})
