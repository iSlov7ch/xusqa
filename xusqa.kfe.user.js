// ==UserScript==
// @name         有道搜题录题助手-公式
// @namespace    jacktsui
// @version      0.1.002
// @description  有道搜题,录题员助手(公式加强)
// @author       Jacktsui
// @copyright    © 2018, 徐。355088586@qq.com
// @license      MIT https://mit-license.org/
// @homepageURL  https://github.com/jacktsui/xusqa
// @supportURL   https://github.com/jacktsui/xusqa/issues
// @match        http://searchq-editsys.youdao.com/static/Ueditor/kityformula-plugin/*
// @grant        none
// @run-at       document-end
// @note         2018-09-23 初版,化学方程式
// ==/UserScript==

(function() {
    'use strict';

const xusqapi = window.top.xusqapi
if (!xusqapi.passport){
    return
}
let ue, kfe

function txt2LaTex(str){
    const arrow = [
        ['=', '\\xlongequal {\\placeholder } {\\placeholder }'], 
        ['→', '\\xlongequal {\\placeholder } {\\placeholder }'],
        ['⇌', '\\xrightleftharpoons {\\placeholder } {\\placeholder }'],
    ]
    if (xusqapi.subject === '化学'){
        str = str.replace(/(\([a-zA-Z0-9]+\))(\d+)/g, '{$1}_{$2}')

        str = str.replace(/\((\w*)([A-Z][a-z]*)(\d)(\d*[+-])\)/g, '($1{$2}^{$4}_{$3})')
        str = str.replace(/([A-Z][a-z]*)(\d)(\d*[+-])([+=-])/g, '{$1}^{$3}_{$2}$4')
        str = str.replace(/([A-Z][a-z]*)(\d)(\d*[+-])$/g, '{$1}^{$3}_{$2}')

        str = str.replace(/\((\w*)([A-Z][a-z]*)([+-])\)/g, '($1{$2}^{$3})')
        str = str.replace(/([A-Z][a-z]*)([+-])([+=-])/g, '{$1}^{$2}$3')
        str = str.replace(/([A-Z][a-z]*)([+-])$/g, '{$1}^{$2}')

        //str = str.replace(/([A-Z]|[A-Z][a-z])<sub>(\d+[+-]*)<\/sub>/g, '{$1}_{$2}')
        str = str.replace(/([A-Z][a-z]*)(\d+)/g, '{$1}_{$2}')

        for (let i of arrow){
            str = str.replace(i[0], i[1])
        }

        return str
    }
}
let timer
function inikfe(){
    clearTimeout(timer)
    if (window.kfe){
        kfe = window.kfe
        ue = window.editor
        ue.focus()
        const txt = ue.selection.getText()
        if (txt){
            kfe.execCommand('render', txt2LaTex(txt))
        }
        kfe.execCommand('focus')
    } else {
        timer = setTimeout(inikfe, 100)
    }
}

inikfe()

})()