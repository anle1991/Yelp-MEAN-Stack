var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var sendJsonResponse = function (res, statusCode, content) {
    res.status = statusCode;
    res.json(content);
};

// Create new subdocument
module.exports.reviewsCreate = function (req, res) {
    var locationid = req.params.locationid;
    if (locationid) {
        Loc
            .findById(locationid)
            .select('reviews')
            .exec(
                function (err, location) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        doAddReview(req, res, location);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid required"
        });
    }
};

var doAddReview = function (req, res, location) {
    if(!location){
        sendJsonResponse(res,404,{
            "message": "locationid not found"
        });
    }else{
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });

        location.save(function (err, location) {
            var thisReview;
            if(err){
                sendJsonResponse(res,400,err);
            } else {
                doSetAverageReview(location);
                thisReview = location.reviews[location.reviews.length - 1];
                sendJsonResponse(res,201,thisReview);
                console.log("Posted review");
            }
        });
    }
};

// var updateAverageRating = function(locationid){
//     console.log("Update review for locationid",locationid);
//     Loc
//         .findById(locationid)
//         .select("review")
//         .exec(
//             function(err,location){
//                 if(!err){
//                     doSetAverageReview(location);
//                 }
//             }
//         );
// };

var doSetAverageReview = function (location) {
    var totalRating, averageRating, count;
    if(location.reviews && location.reviews.length > 0){
        count = location.reviews.length;
        totalRating = 0;

        for(var i = 0; i < count; i++){
            totalRating += location.reviews[i].rating;
        }

        averageRating = parseInt(totalRating / count, 10);
        location.rating = averageRating;
        location.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Average rating updated to", averageRating);
            }
        });
    }else{
        console.log("No review to update",location.reviews.length);
    }
};

module.exports.reviewsReadOne = function (req, res) {
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc.findById(req.params.locationid)
            .select('name reviews')
            .exec(function (err, location) {
                var response, review;
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                }
                else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewid);
                    console.log("Review id: ", req.params.reviewid);
                    console.log("Location content", location);
                    console.log("Review content:", review);
                    if (!review) {
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        response = {
                            location: {
                                name: location.name,
                                id: req.params.locationid
                            },
                            review: review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                }
                else {
                    sendJsonResponse(res, 404, {
                        "message": "No reviews found"
                    });
                }

            });
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "No reviewid or locationid in request"
        });
    }
};

module.exports.reviewsUpdateOne = function (req, res) {
    if(!req.params.locationid || !req.params.reviewid){
        sendJsonResponse(res,404,{
            "message" : "Not found, locationid and reviewid are both required"
        });
        return;
    }

    Loc.findById(req.params.locationid)
        .select('reviews')
        // Even though we only choose reviews, it actually return location contains only reviews
        .exec(
            function(err,location){
                var thisReview;

                if(!location){
                    sendJsonResponse(res,404,{
                        "message":"locationid not found"
                    });
                    return;
                }else if(err){
                    sendJsonResponse(res,400,err);
                    return;
                }

                if(location.reviews && location.reviews.length > 0){
                    thisReview = location.reviews.id(req.params.reviewid);
                    if(!thisReview){
                        sendJsonResponse(res,404,{
                            "message": " reviewid not found"
                        });
                    }else{
                        thisReview.author = req.body.author;
                        thisReview.rating = req.body.rating;
                        thisReview.reviewText = req.body.reviewText;
                        location.save(function(err,location){
                            if(err){
                                sendJsonResponse(res,404,err);
                            }else{
                                doSetAverageReview(location);
                                sendJsonResponse(res,200,thisReview);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res,404,{
                        "message": "No review to update"
                    });
                }
            }
        );
};

module.exports.reviewsDeleteOne = function (req, res) {
    if(!req.params.locationid || !req.params.reviewid){
        sendJsonResponse(res, 404, {
            "message" : "Not found, location id and reviewid are both required"
        });
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(
            function(err, location){
                if(!location){
                    sendJsonResponse(res, 404,{
                        "message": "locationid not found"
                    });
                    return;
                } else if(err){
                    sendJsonResponse(res,400,err);
                    return;
                }
                if(location.reviews && location.reviews.length > 0){
                    if(!location.reviews.id(req.params.reviewid)){
                        sendJsonResponse(res,404,{
                            "message": "reviewid not found"
                        });
                    }else{
                        location.reviews.id(req.params.reviewid).remove();
                        location.save(function (err) {
                            if(err){
                                sendJsonResponse(res,404,err);
                            } else {
                                doSetAverageReview(location);
                                sendJsonResponse(res,204,null);
                            }

                        });
                    }
                } else {
                    sendJsonResponse(res,404,{
                        "message": "No review to delete"
                    });
                }
            }
        );
};