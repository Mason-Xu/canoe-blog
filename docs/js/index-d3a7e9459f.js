"use strict";$(function(){initPlugins(),setTocToggle(),setAsideToggle(),loadSvg(),setSearchBoard()});var initPlugins=function(){$(".tab").click(function(e){window.location.href=$(this).find("a").prop("href")}),$(".modal").modal()},loadSvg=function(){var e=window.origin+"/svg/icon.svg";$('<div style="display:none"></div>').appendTo($("body")).load(e)},loadLunrDB=function(){var e=null;return function(){if(e)return e;var t=window.origin+"/index.json";return e=$.getJSON(t).then(function(e){return{pageMap:e.reduce(function(e,t){return e[t.uri]=t,e},Object.create(null)),index:lunr(function(){var t=this;this.field("title",{boost:10}),this.field("tags",{boost:5}),this.field("content"),this.ref("uri"),e.forEach(function(e){return t.add(e)})})}}).fail(function(t,n,o){console.error("Error getting Hugo index flie:",n+", "+o),e=null})}}(),search=function(e){return loadLunrDB().then(function(t){return t.index.search(e).map(function(e){return t.pageMap[e.ref]})})},setSearchBoard=function(){var e=$("#in-search"),t=$("#out-search"),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"No Result...",n=$('<span class="collection-item text-grey" style="display:none">'+e+"</span>");t.empty().append(n.fadeIn(200))};n();var o=function(e){if(e&&e.length){$.isArray(e)||(e=[e]);var o=e.map(function(e){return $('<a href="'+e.uri+'" class="collection-item nowrap" style="display:none"><i class="material-icons">description</i>'+e.title+"</a>")});t.empty().append(o),o.forEach(function(e){return e.fadeIn(100)})}else n()};e.keyup(function(){var t=e.val().trim();t.length<2?n():(n("Searching..."),search(t).then(function(e){return o(e)}).fail(function(){return n("Fail to execute search, Please check your network.")}))})},setTocToggle=function(){function e(){return r.map(function(e){return Math.floor($(e.getAttribute("href")).offset().top-u)})}function t(e,t){var n=e.href?$(e.getAttribute("href")):$(e);$("html, body").animate({scrollTop:n.offset().top-u+1},400,t)}var n=!0,o=$(".toc-panel nav"),i=($("footer.page-footer"),$(".post .card")),a=$("nav.navbar"),r=[].slice.call(o.find("li a")),s=o.outerHeight(),l=i.offset(),c=a.height(),u=c+20,f=e();if(0!==o.length){o.on("click","a",function(e){var i=this;e.preventDefault(),e.stopPropagation(),n=!1,o.find("a").removeClass("active"),t(this,function(){n=!0,$(i).addClass("active")})});var d=function(){if(f){var e=i.height(),t=$("html").scrollTop()||$("body").scrollTop(),a=!1;if(t+c>=l.top&&(o.removeClass("absolute").addClass("fixed").css("top",c),a=!0),t+c+s>=l.top+e&&(o.removeClass("fixed").addClass("absolute").css({top:e-s}),a=!0),a||o.removeClass("fixed").removeClass("absolute").css({top:"initial"}),n){for(var u,d=0,p=f.length-1;d<p;)f[u=d+p+1>>1]===t?d=p=u:f[u]<t?d=u:p=u-1;$(r).removeClass("active").eq(d).addClass("active")}}};$(window).resize(function(){f=e(),l=i.offset(),s=o.outerHeight(),c=a.height(),u=c+20,n=!0,d()}),$(window).scroll(function(){return d()}),d()}},setAsideToggle=function(){var e=$("aside.side-panel"),t=$("body"),n=$(".button-collapse"),o=$("i.material-icons",n),i=$('<div id="js-cover"></div>').appendTo(t),a=function(){e.hasClass("open")?(e.removeClass("open"),i.fadeOut(400),t.removeClass("covered"),o.text("menu")):(e.addClass("open"),i.fadeIn(400),t.addClass("covered"),o.text("close"))};i.click(function(e){e.stopPropagation(),e.preventDefault(),a()}),n.click(a)};