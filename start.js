/*
任务调度
*/

const schedule = require('node-schedule');
const craw = require('./dahebao.js');

//可爬取栏目id
const columnIds = [35, 37, 40, 43, 44, 46, 56, 57, 60, 61, 62, 63, 64, 66, 67, 68];
//每个栏目对应的抓取页数
const pages = new Array(columnIds.length).fill(0);

const rule = new schedule.RecurrenceRule();
rule.second = [0, 30];

const getIdAndPage = (function() {
	let count = columnIds.length;
	let index = 0;
	return function() {
		if (index > count - 1) {
			index = 0;
		}
		return [columnIds[index], pages[index++]++];
	}
})();

const j = schedule.scheduleJob(rule, function() {
	let para=getIdAndPage();
	let over = craw(para);
	//本栏目抓取完毕后，重新开始
	if(!over){
		pages[columnIds.indexOf(para[0])]=0;
	}
});