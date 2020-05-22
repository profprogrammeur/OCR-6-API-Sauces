const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    console.log(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.likes = 0
    sauce.dislikes = 0
    sauce.usersLiked = [];
    sauce.usersDisliked = [];

    console.log(sauce);
    sauce.save().then(
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

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};



exports.likeSauce = (req, res, next) => {

    switch (req.body.like) {
        case 1:
            Sauce.findOneAndUpdate({
                _id: req.params.id
            }, { $addToSet: { usersLiked: req.body.userId }, $inc: { likes: 1 } })

                .then(
                    () => {
                        res.status(201).json({
                            message: 'Sauce updated successfully!'
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
            Sauce.findOneAndUpdate({
                _id: req.params.id
            }, { $addToSet: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } })


                .then(
                    (sauce) => {

                        res.status(201).json({
                            message: 'Sauce updated successfully!'
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
            Sauce.findOne({_id: req.params.id})
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId))
                    {
                        Sauce.findOneAndUpdate({ _id: req.params.id },
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
                        sauce.usersDisliked.includes(req.body.userId)
                    )
                    {
                        Sauce.findOneAndUpdate({ _id: req.params.id },
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
                        message: 'Sauce updated successfully!'
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

exports.modifySauce = (req, res, next) => {

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        } : { ...req.body };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, id_: req.params.id })
        .then(() => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
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

exports.deleteSauce= (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
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

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};