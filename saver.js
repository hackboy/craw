/*
进行数据存储
*/
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(6379, '52.77.253.24', {});

client.on('error', function(err) {
	console.log(err);
});

//将实体数据写入redis
module.exports = async function(entiy) {
	try {
		let content = JSON.stringify(entiy);
		let result = await client.saddAsync("data", content);
	} catch (e) {
		//存储失败,直接忽略
		console.log(e);
	}
}