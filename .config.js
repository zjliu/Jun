var nodeConfig={
	"port": 3000,
	"home":"/web",
	"userConfig":"/config.js",
	"userRewrite":"/rewrite.js"
}
function getConfig(key){
	return nodeConfig[key];
}
exports.getConfig=getConfig;
