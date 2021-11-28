import React, {useEffect, useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import {USER_SERVER} from "../../../Config";
const { TextArea } = Input;
function SingleComment(props) {
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
            role: props.userRole
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
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
            role: props.userRole
        }

        Axios.post('/api/comment/deleteComment', variables)
            .then(response => {
                if (response.data.success) {
                    alert("comment successfully deleted");
                    setCommentValue("")
                    console.log("ARTOSIS: ", response.data.comment._id);
                    props.deleteFunction(response.data.comment._id) // communicates with MovieDetail deleteFunction method
                } else {
                    alert('Failed to delete Comment');
                }
            })
    }

    const actions = (props.userRole === 2 ? [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>,
        <span onClick={onDelete} key="delete-basic">DELETE (ADMIN ONLY)</span>
    ] : [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ])


    // users get plain comments, moderators/admins get special comments
    if (props.comment.role === '0') {
        return (
            <div>
                <Comment
                    actions={actions}
                    author={props.comment.writer.name}
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
    // moderators are "1"
    else if (props.comment.role === '1') {
        return (
            <div>
                <Comment
                    actions={actions}
                    author={<span>{props.comment.writer.name} &#x2611; (moderator)</span>}
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
                        placeholder="reply to this comment"
                    />
                    <br/>
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
                </form>
                }

            </div>
        )
    }
    // admins are '2' aka else
    else {
        return (
            <div>
                <Comment
                    actions={actions}
                    author={<span>{props.comment.writer.name} &#11088; (ADMIN)</span>}
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
                        placeholder="reply to this comment"
                    />
                    <br/>
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
                </form>
                }

            </div>
        )
    }
}

export default SingleComment
