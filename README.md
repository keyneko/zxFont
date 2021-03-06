# zxFont
======
> Easy to use bitmap instead of art font in web page


## Usage
first, you need to generate bitmap fonts, I recommend using this online tool [littera](http://kvazars.com/littera/), or other tools like [hiero](https://github.com/libgdx/libgdx/wiki/Hiero).  

<img src="./README/QQ20160404-0@2x.png" alt="" width="800">

the generated font includes `.fnt` and `.png` two type files. the `.fnt` use `XML` format that describes all of the informations. the .png is font bitmap textures, can have multiple pages of `.png`.  

<img src="./README/QQ20160404-1@2x.png" alt="" width="400">

sample usage as follows:

```javascript
import ZxFont from './lib/ZxFont'

var zxfont = new ZxFont()

// load(fontName, fontPath) fontName is the font name which export by littera, you can define yourself.
zxfont.load('font', './assets/font/')

// convert(fontName, selector) use which font to convert, and apply to the dom selector 
zxfont.convert('font', '.font')
```
before convert:  

<img src="./README/QQ20160404-2@2x.png" alt="" width="500">

after convert:  

<img src="./README/QQ20160404-3@2x.png" alt="" width="500">

## History

 - _1.0.0_ : initial release

## License

Copyright (c) 2016 keyneko `<keyneko@live.cn>`
Licensed under the MIT license.
