;(function(b){var a={init:function(c){return this.each(function(){var g=b.extend({},b.fn.raty.defaults,c),n=b(this).data("options",g);if(g.number>20){g.number=20;}else{if(g.number<0){g.number=0;}}if(g.round.down===undefined){g.round.down=b.fn.raty.defaults.round.down;}if(g.round.full===undefined){g.round.full=b.fn.raty.defaults.round.full;}if(g.round.up===undefined){g.round.up=b.fn.raty.defaults.round.up;}if(g.path.substring(g.path.length-1,g.path.length)!="/"){g.path+="/";}if(typeof g.start=="function"){g.start=g.start.call(this);}var h=!isNaN(parseInt(g.start,10)),f="";if(h){f=(g.start>g.number)?g.number:g.start;}var o=g.starOn,d=(g.space)?4:0,k="";for(var l=1;l<=g.number;l++){o=(f<l)?g.starOff:g.starOn;k=(l<=g.hintList.length&&g.hintList[l-1]!==null)?g.hintList[l-1]:l;n.append('<img src="'+g.path+o+'" alt="'+l+'" title="'+k+'" />');if(g.space){n.append((l<g.number)?"&nbsp;":"");}}var j=b("<input/>",{type:"hidden",name:g.scoreName}).appendTo(n);if(h){if(g.start>0){j.val(f);}a.roundStar.call(n,f);}if(g.iconRange){a.fillStar.call(n,f);}a.setTarget.call(n,f,g.targetKeep);var e=g.width||(g.number*g.size+g.number*d);if(g.cancel){var m=b('<img src="'+g.path+g.cancelOff+'" alt="x" title="'+g.cancelHint+'" class="raty-cancel"/>');if(g.cancelPlace=="left"){n.prepend("&nbsp;").prepend(m);}else{n.append("&nbsp;").append(m);}e+=g.size+d;}if(g.readOnly){a.fixHint.call(n);n.children(".raty-cancel").hide();}else{n.css("cursor","pointer");a.bindAction.call(n);}n.css("width",e);});},bindAction:function(){var c=this,d=this.data("options"),e=this.children("input");c.mouseleave(function(){a.initialize.call(c,e.val());a.setTarget.call(c,e.val(),d.targetKeep);});var g=this.children("img").not(".raty-cancel"),f=(d.half)?"mousemove":"mouseover";if(d.cancel){c.children(".raty-cancel").mouseenter(function(){b(this).attr("src",d.path+d.cancelOn);g.attr("src",d.path+d.starOff);a.setTarget.call(c,null,true);}).mouseleave(function(){b(this).attr("src",d.path+d.cancelOff);c.mouseout();}).click(function(h){e.removeAttr("value");if(d.click){d.click.call(c[0],null,h);}});}g.bind(f,function(i){var j=parseInt(this.alt,10);if(d.half){var h=parseFloat((i.pageX-b(this).offset().left)/d.size),k=(h>0.5)?1:0.5;j=parseFloat(this.alt)-1+k;a.fillStar.call(c,j);if(d.precision){j=j-k+h;}a.showHalf.call(c,j);}else{a.fillStar.call(c,j);}c.data("score",j);a.setTarget.call(c,j,true);}).click(function(h){e.val((d.half||d.precision)?c.data("score"):this.alt);if(d.click){d.click.call(c[0],e.val(),h);}});},cancel:function(c){return this.each(function(){var d=b(this);if(d.data("readonly")=="readonly"){return false;}if(c){a.click.call(d,null);}else{a.start.call(d,null);}d.mouseleave().children("input").removeAttr("value");});},click:function(c){return this.each(function(){var e=b(this);if(e.data("readonly")=="readonly"){return false;}a.initialize.call(e,c);var d=e.data("options");if(d.click){d.click.call(e[0],c);}else{b.error('you must add the "click: function(score, evt) { }" callback.');}a.setTarget.call(e,c,true);});},fillStar:function(e){var d=this.data("options"),c=this.children("img").not(".raty-cancel"),f=c.length,k=0,g,j,l;for(var h=1;h<=f;h++){g=c.eq(h-1);if(d.iconRange&&d.iconRange.length>k){j=d.iconRange[k];if(d.single){l=(h==e)?(j.on||d.starOn):(j.off||d.starOff);}else{l=(h<=e)?(j.on||d.starOn):(j.off||d.starOff);}if(h<=j.range){g.attr("src",d.path+l);}if(h==j.range){k++;}}else{if(d.single){l=(h==e)?d.starOn:d.starOff;}else{l=(h<=e)?d.starOn:d.starOff;}g.attr("src",d.path+l);}}},fixHint:function(){var c=this.data("options"),d=this.children("input"),f=parseInt(d.val(),10),e=c.noRatedMsg;if(!isNaN(f)&&f>0){e=(f<=c.hintList.length&&c.hintList[f-1]!==null)?c.hintList[f-1]:f;}d.attr("readonly","readonly");this.css("cursor","default").data("readonly","readonly").attr("title",e).children("img").attr("title",e);},readOnly:function(c){return this.each(function(){var d=b(this),e=d.children(".raty-cancel");if(e.length){if(c){e.hide();}else{e.show();}}if(c){d.unbind();d.children("img").unbind();a.fixHint.call(d);}else{a.bindAction.call(d);a.unfixHint.call(d);}});},roundStar:function(f){var c=this.data("options"),e=(f-Math.floor(f)).toFixed(2);if(e>c.round.down){var d=c.starOn;if(e<c.round.up&&c.halfShow){d=c.starHalf;}else{if(e<c.round.full){d=c.starOff;}}this.children("img").not(".raty-cancel").eq(Math.ceil(f)-1).attr("src",c.path+d);}},score:function(){var d=[],c;this.each(function(){c=b(this).children("input").val();c=(c=="")?null:parseFloat(c);d.push(c);});return(d.length>1)?d:d[0];},setTarget:function(f,d){var e=this.data("options");if(e.target){var c=b(e.target);if(c.length==0){b.error("target selector invalid or missing!");}else{var g=f;if(g==null&&!e.cancel){b.error('you must enable the "cancel" option to set hint on target.');}else{if(!d||g==""){g=e.targetText;}else{if(e.targetType=="hint"){if(g===null&&e.cancel){g=e.cancelHint;}else{g=e.hintList[Math.ceil(g-1)];}}else{if(g!=""&&!e.precision){g=parseInt(g,10);}else{g=parseFloat(g).toFixed(1);}}}if(e.targetFormat.indexOf("{score}")<0){b.error('template "{score}" missing!');}else{if(f!==null){g=e.targetFormat.toString().replace("{score}",g);}}if(c.is(":input")){c.val(g);}else{c.html(g);}}}}},showHalf:function(e){var c=this.data("options"),d=(e-Math.floor(e)).toFixed(1);if(d>0&&d<0.6){this.children("img").not(".raty-cancel").eq(Math.ceil(e)-1).attr("src",c.path+c.starHalf);}},start:function(c){return this.each(function(){var e=b(this);if(e.data("readonly")=="readonly"){return false;}a.initialize.call(e,c);var d=e.data("options");a.setTarget.call(e,c,true);});},initialize:function(d){var c=this.data("options");if(d<0){d=0;}else{if(d>c.number){d=c.number;}}a.fillStar.call(this,d);if(d!=""){if(c.halfShow){a.roundStar.call(this,d);}this.children("input").val(d);}},unfixHint:function(){var d=this.data("options"),e=this.children("img").filter(":not(.raty-cancel)");for(var c=0;c<d.number;c++){e.eq(c).attr("title",(c<d.hintList.length&&d.hintList[c]!==null)?d.hintList[c]:c);}this.css("cursor","pointer").removeData("readonly").removeAttr("title").children("input").attr("readonly","readonly");}};b.fn.raty=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments);}else{b.error("Method "+c+" does not exist!");}}};b.fn.raty.defaults={cancel:false,cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:undefined,half:false,halfShow:true,hintList:["bad","poor","regular","good","gorgeous"],iconRange:undefined,noRatedMsg:"not rated yet",number:5,path:"img/",precision:false,round:{down:0.25,full:0.6,up:0.76},readOnly:false,scoreName:"score",single:false,size:16,space:true,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",start:0,target:undefined,targetFormat:"{score}",targetKeep:false,targetText:"",targetType:"hint",width:undefined};})(jQuery);