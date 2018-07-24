
var fs = require('fs');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var params =
{
    Bucket : "felclcert",
    Key : "Documents/Issued/03012512-6/DTE/33/2016/08/06/4e69b8ee-dc3c-4a62-af66-c1db76a4957b/33_03012512-6_1000_20160806_4e69b8ee-dc3c-4a62-af66-c1db76a4957b.xml"
};

s3.getObject(params, (err, data) =>
{

    if (err)
    {
        console.error(err);
        return;
    }

    fs.writeFile('archivo.xml', data.Body, (err) =>
    {
        if (!err) return;
        console.error(err);
    })
    
    console.log(data);

});

