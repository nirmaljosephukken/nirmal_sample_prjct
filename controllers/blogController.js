const Post = require('../models/postModel');

exports.showPosts = (req , res , next) =>{
    const posts = Post.find()
    .then(posts =>{
        res.status(200).json({
            posts: posts,
            userId: req.userId
        });
    })
    .catch(err =>{
        console.log(err);
    });

};


exports.createPost = (req , res, next) => {

    const teachername = req.body.teachername;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const post = new Post({
        teachername: teachername,
        designation: designation,
        subject: subject
    });

    post.save()
    .then(result =>{
        res.status(201).json({
            message:'Post saved successfully',
        });
    })

    .catch(err => {
        console.log(err);
    });


};


exports.editPost = (req , res, next) => {

    const postId = req.params.postId;

    const teachername = req.body.teachername;
    const designation = req.body.designation;
    const subject = req.body.subject;

    const post = Post.findById(postId)
    .then(post =>{
        if(!post){
            res.status(501).json({
                message:'No posts found with the provided id.'
            });
        }
        post.teachername= teachername;
        post.designation= designation;
        post.subject= subject;

        return post.save();
    })

    .then(post =>{
        res.status(200).json({
            message:'Post edited successfully',
        });
    })
    .catch(err => {
        console.log(err);
    });


};


exports.deletePost = (req , res, next) => {

    const postId = req.params.postId;

    const post = Post.findById(postId)
    .then(post =>{
        if(!post){
            res.status(501).json({
                message:'No posts found with the provided id.'
            });
        }

        return Post.findByIdAndDelete(postId);
    })

    .then(post =>{
        res.status(200).json({
            message:'Post deleted successfully',
            post: post
        });
    })
    .catch(err => {
        console.log(err);
    });


};
