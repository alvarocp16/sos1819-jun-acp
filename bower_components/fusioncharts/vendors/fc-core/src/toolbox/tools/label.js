import Tool from'./tool';import{pluck,pluckNumber,pluckFontSize,getSuggestiveRotation,POSITION_TOP,POSITION_MIDDLE,POSITION_BOTTOM,convertColor}from'../../lib';const NORMAL='normal',DEFAULT_FONT_SIZE=10,DEFAULT_BORDER_PADDING=2,TEXT_ALIGN_OPTIONS={left:'start',right:'end',center:'middle'},TEXT_V_ALIGN_OPTIONS={top:POSITION_TOP,middle:POSITION_MIDDLE,bottom:POSITION_BOTTOM},TEXT_ROTATION_OPTIONS={0:'0',1:'270',right:'90',cw:'90',left:'270',ccw:'270'};class Label extends Tool{__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.font='Verdana, sans',a.rotateText=0}configureAttributes(a={}){super.configureAttributes(a);let b=this,c=b.config;c.font=pluck(a.font,c.font),c.fontSize=pluckFontSize(a['font-size'],a.fontSize,DEFAULT_FONT_SIZE)*c.scale,c.fontStyle=pluck(a['font-style'],a.fontStyle,NORMAL),c.fontWeight=pluck(a['font-weight'],a.fontWeight,NORMAL),c.rotateText=pluckNumber(a.rotateText,c.rotateText),c.rotateAngle=parseFloat(TEXT_ROTATION_OPTIONS[pluck(a.rotateAngle&&a.rotateAngle.toLowerCase(),'0')])}getTextBound(){let a=this,b=a.config,c=[];return b.showTextBound&&(c=[convertColor(b.fill),b.borderColor,b.borderThickness,DEFAULT_BORDER_PADDING,b.radius]),c}getLogicalSpace(){let a,b=this,c=b.getFromEnv('smartLabel'),{width:d,height:e,marginTop:f,marginLeft:g,marginRight:h,marginBottom:i}=b.config;return a=c.getOriSize(b.config.text,!1),d=a.width,e=a.height,{width:d,height:e,marginTop:f,marginLeft:g,marginRight:h,marginBottom:i}}draw(){let a,b=this,c=b.config;c.text&&(a={x:c.x,y:c.y,text:c.text,fill:convertColor(c.labelFill),"text-bound":b.getTextBound(),"font-style":c.fontStyle,"font-weight":c.fontWeight,"font-family":c.font,"font-size":c.fontSize,"text-anchor":TEXT_ALIGN_OPTIONS[c.hAlign],"vertical-align":TEXT_V_ALIGN_OPTIONS[c.vAlign],transform:c.rotateText?getSuggestiveRotation(c.rotateAngle,c.x,c.y):'t0,0'},!c.isHidden&&b.addGraphicalElement({el:'text',attr:a,component:b,container:{id:'group',label:'group',isParent:!0},label:'text',id:'label'}))}}export default Label;