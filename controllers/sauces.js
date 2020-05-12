const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);

    console.log(req.body.sauce);
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



exports.likeThing = (req, res, next) => {

    switch (req.body.like) {
        case 1:
            Thing.findOneAndUpdate({
                _id: req.params.id
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
            break;
        case -1:
            Thing.findOneAndUpdate({
                _id: req.params.id
            }, { $addToSet: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })


                .then(
                    (thing) => {

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
            Thing.findOne({_id: req.params.id})
                .then(thing => {
                    if (thing.usersLiked.includes(req.body.userId))
                    {
                        Thing.findOneAndUpdate({ _id: req.params.id },
                            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                            .then(
                                () => {
                                    res.status(201).json({
                                        message: 'Updated!'
                                    });
                                    // console.log("Not Liked")
                                }
                        ).catch(
                            (error) => {
                                // res.status(404).json({
                                //     error: error
                                // });
                                console.log("Not Liked")

                            }
                        );
                            
 
                    } else if(
                        thing.usersDisliked.includes(req.body.userId)
                    )
                    {
                        Thing.findOneAndUpdate({ _id: req.params.id },
                            { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                            .then(
                                () => {
                                    res.status(200).json({
                                        message: 'Updated!'
                                    });
                                }
                        ).catch(
                            (error) => {
                            //     res.status(404).json({
                            //         error: error
                            //     });
                            console.log("Not disLiked")
                            }
                        );
                    } 
  
                    res.status(201).json({
                        message: 'Thing updated successfully!'
                    });

                })
                .catch((error) => {res.status(404).json({error: error});
                }
            );
     
            break;
        default:
            console.log("rien")
    }
};

exports.modifyThing = (req, res, next) => {

    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        } : { ...req.body };

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
                Thing.deleteOne({ _id: req.params.id })
                .then(
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