import React, {useEffect, useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import {USER_SERVER} from "../../../Config";
const { TextArea } = Input;


const SingleComment = (props) => {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
            role: props.userRole,
            isDeleted: false
        }

        alert("Comment from SingleComment.js saved")

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const onDelete = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: "COMMENT DELETED BY ADMIN",
            role: props.userRole,
            // No need to pass isDeleted: true (because isDeleted is changed in the server)
        }

        axios.post('/api/comment/deleteComment', variables)
            .then(response => {
                if (response.data.success) {
                    alert("comment successfully deleted");
                    setCommentValue("") // should be able to delete this
                    console.log("ARTOSIS: ", response.data.comment._id);
                } else {
                    alert('Failed to delete Comment');
                }
            })
    }

    // if user is admin (ie props.userRole === 2), then they have the option to delete comments
    let actions = (props.userRole === 2 ? [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>,
        <span onClick={onDelete} key="delete-basic">DELETE (ADMIN ONLY)</span>
    ] : [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ])

    // if admin deleted this comment, then we should not be able to upvote, downvote, reply, etc
    if (props.comment.isDeleted) {
        actions = null
    }

    console.log("props!", props.comment)

    const commentFlair = [
        props.comment.writer.name, // users are commentFlair[0]
        <span>{props.comment.writer.name} &#x2611; (Premium User)</span>, // moderators are commentFlair[1]
        <span>{props.comment.writer.name} &#11088; (ADMIN)</span> // admins are commentFlair[2]
    ]



    // users get plain comments, premium users/admins get special comments
    // if props.comment.role == '0', they are a user
    // if props.comment.role == '1', they are a premium user
    // if props.comment.role == '2', they are an admin
    return (
        <div>
            <Comment
                actions={actions}
                author={commentFlair[props.comment.role]}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="write some comments"
                />
                <br/>
                <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
            </form>
            }

        </div>
    )
}

export default SingleComment
