'use strict'

import ZxFont from './lib/ZxFont'

let zxfont = new ZxFont()
zxfont.load('font', './assets/font/')
zxfont.convert('font', '.font')