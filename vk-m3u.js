// ==UserScript==
// @name        vk-m3u
// @namespace   vkm3u
// @description vk-m3u
// @include     https://vk.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function(){
    /* https://github.com/eligrey/FileSaver.js minified */
    var saveAs=saveAs||navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator)||function(e){"use strict";var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=e.URL||e.webkitURL||e,i=t.createElementNS("http://www.w3.org/1999/xhtml","a"),s="download"in i,o=function(n){var r=t.createEvent("MouseEvents");r.initMouseEvent("click",true,false,e,0,0,0,0,0,false,false,false,false,0,null);n.dispatchEvent(r)},u=e.webkitRequestFileSystem,a=e.requestFileSystem||u||e.mozRequestFileSystem,f=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},l="application/octet-stream",c=0,h=[],p=function(){var e=h.length;while(e--){var t=h[e];if(typeof t==="string"){r.revokeObjectURL(t)}else{t.remove()}}h.length=0},d=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var i=e["on"+t[r]];if(typeof i==="function"){try{i.call(e,n||e)}catch(s){f(s)}}}},v=function(t,r){var f=this,p=t.type,v=false,m,g,y=function(){var e=n().createObjectURL(t);h.push(e);return e},b=function(){d(f,"writestart progress write writeend".split(" "))},w=function(){if(v||!m){m=y(t)}if(g){g.location.href=m}f.readyState=f.DONE;b()},E=function(e){return function(){if(f.readyState!==f.DONE){return e.apply(this,arguments)}}},S={create:true,exclusive:false},x;f.readyState=f.INIT;if(!r){r="download"}if(s){m=y(t);i.href=m;i.download=r;o(i);f.readyState=f.DONE;b();return}if(e.chrome&&p&&p!==l){x=t.slice||t.webkitSlice;t=x.call(t,0,t.size,l);v=true}if(u&&r!=="download"){r+=".download"}if(p===l||u){g=e}else{g=e.open()}if(!a){w();return}c+=t.size;a(e.TEMPORARY,c,E(function(e){e.root.getDirectory("saved",S,E(function(e){var n=function(){e.getFile(r,S,E(function(e){e.createWriter(E(function(n){n.onwriteend=function(t){g.location.href=e.toURL();h.push(e);f.readyState=f.DONE;d(f,"writeend",t)};n.onerror=function(){var e=n.error;if(e.code!==e.ABORT_ERR){w()}};"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=f["on"+e]});n.write(t);f.abort=function(){n.abort();f.readyState=f.DONE};f.readyState=f.WRITING}),w)}),w)};e.getFile(r,{create:false},E(function(e){e.remove();n()}),E(function(e){if(e.code===e.NOT_FOUND_ERR){n()}else{w()}}))}),w)}),w)},m=v.prototype,g=function(e,t){return new v(e,t)};m.abort=function(){var e=this;e.readyState=e.DONE;d(e,"abort")};m.readyState=m.INIT=0;m.WRITING=1;m.DONE=2;m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null;e.addEventListener("unload",p,false);return g}(self)

    function findItems(container) {
        var list = container.querySelectorAll('.audio'), item, items = [], track;

        for (var i in list) {
            if (list.hasOwnProperty(i)) {
                item = list[i];
                track = {};
                track.url = item.querySelector('input').value;
                track.url = track.url.substring(0, track.url.indexOf(','));
                track.artist = item.querySelector('.info .title_wrap a').innerHTML;
                console.log(track);
                track.title = item.querySelector('.info span.title a')
                    ? item.querySelector('.info span.title a').innerHTML
                    : item.querySelector('.info span.title').innerHTML;
                track.duration = item.querySelector('.duration').innerHTML;
                track.duration = track.duration.split(':');

                if (track.duration.length == 3) {
                    track.duration = 3600 * track.duration[0] + 60 * track.duration[1] + 1 * track.duration[2];
                }
                else {
                    track.duration = 60 * track.duration[0] + 1 * track.duration[1];
                }


                items.push(track);
            }
        }
        return items;
    }

    function m3u(container) {
        var m3u = '#EXTM3U\n\n',
            items = findItems(container),
            track;
        for (var i = 0; i < items.length; ++i) {
            track = items[i];

            m3u += '#EXTINF:' + track.duration + ',' + track.artist + ' - ' + track.title + '\n';
            m3u += track.url + '\n\n';

        }
        //console.log(m3u);
        var blob = new Blob([m3u], {type: "audio/x-mpegurl; charset: UTF-8"});
        saveAs(blob, "play.m3u");
    }

    function wget(container) {
        var wget = '',
            items = findItems(container),
            track;
        for (var i = 0; i < items.length; ++i) {
            track = items[i];

            wget += 'wget --max-redirect 0 "' + track.url + '" -O "' + track.title +'.mp3"' + '\n';

        }
        //console.log(m3u);
        var blob = new Blob([wget], {type: "application/x-octet-stream; charset: UTF-8"});
        saveAs(blob, "wget-list.sh");
    }


    function setHandlers() {
        var list = document.querySelectorAll('.wall_audio'), item, a;
        for (var i in list) {
            if (list.hasOwnProperty(i)) {
                item = list[i];
                if (!item.m3u) {
                    a = document.createElement('a');
                    (function(e){
                        a.addEventListener('click', function(){
                            m3u(e);
                        }, false);
                    })(item);
                    //a.style="position: fixed;left: 0; bottom: 0;";
                    a.appendChild(document.createTextNode('M3U'));
                    item.appendChild(a);
                    item.m3u = 1;
                }
            }
        }
    }


    var div = document.createElement('div');
    div.style = "width: 200px;position: fixed;right: 150px; bottom: 50px;padding:15px;background:#fff;z-index:100;border:1px solid #face8d";
    document.body.appendChild(div);

    var a = document.createElement('a');
    a.addEventListener('click', function(){
        m3u(document);
    }, false);
    a.appendChild(document.createTextNode('Все аудиозаписи со страницы в M3U'));
    a.style = 'display:block';

    var a2 = document.createElement('a');
    a2.addEventListener('click', function () {
        wget(document);
    }, false);
    a2.appendChild(document.createTextNode('Все аудиозаписи со страницы в WGET'));

    div.appendChild(a);
    div.appendChild(a2);

    setInterval(setHandlers, 1000);

})();

