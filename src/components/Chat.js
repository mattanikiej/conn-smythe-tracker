import React, { useEffect, useState } from "react";

import { sendChat, readChat } from "../Supabase";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";

import ChatMessage from "./ChatMessage";

import "./Chat.css";

function Chat() {
    const [open, setOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);

    async function onChatSubmit(event) {
        event.preventDefault();
        if (event.target.username.value == null ||
            event.target.chatMessage.value == null) {
                return;
            }
        sendChat(event.target.username.value, event.target.chatMessage.value);
        getChatMessages();
        event.target.reset();
    }

    async function getChatMessages() {
        const messages = await readChat();
        setChatMessages(messages);
        console.log(chatMessages);
    }

    // update chat when the chatbox is opened
    useEffect(() => {
        if (open) {
            getChatMessages();
        }
    // don't need to add getChatMessages to dependency list
    // eslint-disable-next-line
    }, [open]);

    return (
        <div className="chat-wrapper">
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Card className="chat-card">
                        {chatMessages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                username={message.username}
                                chat={message.chat}
                                time={message.created_at}
                            />
                        ))}
                        <form className="chat-input" onSubmit={onChatSubmit}>
                            <input
                                type="text"
                                placeholder="Chat Name"
                                name="username"
                                required={true}
                            ></input>
                            <textarea
                                placeholder="Chat Message"
                                name="chatMessage"
                                required={true}
                            ></textarea>
                            <input type="submit" value="Send Chat"></input>
                        </form>
                    </Card>
                </div>
            </Collapse>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="chat-button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-chat"
                    viewBox="0 0 16 16"
                >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                </svg>
            </Button>
        </div>
    );
}

export default Chat;