const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk')
const bucketName = 'img-test.homes.jp'

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucketName,
    MaxKeys: 21
  }

  let data;

	try{
		data = await s3.listObjectsV2(params).promise();
	} catch (err) {
		console.log(err);
	}
	let ret = [];
	if (data.Contents) {
		data.Contents.forEach(obj => {
			let url;
			if (obj.Key && (obj.Key.endsWith('jpg') || obj.Key.endsWith('JPG'))) {
				url = `https://s3-ap-northeast-1.amazonaws.com/${bucketName}/${obj.Key}`;
				ret.push(url);
			}
		});
	}
	res.json(ret);

});

module.exports = router;
