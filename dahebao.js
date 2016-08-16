/*
具体抓取
*/
const Crawler = require("crawler");
const url = require('url');
const rp = require('request-promise');
const save = require('./saver');

//可用js模板字符串代替
const BASE = "http://dhapi.dahebao.cn/news/getNews?columnId="
const PAGE = "&columnType=1&cityId=0&size=50&page=";
const TAIL = "&v=4.0.6&ty=a&appid=1234567890&dt=357432472082994&tn=";

function getSingleUrl(id, page) {
	return BASE + id + PAGE + page + TAIL;
}

//根据栏目id获取该栏目下所有数据，进行页数进行爬取限制
async function getColumnUrls([id, page]) {
	console.log(id, page);
	const url = getSingleUrl(id, page);
	let content = await rp(url);
	let info = JSON.parse(content);
	//判断数据是否抓取完毕
	if (info.pageSize > 0) {
		//解析数据
		info.data.forEach(item => {
			let entiy = parseContent(item);
			getContentByUrl(entiy.contentLink);
		});
		return true;
	}
	return false;
}

const parseContent = content => {
	let contentLink = content.contentLink;
	let title = content.title;
	//进一步处理
	return {
		contentLink,
		title
	};
}

//根据url进行内容获取
function getContentByUrl(url) {
	c.queue(url);
}

const c = new Crawler({
	maxConnections: 10,
	// This will be called for each crawled page
	callback: function(error, result, $) {
		if (!error) {
			//该内容url来源
			let from = result.uri;
			let content = $('#content_detail_div').text().trim();
			let title = $('#press_detail_main_div>.title-font-color').text();
			//写入数据库
			if (title) {
				save({
					title,
					from,
					content
				});
			}
		}
	}
});

module.exports = getColumnUrls;