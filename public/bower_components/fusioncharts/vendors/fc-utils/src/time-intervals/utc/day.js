import TimeInterval from'../time-interval.js';import{durationDay}from'../durations.js';const utcDay=new TimeInterval('day',a=>a.setUTCHours(0,0,0,0),(a,b)=>a.setUTCDate(a.getUTCDate()+b),(a,b)=>(b-a)/durationDay,a=>a.getUTCDate()-1);export default utcDay;