import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import getResponse from '../services/GlobalAPI'

const Chat = () => {
  const router = useRoute().params;
  const [selectedChatFace, setSelectedChatFace] = useState(router.selectedChatFace)
  const [messages, setMessages] = useState([])


  const [loading,setLoading] = useState(true)
  const [intialLoad,setIntialLoad] = useState(true)

  useEffect(() => {
    setSelectedChatFace(router.selectedChatFace)
    setTimeout(() => {
    setIntialLoad(false)
    }, 1000);
  },[])

  useEffect(()=>{
    console.log(selectedChatFace)
    setMessages([
      {
        _id: 1,
        text: `Hello Founder! I'm ${router.selectedChatFace.name} GPT and I'm here to mentor you.`,
        createdAt: new Date(), 
        user: {
          _id: 2,
          name: selectedChatFace?.name,
          avatar: selectedChatFace?.image,
        },
      },
    ])
  },[intialLoad])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),

    )
    response(messages[0].text)


  }, [])


  const response = async (userMsg) => {
    setLoading(true)
    const data = await getResponse(selectedChatFace.name, userMsg)

    if(data.data.data.title){
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: Math.floor(Math.random() * 1000000),
          text: data.data.data.title,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: selectedChatFace.name,
            avatar: selectedChatFace.image,
          },
        }),
      )
    setLoading(false)
    }
    else{
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: Math.floor(Math.random() * 1000000),
          text: "Sorry, I am not able to understand your query. Please try again.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: selectedChatFace.name,
            avatar: selectedChatFace.image,
          },
        }),
      )
    setLoading(false)

    }
    
  }


  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      {
        intialLoad ? <Text style={{textAlign:'center',marginTop:20,fontSize:20,fontWeight:'bold'}}>Just a moment...</Text> :       <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      }

    </View>
  )
}

export default Chat