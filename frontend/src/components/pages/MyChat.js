import React, { useState, useEffect } from "react";

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

import "stream-chat-react/dist/css/index.css";

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

// Get from backend
const user = {
  id: "sarthak",
  name: "Sarthak",
  image: "https://getstream.imgix.net/images/random_svg/FS.png",
};

const filters = { type: "messaging", members: { $in: [user.id] } };
const sort = { last_message_at: -1 };

const MyChat = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel("messaging", "my-talk", {
        name: "Developer Channel",
        members: [user.id],
      });

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init();

    if (client) return () => client.disconnectUser();
  }, []);

  if (!channel || !client) return <LoadingIndicator />;

  return (
    <Chat client={client} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
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
