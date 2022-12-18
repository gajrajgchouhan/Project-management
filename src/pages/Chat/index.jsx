import React, { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    LoadingIndicator,
    ChannelList,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { useSelector } from "react-redux";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const sort = { last_message_at: -1 };

const MyChat = () => {
    const [client, setClient] = useState(null);
    // const [channel, setChannel] = useState(null);
    const userState = useSelector((state) => state.user);
    const user = useRef(null);

    useEffect(() => {
        async function init() {
            const chatClient = StreamChat.getInstance(apiKey);

            const res = await fetch("http://localhost:5000/auth/getProfile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${userState.user}`,
                },
            });
            const d = await res.json();
            user.current = d;

            await chatClient.connectUser(
                {
                    ...d,
                    image: "https://getstream.imgix.net/images/random_svg/FS.png",
                },
                userState.chatToken
            );

            // const channel = chatClient.channel("messaging", "my-talk", {
            //     name: "Developer Channel",
            //     members: [user.id],
            // });

            // await channel.watch();

            // setChannel(channel);
            setClient(chatClient);
        }

        init();

        if (client) return () => client.disconnectUser();
    }, []);

    if (!client) return <LoadingIndicator />;

    return (
        <Chat client={client} theme="messaging dark">
            <ChannelList
                filters={{
                    type: "messaging",
                    members: { $in: [user.current.id] },
                }}
                sort={sort}
            />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default MyChat;
