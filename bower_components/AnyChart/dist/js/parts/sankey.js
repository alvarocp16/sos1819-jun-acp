if(!_.sankey){_.sankey=1;(function($){var NP=function(a,b){$.Wp.call(this);this.za=a;this.Zd=b;this.fb=null;var c={};$.R(c,[["fill",0,8192],["stroke",0,8192],["labels",0,0]]);this.ca=new $.Ew(this,c,$.Wk);$.V(this,"normal",this.ca);this.ca.pa("labelsFactoryConstructor",$.Fw);this.ca.pa("labelsAfterInitCallback",$.Kw);this.ya=new $.Ew(this,c,$.ln);$.V(this,"hovered",this.ya);this.ya.pa("labelsFactoryConstructor",$.Gw);this.ya.pa("labelsAfterInitCallback",function(a){a.I(4294967295)})},OP=function(a,b){$.Ov.call(this);this.Ia("sankey");
$.Qs(this,this,this.cg,this.rg,null,this.cg,null,null);$.R(this.xa,Xea);this.data(a||null,b);this.gP=(0,$.pa)(this.gP,this);this.eP=(0,$.pa)(this.eP,this)},PP=function(a,b){for(var c=b.NC,d=0;d<c.length;d++){var e=c[d];b.level>=e.level&&(e.level=b.level+1,PP(a,e));e.level>a.G&&(a.G=e.level)}},RP=function(a,b){return b?(a.mf[b]||(a.mf[b]={type:QP,name:b,level:0,WK:0,PL:0,mF:0,gG:[],NC:[],q_:[],D0:[],LY:[],$la:[],jma:[],wx:[],Jx:[],GP:!1}),a.mf[b]):null},TP=function(a,b){var c=b.type,d;if(c==QP){var e=
b.name;a.isConflict={value:b.GP,type:"string"};var f=[];for(d=0;d<b.gG.length;d++){var h=b.gG[d];var k=$.ua(h.NC,function(a){return a==b});f.push({name:h.name,value:h.D0[k]})}a.income={value:f,type:""};f=[];for(d=0;d<b.NC.length;d++)h=b.NC[d],k=$.ua(h.gG,function(a){return a==b}),f.push({name:h.name,value:h.q_[k]});a.outcome={value:f,type:""};a.dropoff={value:b.mF,type:"number"}}else e=c==SP?b.from.name+" -> "+b.uf.name:b.from.name+" dropoff";a.type={value:Yea[c],type:"string"};a.name={value:e,type:"string"};
a.value={value:b.weight,type:"number"}},UP=function(a,b,c){c=c?a.node().lb().labels():a.node().Ta().labels();a=a.node().Ta().labels();c=c.i("position");a=a.i("position");a=$.nj(c||a,"center");var d=c=0,e=(b.Zj+b.$j)/2,f=(b.ve+b.af)/2;switch(a){case "left-top":c=b.Zj;d=b.ve;break;case "left-center":c=b.Zj;d=f;break;case "left-bottom":c=b.Zj;d=b.af;break;case "center-top":c=e;d=b.ve;break;case "center":c=e;d=f;break;case "center-bottom":c=e;d=b.af;break;case "right-top":c=b.$j;d=b.ve;break;case "right-center":c=
b.$j;d=f;break;case "right-bottom":c=b.$j,d=b.af}return{value:{x:c,y:d}}},WP=function(a,b,c,d,e,f){for(var h,k,l=0;l<b.length;l++)h=b[l],k=h.path,VP(a,a.b,k.tag,k,d),h.label.Dk(c),h.label.Cc({value:e(h,f)}),a.Qd(a.b,h,d)},VP=function(a,b,c,d,e){c=a.me(c);a=b.Ym(e,c);b=b.sl(e,c);d.fill(a);d.stroke(b)},XP=function(a,b,c,d,e,f){var h=b.tag;VP(a,a.f,h,b,c);b=h.element;WP(a,b.wx,d,c,f,"leftTop");WP(a,b.Jx,e,c,f,"rightTop");b.label.Cc(UP(a,b,c));a.Qd(a.f,b,c)},YP=function(a,b,c){b=b.tag;var d=b.element;
VP(a,a.b,b,d.path,c);d.label.Dk("center-bottom");d.label.Cc({value:a.rV(d)});VP(a,a.f,d.from.path.tag,d.from.path,c);VP(a,a.f,d.uf.path.tag,d.uf.path,c);a.Qd(a.b,d,c)},ZP=function(a,b,c){var d=b.tag;VP(a,a.o,d,b,c);a.Qd(a.o,d.element,c)},$P=function(a){return(a.ve+a.af)/2},Zea=function(a,b){for(var c=0;c<a.g.length;c++)for(var d=a.g[c].mf,e=0;e<d.length;e++){var f=d[e];if(f.wx.length){var h=(0,$.hg)(f.wx,function(a,b){return a+$P(b.from)*b.weight},0,a),k=(0,$.hg)(f.wx,function(a,b){return a+b.weight},
0,a);h=(h/k-$P(f))*b;f.ve+=h;f.af+=h}}},$ea=function(a,b){for(var c=a.g.slice(),d=0;d<c.length;d++)for(var e=a.g[d].mf,f=0;f<e.length;f++){var h=e[f];if(h.Jx.length){var k=(0,$.hg)(h.Jx,function(a,b){return a+$P(b.uf)*b.weight},0,a),l=(0,$.hg)(h.Jx,function(a,b){return a+b.weight},0,a);k=(k/l-$P(h))*b;h.ve+=k;h.af+=k}}},aQ=function(a,b){for(var c=0;c<a.g.length;c++){var d=a.g[c].mf.slice(),e=b.top,f=e+b.height,h=d.length,k,l=a.i("nodePadding");d.sort(a.fP);for(k=0;k<h;++k){var m=d[k];e-=m.ve;0<e&&
(m.ve+=e,m.af+=e);e=m.af+l}e=e-l-f;if(0<e)for(m.ve=m.ve-e,m.af=m.af-e,e=m.ve,k=h-2;0<=k;--k)m=d[k],e=m.af+l-e,0<e&&(m.ve-=e,m.af-=e),e=m.ve}},bQ=function(a,b,c){var d;for(d=0;d<b.length;d++){var e=b[d];VP(a,c,e.tag,e,$.Wk)}},cQ=function(a,b){return new OP(a,b)};$.H(NP,$.Wp);$.rp(NP,["fill","stroke","labels"],"normal");$.g=NP.prototype;$.g.ra=$.Wp.prototype.ra|28672;$.g.Qa=function(){return this.Zd};$.g.eg=function(){$.V(this,"normal",this.ca);$.V(this,"hovered",this.ya)};
$.g.Ya=function(a){this.fb||(this.fb=new $.Ru(0),this.fb.Me(),$.V(this,"tooltip",this.fb),this.fb.parent(this.za.Ya()),this.fb.za(this.za));return $.p(a)?(this.fb.K(a),this):this.fb};$.g.Po=function(){this.ua(16384)};$.g.Fd=function(){this.ua(4096)};$.g.GG=function(){this.ca.labels().I(4294967295);this.ya.labels().I(4294967295)};$.g.Ta=function(a){return $.p(a)?(this.ca.K(a),this):this.ca};$.g.lb=function(a){return $.p(a)?(this.ya.K(a),this):this.ya};$.g.Ym=function(a,b){return this.Ux("fill",a,b)};
$.g.sl=function(a,b){return this.Ux("stroke",a,b)};$.g.Ux=function(a,b,c){a=(b?this.ya:this.ca).i(a)||this.ca.i(a);$.E(a)&&(a=a.call(c,c));return a};$.g.F=function(){var a=NP.B.F.call(this);a.tooltip=this.Ya().F();a.normal=this.ca.F();a.hovered=this.ya.F();return a};$.g.Y=function(a,b){NP.B.Y.call(this,a,b);"tooltip"in a&&this.Ya().ja(!!b,a.tooltip);this.ca.ja(!!b,a);this.ca.ja(!!b,a.normal);this.ya.ja(!!b,a.hovered)};$.g.R=function(){$.jd(this.fb,this.ca,this.ya);NP.B.R.call(this)};var dQ=NP.prototype;
dQ.tooltip=dQ.Ya;dQ.normal=dQ.Ta;dQ.hovered=dQ.lb;$.H(OP,$.Ov);$.Xx(OP,"sankey",["appearance","data","flowlabels","nodelabels"]);OP.prototype.ra=$.Ov.prototype.ra;var eQ={};$.ep(eQ,[[0,"nodeWidth",$.Op],[0,"nodePadding",$.mp],[0,"curveFactor",$.Rp]]);$.S(OP,eQ);var Xea=[["nodeWidth",4,1],["nodePadding",4,1],["curveFactor",4,1]];$.g=OP.prototype;
$.g.data=function(a,b){if($.p(a)){if(a){var c=a.title||a.caption;c&&this.title(c);a.rows&&(a=a.rows)}this.Vf!==a&&(this.Vf=a,$.hd(this.na),$.hd(this.ed),this.Md=null,$.K(a,$.oq)?this.na=a.$i():this.na=$.K(a,$.yq)?a.Yd():(this.ed=new $.yq($.B(a)||$.z(a)?a:null,b)).Yd(),$.L(this.na,this.xd,this),this.u(256),$.$p(this,"sankey","data",1));return this}return this.na};$.g.xd=function(){this.u(256);$.$p(this,"sankey","data",1)};$.g.If=function(){return this.na.aa()};$.g.wc=function(){return this.Md=this.na.aa()};
$.g.aa=function(){return this.Md||(this.Md=this.na.aa())};$.g.Qa=function(){return"sankey"};
$.g.mb=function(){if($.cq(this,"sankey","data")){this.mf={};this.D={};this.G=-1;for(var a=this.aa().reset();a.advance();){var b=String(a.get("from"));var c=a.get("to");c=null===c||$.D(c)?null:String(c);var d=$.N(a.get("weight"));var e=!b.length;var f=null!==c&&!c.length;$.ea(d)&&0<d&&!e&&!f&&(b=RP(this,b),e=RP(this,c),c=b,b=e,e=this.aa().ka(),this.D[e]={type:b?SP:fQ,Hi:e,from:c,uf:b,weight:d},c.PL+=d,b?(c.Jx.push(this.D[e]),c.D0.push(d),c.NC.push(b),b.WK+=d,b.q_.push(d),b.gG.push(c),b.wx.push(this.D[e]),
c.level>=b.level&&(b.level=c.level+1,PP(this,b)),b.level>this.G&&(this.G=b.level)):(c.mF+=d,c.LY.push(d)))}this.g=[];this.va=!0;for(var h in this.mf)d=this.mf[h],d.weight=Math.max(d.WK,d.PL),a=d.NC.length+d.LY.length,this.va&&!a&&(d.level=this.G),d.gG.length&&a&&(d.GP=d.WK!=d.PL),a=d.level,this.g[a]||(this.g[a]={mf:[],weight:0,top:window.NaN}),a=this.g[a],a.mf.push(d),a.weight+=d.weight;for(d=h=0;d<this.g.length;d++)for(a=this.g[d],c=0;c<a.mf.length;c++)a.mf[c].id=h++;this.u(4);$.bq(this,"sankey",
"data")}};$.g.ej=function(){return!this.aa().Eb()};$.g.Ne=function(){return[]};$.g.Po=function(){this.Ya().X()};$.g.wB=function(a,b){if(!this.U||b)this.U=new $.$u;var c={};TP(c,a);if(a.type!=QP){var d=this.aa();d.select(a.Hi);this.U.lg(d)}else this.U.lg(null);return $.Lt(this.U,c)};$.g.vB=function(a){this.jl||(this.jl=new $.$u);var b={};a=a.element;TP(b,a);if(a.type!=QP){var c=this.aa();c.select(a.Hi);this.jl.lg(c)}else this.jl.lg(null);return $.Lt(this.jl,b)};
$.g.Oca=function(a,b){return{x:a[b].x,y:a[b].y}};$.g.rV=function(a){return{x:(a.left+a.right)/2,y:a.topCenter}};$.g.cg=function(a){var b=a.domTarget,c=b.tag;if(c){var d=c.element.type;d==QP?(d=this.f.Ya(),XP(this,b,$.ln,"left-bottom","right-bottom",this.Oca)):d==SP?(d=this.b.Ya(),YP(this,b,$.ln)):(d=this.o.Ya(),ZP(this,b,$.ln));$.iv(d,a.clientX,a.clientY,this.vB(c))}else this.Ya().Wc()};
$.g.rg=function(a){a=a.domTarget;var b=a.tag;this.Ya().Wc();b&&(b=b.element.type,b==QP?XP(this,a,$.Wk,"center-bottom","center-bottom",this.rV):b==SP?YP(this,a,$.Wk):ZP(this,a,$.Wk))};$.g.DQ=function(a){var b=[];$.W(a,8192)&&b.push("appearance");$.W(a,4096)&&(a=a.target.Qa()==QP,b.push(a?"nodelabels":"flowlabels"));$.aq(this,"sankey",b,1)};$.g.SJ=function(a){this.o||(this.o=new NP(this,fQ),$.V(this,"dropoff",this.o),this.o.eg(),$.L(this.o,this.DQ,this));return $.p(a)?(this.o.K(a),this):this.o};
$.g.hK=function(a){this.b||(this.b=new NP(this,SP),$.V(this,"flow",this.b),this.b.eg(),$.L(this.b,this.DQ,this));return $.p(a)?(this.b.K(a),this):this.b};$.g.node=function(a){this.f||(this.f=new NP(this,QP),$.V(this,"node",this.f),this.f.eg(),$.L(this.f,this.DQ,this));return $.p(a)?(this.f.K(a),this):this.f};
$.g.Yb=function(a){if($.K(a,$.xr))return this.Hc($.xr,a),this;if($.K(a,$.ur))return this.Hc($.ur,a),this;$.D(a)&&"range"==a.type?this.Hc($.xr):($.D(a)||null==this.Aa)&&this.Hc($.ur);return $.p(a)?(this.Aa.K(a),this):this.Aa};$.g.Hc=function(a,b){if($.K(this.Aa,a))b&&this.Aa.K(b);else{var c=!!this.Aa;$.hd(this.Aa);this.Aa=new a;$.V(this,"palette",this.Aa);this.Aa.Rp();b&&this.Aa.K(b);$.L(this.Aa,this.Df,this);c&&$.$p(this,"sankey","appearance",1)}};
$.g.Df=function(a){$.W(a,2)&&$.$p(this,"sankey","appearance",1)};$.g.me=function(a){var b=a.element;a=a.element.type;var c=this.Yb();return a==QP?{id:b.id,name:b.name,sourceColor:c.ic(b.id),conflict:b.GP}:a==SP?{from:b.from.name,to:b.uf.name,sourceColor:c.ic(b.from.id)}:{from:b.from.name,sourceColor:c.ic(b.from.id)}};var QP=0,SP=1,fQ=2,Yea={0:"node",1:"flow",2:"dropoff"};$.g=OP.prototype;$.g.eP=function(a,b){return this.fP(a.from,b.from)};$.g.gP=function(a,b){return this.fP(a.uf,b.uf)};
$.g.fP=function(a,b){return a.ve-b.ve};$.g.yS=function(a,b){return function(c){return a*(1-c)+b*c}};
$.g.Ji=function(a){if(!this.zf()){this.mb();this.ta||(this.ta=this.Ua.Nd(),this.ta.zIndex(30),this.node(),this.hK(),this.SJ());if(this.J(4)){this.ta.Ti();this.f.labels().u(2);this.b.labels().u(2);this.o.labels().u(2);this.N=[];this.ba=[];this.P=[];this.ga=[];var b=this.i("nodePadding"),c=this.i("nodeWidth");if(this.g.length){var d=this.g.length;var e=a.width/d;c=$.M(c,e);e=.3*c}else c=e=d=0;var f,h=[];for(f=0;f<this.g.length;f++){var k=this.g[f];var l=k.mf;var m=l[l.length-1].mF?e:0;l=(a.height-m-
b*(l.length-1))/k.weight;h.push(l)}this.la=Math.min.apply(null,h);b=(a.width-c)/(d-1);for(f=0;f<this.g.length;f++)for(k=this.g[f],l=k.mf,k=0;k<l.length;k++)d=l[k],d.Zj=a.left+d.level*b,d.$j=d.Zj+c,d.ve=a.top+k,d.af=d.ve+d.weight*this.la;for(var n in this.D)l=this.D[n],l.height=l.weight*this.la;aQ(this,a);l=1;for(f=32;0<f;--f)l*=.99,$ea(this,l),aQ(this,a),Zea(this,l),aQ(this,a);for(v in this.mf)d=this.mf[v],d.Jx.sort(this.gP),d.wx.sort(this.eP);for(v in this.mf){d=this.mf[v];var q=b=d.ve;for(f=0;f<
d.Jx.length;f++)l=d.Jx[f],l.ve=q+l.height/2,q+=l.height;for(f=0;f<d.wx.length;f++)l=d.wx[f],l.af=b+l.height/2,b+=l.height}for(v in this.mf)d=this.mf[v],k=this.ta.path(),k.zIndex(3),this.ba.push(k),k.tag={element:d},d.path=k,d.Zj=$.O($.Kl(d.Zj,4),1),d.ve=$.O($.Kl(d.ve,4),1),d.$j=$.O($.Kl(d.$j,4),1),d.af=$.O($.Kl(d.af,4),1),k.moveTo(d.Zj,d.ve).lineTo(d.$j,d.ve).lineTo(d.$j,d.af).lineTo(d.Zj,d.af).lineTo(d.Zj,d.ve).close();d=this.i("curveFactor");for(n in this.D)if(l=this.D[n],l.uf){k=this.ta.path();
k.zIndex(1);this.P.push(k);k.tag={element:l};l.path=k;a=l.from.$j;f=l.uf.Zj;q=l.ve;b=l.af;m=this.yS(a,f);h=m(d);m=m(1-d);var r=l.height/2;l.left=a;l.right=f;l.topCenter=(q+b)/2-r;l.leftTop={x:a,y:q-r};l.rightTop={x:f,y:b-r};var t=q-r,u=b-r;q+=r;b+=r;k.moveTo(a,t).fk(h,t,m,u,f,u).lineTo(f,b).fk(m,b,h,q,a,q).lineTo(a,t);3>l.height&&(k=this.ta.path(),k.zIndex(2),this.ga.push(k),k.fill($.Rk).stroke($.Rk,3),k.moveTo(a,t).fk(h,t,m,u,f,u).lineTo(f,b).fk(m,b,h,q,a,q).lineTo(a,t),k.tag={element:l})}else b=
l.from.mF*this.la,m=Math.min(b,c/4),a=l.from.$j,f=a+m,h=l.from.af,b=h-b,k=this.ta.path(),k.zIndex(1),this.N.push(k),k.tag={element:l},l.path=k,l.Zfa=f,l.$fa=h,k.moveTo(a,b).arcTo(m,m,-90,90),b+m<h&&k.lineTo(f,h),k.lineTo((a+f)/2,h+e).lineTo(a,h).close();$.aq(this,"sankey",["appearance","nodelabels","flowlabels"]);this.I(4)}$.cq(this,"sankey","appearance")&&(bQ(this,this.ba,this.f),bQ(this,this.P,this.b),bQ(this,this.N,this.o),$.bq(this,"sankey","appearance"));if($.cq(this,"sankey","nodelabels")){l=
this.f.labels();l.clear().O(this.ta).zIndex(3);for(var v in this.mf)d=this.mf[v],a=d.id,c=this.wB(d,!0),e=UP(this,d,$.Wk),d.label=l.add(c,e,a),this.Qd(this.f,d,$.Wk);l.X();this.f.GG();$.bq(this,"sankey","nodelabels")}if($.cq(this,"sankey","flowlabels")){v=this.b.labels();f=this.o.labels();v.clear().O(this.ta).zIndex(3);f.clear().O(this.ta).zIndex(3);for(n in this.D)l=this.D[n],a=$.N(n),d=l.uf,c=this.wB(l,!0),d?(e={value:this.rV(l)},l.label=v.add(c,e,a),l.label.Dk("center-bottom")):(e={value:{x:l.Zfa,
y:l.$fa}},l.label=f.add(c,e,a),l.label.Dk("left-center")),this.Qd(d?this.b:this.o,l,$.Wk);v.X();f.X();this.b.GG();this.o.GG();$.bq(this,"sankey","flowlabels")}}};
$.g.Qd=function(a,b,c){var d=b.label;if(d){var e=this.aa();a.Qa()==QP?e.reset():e.select(b.Hi);b=e.get("normal");b=$.p(b)?b.label:void 0;var f=e.get("hovered");f=$.p(f)?f.label:void 0;b=$.On(b,e.get("label"),null);e=$.On(f,e.get("hoverLabel"),null);e=c?e:null;f=c?a.lb().labels():null;var h=a.Ta().labels();c=c?a.lb().labels().ma:null;var k=a.Ta().labels().ma,l=e&&$.p(e.enabled)?e.enabled:null,m=b&&$.p(b.enabled)?b.enabled:null,n=f&&null!==f.enabled()?f.enabled():null,q=h&&null!==h.enabled()?h.enabled():
null;a=!1;null!=l?a=l:null!=m?a=m:null!=n?a=n:a=q;a?(d.enabled(!0),d.state("labelOwnSettings",d.La,0),d.state("pointState",e,1),d.state("pointNormal",b,2),d.state("elementState",f,3),d.state("elementNormal",h,4),d.state("elementStateTheme",c,5),d.state("auto",d.sd,6),d.state("elementNormalTheme",k,7)):d.enabled(!1);d.X()}};$.g.et=function(){return[this]};$.g.xF=function(){return["from","to","weight"]};
$.g.F=function(){var a=OP.B.F.call(this);a.data=this.data().F();a.tooltip=this.Ya().F();a.palette=this.Yb().F();a.dropoff=this.SJ().F();a.flow=this.hK().F();a.node=this.node().F();$.Bp(this,eQ,a);return{chart:a}};$.g.Y=function(a,b){OP.B.Y.call(this,a,b);"data"in a&&this.data(a.data);this.Yb(a.palette);"tooltip"in a&&this.Ya().ja(!!b,a.tooltip);"dropoff"in a&&this.SJ().ja(!!b,a.dropoff);"flow"in a&&this.hK().ja(!!b,a.flow);"node"in a&&this.node().ja(!!b,a.node);$.tp(this,eQ,a,b)};
$.g.R=function(){$.jd(this.Aa,this.o,this.b,this.f,this.fb,this.N,this.ba,this.P,this.ga,this.na,this.ed);this.fb=this.f=this.b=this.o=this.Aa=null;this.N.length=0;this.ba.length=0;this.P.length=0;this.ga.length=0;this.Md=this.ed=this.na=null;OP.B.R.call(this)};var gQ=OP.prototype;gQ.getType=gQ.Qa;gQ.data=gQ.data;gQ.noData=gQ.zm;gQ.tooltip=gQ.Ya;gQ.dropoff=gQ.SJ;gQ.flow=gQ.hK;gQ.node=gQ.node;gQ.palette=gQ.Yb;$.Fo.sankey=cQ;$.F("anychart.sankey",cQ);}).call(this,$)}