// ==UserScript==
// @name        vk-m3u
// @namespace   vkm3u
// @description vk-m3u
// @include     https://vk.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function () {
    /* https://github.com/eligrey/FileSaver.js minified */
    var saveAs=saveAs||function(view){"use strict";if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view},save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link="download"in save_link,click=function(node){var event=new MouseEvent("click");node.dispatchEvent(event)},is_safari=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex},0)},force_saveable_type="application/octet-stream",fs_min_size=0,arbitrary_revoke_timeout=500,revoke=function(file){var revoker=function(){if(typeof file==="string"){get_URL().revokeObjectURL(file)}else{file.remove()}};if(view.chrome){revoker()}else{setTimeout(revoker,arbitrary_revoke_timeout)}},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver)}catch(ex){throw_outside(ex)}}}},auto_bom=function(blob){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)){return new Blob(["\ufeff",blob],{type:blob.type})}return blob},FileSaver=function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}var filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "))},fs_error=function(){if(target_view&&is_safari&&typeof FileReader!=="undefined"){var reader=new FileReader;reader.onloadend=function(){var base64Data=reader.result;target_view.location.href="data:attachment/file"+base64Data.slice(base64Data.search(/[,;]/));filesaver.readyState=filesaver.DONE;dispatch_all()};reader.readAsDataURL(blob);filesaver.readyState=filesaver.INIT;return}if(blob_changed||!object_url){object_url=get_URL().createObjectURL(blob)}if(target_view){target_view.location.href=object_url}else{var new_tab=view.open(object_url,"_blank");if(new_tab==undefined&&is_safari){view.location.href=object_url}}filesaver.readyState=filesaver.DONE;dispatch_all();revoke(object_url)},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments)}}},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download"}if(can_use_save_link){object_url=get_URL().createObjectURL(blob);setTimeout(function(){save_link.href=object_url;save_link.download=name;click(save_link);dispatch_all();revoke(object_url);filesaver.readyState=filesaver.DONE});return}if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true}if(webkit_req_fs&&name!=="download"){name+=".download"}if(type===force_saveable_type||webkit_req_fs){target_view=view}if(!req_fs){fs_error();return}fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event);revoke(file)};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error()}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event]});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE};filesaver.readyState=filesaver.WRITING}),fs_error)}),fs_error)};dir.getFile(name,{create:false},abortable(function(file){file.remove();save()}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save()}else{fs_error()}}))}),fs_error)}),fs_error)},FS_proto=FileSaver.prototype,saveAs=function(blob,name,no_auto_bom){return new FileSaver(blob,name,no_auto_bom)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}return navigator.msSaveOrOpenBlob(blob,name||"download")}}FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort")};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;return saveAs}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!=null){define([],function(){return saveAs})}

    function findItems(container) {
        var list = container.querySelectorAll('.audio'), item, items = [], track;

        for (var i in list) {
            if (list.hasOwnProperty(i)) {
                item = list[i];
                track = {};
                track.url = item.querySelector('input').value;
                track.url = track.url.substring(0, track.url.indexOf(','));
                track.artist = item.querySelector('.info .title_wrap a').innerHTML;
                //console.log(track);
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

    var m3u = function (container) {
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
    };

    var wget = function (container) {
        var wget = '',
            items = findItems(container),
            track,
            pos;
        for (var i = 0; i < items.length; ++i) {
            track = items[i];

            pos = i + 1;
            if (pos < 10) {
                pos = '0' + pos;
            }

            wget += 'wget --max-redirect 0 "' + track.url + '" -O "' + pos + '. ' + track.artist + ' - '
                + track.title.trim() + '.mp3"' + '\n';

        }
        //console.log(m3u);
        var blob = new Blob([wget], {type: "application/x-octet-stream; charset: UTF-8"});
        saveAs(blob, "wget-list.sh");
    };

    var icons = {
        'm3u': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAxUlEQVR4Xu2WgQnCMBREf0oG6AiO4Ag6gXEEJ0gzge0EOko30RE6ghvEE5WIQUFtcmBz8CglhX/8f0mqJJ380/sRbK7PoHwGAh1oHw14GVfqtYG4G5VwNAcH0FbC1ZZigBXCNVgBA+q8BuJa5m6GZCBAz4AGnpgnfgeKAQ3U5EdQMuCZ90gZwV/8DyyABeabWlp+0w40rBE0F5gZsPnOgXiGNZhNehuewPBBnSFFB7oxvlUZtuEeuFQZcGAJeonV39acvNEZe1wfJEhX0IQAAAAASUVORK5CYII=',
        'wget': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADKElEQVR4nM2WPU8jVxSGn3Nnxuv1R2FpggSLtVRp0+cfpIXWFkUk/gMSXSQ6SmRZIqKwQkrqVLTbpSapgtCuhGXFZsc7X3fO3cLYWrK22U0M5JXGHslnznnOxxxf6Xa7LreQWnCAEWaST+6ncu7uG5jz80LJ7GPybGDA98G3Bbz5E5J84lzdPwI+5PQBvXzhTa6SAYQ4K/BEyXPLd1t3AFEMUQqqn2S3wLtbRjTPHqH1w2tqFR9BiD7k/PLbX2TpJGlfBKxCof8t0CIlmbL5zUvMXW8b9YA4c9hiUkGzLNuVSITc3s+mcG5WbV/1/uCtWloo7z9YxPgIYAuHWp3MjwM/tylZHJGOHS+q4coB8jzjp59/R8SfAAFOLSVJKWyArzbljze/8vbdW+L3g5UDzJPxfNZfveb7b3/EqM3JkhHp+O8nCQ6ghSWLb8nTGAPgVHGrGvsvlHMO53QC8BzSu9fg2QH8RQae5yEiqOrMeNUAxpjFFahWq1xcXLC2toY8wqaazIB7uAXn5+dsbGxgzGq7JSKIyGKAKIrY2dkhyzJ6vR7NZnOllRCR5RVQVfr9Pu12G2stnU6HZrO58kos9eac4/r6mr29PTzP4/T0lPX19ZVW4sF0VJXBYMDR0RHlcpler4fneU8H4Ps+YRhyeHiIiNBut1e6NRfuAZjsgq2tLbrdLmmasr29zWAwoCiKe3bTgQIwxsxaNN0fy4CXAoRhyPHxMXEc02q1uLm5+cxZvV6n0WjQaDQACIKAOI4pioLxeMxwOCSKooUQCwGCIODk5IQoitjf358bXEQIw5Dd3V02NzcplUqUSiWCIEBVuby8pNPpMB6Pvx7A933SNOXg4ICrq6vPyj61KYqCJElmpRcRarUaxhjq9TrGmH/XgjRNabVaACRJMtdGVRmNRpydnVGr1VBVKpUKxhjyPKff7zMcDhcGXwqgqgsDT1UUBaPRiNvbW5xzsz8w59wXDeBSgK/RNMi8Nj2kZzsP/L8AptP7lKpWq6gqfrlcplQqEYYh1lqCILi32R5DIjLbG9LpdFye51hrybKMJEke/YQsIhhjqFQqfARzZplzQU2kPQAAAABJRU5ErkJggg==',
    };

    function makeAnchor(click, container, text) {
        var a = document.createElement('a');
        (function (e) {
            a.addEventListener('click', function () {
                click(e);
            }, false);
        })(container);

        a.style = 'background-image: url("' + icons[text] + '");\
background-size: 16px 16px;\
background-repeat: no-repeat;\
display: inline-block;\
line-height: 16px;\
margin-top: 6px;\
padding-left: 20px;\
margin-right: 15px;\
width: auto;';
        a.appendChild(document.createTextNode(text));
        return a;
    }


    function setHandlers() {
        var list = document.querySelectorAll('.wall_audio'), item, a, info;
        for (var i in list) {
            if (list.hasOwnProperty(i)) {
                item = list[i];
                if (!item.m3u) {
                    item.appendChild(makeAnchor(m3u, item, 'm3u'));
                    item.appendChild(makeAnchor(wget, item, 'wget'));
                    item.m3u = 1;
                }
            }
        }
    }


    var div = document.createElement('div');
    div.style = "position: fixed;left: 30px; bottom: 30px;padding:5px;background:#eee;z-index:100;border-radius:3px";
    div.appendChild(document.createTextNode('Со всей страницы: '));
    document.body.appendChild(div);

    div.appendChild(makeAnchor(m3u, document, 'm3u'));
    div.appendChild(makeAnchor(wget, document, 'wget'));

    setInterval(setHandlers, 1000);

})();