import{pluckNumber}from'../../../lib';export default function(b){var c,a=Math,d=a.atan2;b.define&&b.define([{name:'cubepath',cubepath:function(){var d,e,f,g,h=this,i={"stroke-linejoin":'round',"shape-rendering":'precision',stroke:'none'},j=arguments,k=j.length-1,l=j[k],m=function(a,b,d,e,f,g){var i=this,j=i._.cubetop,k=i._.cubeside;return'object'==typeof a||a===c&&b===c&&d===c&&e===c&&f===c&&g===c?this:(a=pluckNumber(a,i.attrs.x,0),b=pluckNumber(b,i.attrs.y,0),d=pluckNumber(d,i.attrs.width,0),e=pluckNumber(e,i.attrs.height,0),f=pluckNumber(f,i.attrs.xDepth,0),g=pluckNumber(g,i.attrs.yDepth,0),i.attrs.x=a,i.attrs.y=b,i.attrs.width=d,i.attrs.height=e,i.attrs.xDepth=f,i.attrs.yDepth=g,i._attr('path',['M',a+d,b,'l',0,e,-d,0,0,-e,'z']),j.attr('path',['M',a,b,'l',1,1,d-1,0,0,-1,f,-g,-d,0,'z']),k.attr('path',['M',a+d-1,b+1,'l',0,e-1,1,0,f,-g,0,-e,-f,g]),this)},n=function(a,b,c,d){var e=this,f=e._.cubetop,g=e._.cubeside;return e.dropshadow&&(f.dropshadow(a,-b,c,d),g.dropshadow(a,-b,c,d)),!1};for(f in l&&l.constructor===b.el.constructor?j[k]=c:l=c,d=h.path(i,l),e=h.path(i,l),g=h.path(i,l),g._.cubetop=d.follow(g,c,'before'),g._.cubeside=e.follow(g,c,'before'),b.fn.cubepath.ca)g.ca[f]=b.fn.cubepath.ca[f];return g._attr=g.attr,g._shadow=g.shadow,g.attr=function(a,b){var d='object'==typeof a;return(d&&(a.cubepath?b=[...a.cubepath]:(b=[],b.push(a.x),b.push(a.y),b.push(a.width),b.push(a.height),b.push(a.xDepth),b.push(a.yDepth)),a.noGradient!==c&&(g.attrs.noGradient=a.noGradient)),a===c&&b===c)?this.attrs:b===c?this.attrs[a]:(d?m.apply(this,b):'drop-shadow'===a&&n.apply(this,[].concat(b)),g._attr(a),this)},g.appendTo=function(a){a.appendChild(g._.cubetop),a.appendChild(g._.cubeside),a.appendChild(g)},'object'==typeof j[0]?g.attr(j[0]):m.apply(g,[j[0],j[1],j[2],j[3],j[4],j[5]])},fn:{_getBBox2:function(){var a=this,b=a._.cubeside.getBBox(),c=a._.cubetop.getBBox(),d=a.getBBox();return{x:d.x+c.height,y:d.y-b.width,width:d.width,height:d.height}},shadow:function(){return this._.cubeside.shadow.apply(this._.cubeside,arguments),this._.cubetop.shadow.apply(this._.cubetop,arguments),this._shadow.apply(this,arguments)}},ca:{"stroke-linejoin":function(){return{"stroke-linejoin":'round'}},fill:function(a,e){var f,g=this,h=g._.cubetop,i=g._.cubeside,j=g._attr('cubepath')||[0,0,0,0,0,0],k=j[2],l=j[4],m=j[5];return e===c&&(e=g._attr('noGradient')),a=b.color(a),e?(g._attr('fill',a),h.attr('fill',b.tintshade(a,-.78).rgba),i.attr('fill',b.tintshade(a,-.65).rgba)):(f='opacity'in a?'rgba('+[a.r,a.g,a.b,a.opacity]+')':'rgb('+[a.r,a.g,a.b]+')',g._attr('fill',[270,b.tintshade(f,.55).rgba,b.tintshade(f,-.65).rgba].join('-')),i.attr('fill',[270,b.tintshade(f,-.75).rgba,b.tintshade(f,-.35).rgba].join('-')),h.attr('fill',[45+b.deg(d(m,l+k)),b.tintshade(f,-.78).rgba,b.tintshade(f,.22).rgba].join('-'))),!1}}}])}