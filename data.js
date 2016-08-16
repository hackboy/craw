const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//如何保证只有一个连接
const client = redis.createClient(6379, '52.77.253.24', {});

client.on('error', function(err) {
	console.log(err);
});

client.smembersAsync('data').then(data=>console.log(data)).catch(err=>console.log(err));