import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "stream-chat-react";
import { StreamClient } from "getstream";
import {
    StreamApp,
    FlatFeed,
    Feed as ActivityKiFeed,
} from "react-activity-feed";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const Feed = () => {
    const [client, setClient] = useState(null);
    const userState = useSelector((state) => state.user);
    const user = useRef(null);

    useEffect(() => {
        async function init() {
            const res = await fetch("http://localhost:5000/auth/getProfile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${userState.user}`,
                },
            });
            const d = await res.json();
            user.current = d;

            const streamFeedClient = new StreamClient(
                apiKey,
                userState.chatToken
            );

            await streamFeedClient.user(d.username).get(user.username);

            setClient(streamFeedClient);
        }

        init();

        if (client) return () => client.disconnectUser();
    }, []);

    if (!client) return <LoadingIndicator />;

    return (
        <StreamApp
            token={userState.chatToken}
            appId={"1224567"}
            apiKey={apiKey}
        >
            <ActivityKiFeed feedGroup="colab_dev">
                <FlatFeed
                    Activity={<FeedBlock />}
                    userId={user.current.username}
                />
            </ActivityKiFeed>
        </StreamApp>
    );
};

function FeedBlock({ activity }) {
    const actor = activity.actor;
    console.log(actor);
    return <div></div>;
}

export default Feed;
