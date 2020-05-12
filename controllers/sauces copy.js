const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    // const thingObject = JSON.stringify(req.body.thing);

    console.log(req.body.sauce);
    // delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.likes = 0
    thing.dislikes = 0
    thing.usersLiked = [];
    thing.usersDisliked = [];

    console.log(thing);
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// mongoose.set('useFindAndModify', false);


exports.likeThing = (req, res, next) => {
    console.log("userId : " + req.body.userId);
    console.log("like : " + req.body.like);
    console.log('sauceId : ' + req.params.id)
    // console.log(req.body.sauce)
    const like = req.body.like
    // if (like == 1) {
    switch (req.body.like) {
        case 1:


            console.log ('like = +1');

            Thing.findOneAndUpdate({
                _id: req.params.id
                // }, { $addToSet: { usersLiked: req.body.userId,  usersDisliked: req.body.userId  } })
            }, { $addToSet: { usersLiked: req.body.userId }, $inc: { likes: 1 } })

                .then(
                    () => {
                        res.status(201).json({
                            message: 'Thing updated successfully!'
                        });
                    }
                )
                .catch(
                    (error) => {
                        res.status(404).json({
                            error: error
                        });
                    }
                );
            // } else {
            break;
        // else if  (like == -1) {
        case -1:

                console.log('like = -1')


            Thing.findOneAndUpdate({
                _id: req.params.id
            }, { $addToSet: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })
                // }, { $pull: { usersLiked: req.body.userId, usersDisliked: req.body.userId } })

                .then(
                    () => {
                        res.status(201).json({
                            message: 'Thing updated successfully!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(404).json({
                            error: error
                        });
                    }
                );
            break;


        case 0:
            console.log("warning : like's case 0");
            // Thing.findOneAndUpdate({
            //     _id: req.params.id
            // }, { $addToSet: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })
            //     // }, { $pull: { usersLiked: req.body.userId, usersDisliked: req.body.userId } })

            //     .then(
            //         () => {
            //             res.status(201).json({
            //                 message: 'Thing updated successfully!'
            //             });
            //         }
            //     ).catch(
            //         (error) => {
            //             res.status(404).json({
            //                 error: error
            //             });
            //         }
            //     );
            console.log(req.body.sauce)
            Thing.findOneAndUpdate({
                
                _id: req.params.id
                // }, { $addToSet: { usersDisliked: req.body.userId } })
                // }, { $pull: { usersLiked: req.body.userId }
            }, 
                // [{ $set: { likes: { $in: [req.body.userId, $usersLiked] } } }],
                // { multi: true }

                // }, {
                // $inc: $or : [$usersLiked : req.body.userId ]
                // [
                    // {$set:

                // { $inc: { dislikes: -2, likes: -2 }, 
               { $pull: { usersLiked: req.body.userId, usersDisliked: req.body.userId } }


                
                //     {
                //         $project:
                //             {
                //             $inc: {
                //                 likes: {
                //                 $cond: {
                //                     if: { $gte: [likes, 3] },
                //                     then: -1,
                //                     else: 0
                //                 }
                //             }
                //         }
                //     }
                // }
            
        // //    [ {
        //                {$set:
        //        {
                  
        //                     // $inc: {
        //                         likes: {
        //                         $cond: [
        //                              { $eq: [3, 3] },
        //                              -1,
        //                              50
        //                         ]
        //                     }
        //                 }
                    
        //         }

            // ]


                // }
                // ]
                // { $inc: 
                // { likes: -10 }
                // {
                //     $cond: {
                //             if: { $in: [req.body.userId, $usersLiked] },
                //             then:  { $likes: -1 }, 
                //             else: { $dislikes: -1 } 
                //          }
                // }
            )


                //    { $inc: { dislikes: -1 }})
                .then(
                    () => {
                        res.status(201).json({
                            message: 'Thing updated successfully!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(404).json({
                            error: error
                        });
                    }
                );
            break;
        default:
            console.log("rien")
        // promise.all([promi].then(
        //         () => {
        //             res.status(201).json({
        //                 message: 'Thing updated successfully!'
        //             });
        //         }
        //     ).catch(
        //         (error) => {
        //             res.status(404).json({
        //                 error: error
        //             });
        //         }
        //     );)

    }
    // else if (like == 0) {
    //     console.log('like = 0')
    //     Thing.findOneAndUpdate({
    //         _id: req.params.id
    //     }, { $pullAll: { usersLiked: req.body.userId, usersDisliked: req.body.userId } })
    //         .then(
    //             () => {
    //                 res.status(201).json({
    //                     message: 'Thing updated successfully!'
    //                 });
    //             }
    //         ).catch(
    //             (error) => {
    //                 res.status(404).json({
    //                     error: error
    //                 });
    //             }
    //         );
    // }


    // console.log('usersDisliked : ' + req.body.usersDisliked)
    // console.log(req.body.usersLiked)

    // console.log('like : ' + req.like)



    // console.log('thing : ' + thing)
    // console.log('usersLiked : '+thing.usersLiked)

    // thing.usersLiked.push(req.body.userId)
    // let updatedThing = thing


    // Thing.updateOne({ _id: req.params.id }, {updatedThing, id_: req.params.id })
    //     .then(() => {
    //        
    //     }
    //     ).catch(
    //         (error) => {
    //             res.status(400).json({
    //                 error: error
    //             });
    //         }
    //     );

    // console.log('usersLiked : ' + thing.usersLiked)

    //     res.status(201).json({
    //         message: 'Like updated successfully!'
    //     });
    // }
    // ).catch(
    //     (error) => {
    //         res.status(400).json({
    //             error: error
    //         });
    //     }
    // );

    // thing.likes = 0;

    // Thing.findOne({
    //     _id: req.params.id
    // }).then(
    //     (thing) => {
    //         res.status(200).json(thing);
    //     }
    // ).catch(
    //     (error) => {
    //         res.status(404).json({
    //             error: error
    //         });
    //     }
    // );
};

exports.modifyThing = (req, res, next) => {

    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        } : { ...req.body };

    // const thing = new Thing({
    //     _id: req.params.id,
    //     title: req.body.title,
    //     description: req.body.description,
    //     imageUrl: req.body.imageUrl,
    //     price: req.body.price,
    //     userId: req.body.userId
    // });
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, id_: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    })
            })
                .catch(error => res.status(500).json({ error }));

        }
        );
};

exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};