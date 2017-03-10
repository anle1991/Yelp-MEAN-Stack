/* GET home page */
module.exports.about = function(req,res){
	res.render('generic-text', {
		title: 'About',
		content: 'Loc8r was created to help people find places to sit down and ' +
		'get a bit of work done.'
	});
};

module.exports.angularApp = function(req,res){
	res.render('layout', {title: 'Loc8r Angular'});
};