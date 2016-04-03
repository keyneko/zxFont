'use strict'

import './style.scss'
import Observer from './Observer'
import each from 'lodash/collection/each'
import find from 'lodash/collection/find'
import includes from 'lodash/collection/includes'

export default class ZxFont extends Observer{
  constructor() { 
    super()
    this.fontList = []
  }

  load(name, path) {
    if(!includes(this.fontList, name)) {
      $.ajax({
        url: `${path}${name}.fnt`,
        dataType: 'xml',
        success: (fnt)=> {
          let font = {fnt, name, path}
          this.fontList.push(font)
          this.fire('fontloaded', font)
        },
        error: ()=> {
          console.error('字体加载出错！')
        }
      })
    }
  }
   
  convert(name, selector) {
    let _fn = ()=> {
      let font = find(this.fontList, {name})
      let info = $(font.fnt).find("info")
      let common = $(font.fnt).find("common")
      let pages = $(font.fnt).find("pages > page")
      let chars = $(font.fnt).find("chars > char")

      let text
      let els = $(selector)
      if (els.length == 0) return 
      each(els, (el)=> {
        $(el).addClass('clearfix')
        text = el.innerText

        // text hide
        el.style.font = '0/0 a'
        el.style.color = 'transparent'
        el.style.visibility = 'visible'

        for(let i = 0, max = text.length; i < max; i++) {
          let code = text.charAt(i).charCodeAt()
          each(chars, (char, index)=> {
            char = $(char)
            let page = parseInt(char.attr('page'))
            let file = pages.eq(page).attr('file')
            let fontpng = `${font.path}${file}`

            if (code == char.attr('id')) {
              $("<span>").css({  
                background: `url(${fontpng})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${char.attr('x')}px -${char.attr('y')}px`,
                width: `${char.attr('width')}px`,
                height: `${char.attr('height')}px`,
                marginTop: `${char.attr('yoffset')}px`,
                marginRight: `${char.attr('xadvance') - char.attr('width')}px`,
                marginBottom: `${common.attr('lineHeight') - char.attr('yoffset') - char.attr('height')}px`,
                marginLeft: `${char.attr('xoffset')}px`,
                float: "left",
              }).appendTo(el)
            }

          })
        }

      })
    }

    if(includes(this.fontList, name)) {
      _fn()
    }
    else {
      this.on('fontloaded', ({name})=> {
        _fn()
      })
    }
  }
}