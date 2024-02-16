import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import ChatFaceData from '../services/ChatFaceData';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navgitaion = useNavigation();

    const [chatFaceData,setChatFaceData]=useState([]);
    const [selectedChatFace,setSelectedChatFace]=useState([]);
    useEffect(()=>{
      setSelectedChatFace(ChatFaceData[0]);
        setChatFaceData(ChatFaceData)
    },[]) 
    const onChatFacePress=(id)=>{
        const chatFace=chatFaceData.find((item)=>item.id==id);
        setSelectedChatFace(chatFace);
    }




  return (
    <View style={{alignItems:'center',paddingTop:90}}>
      <Text style={[{color:selectedChatFace?.primary}, {fontSize:30,}]}>Hello,</Text>
      <Text style={[{color:selectedChatFace?.primary}, {fontSize:30,fontWeight:'bold'}]}>I am {selectedChatFace.name} GPT</Text>
        <Image source={{uri:selectedChatFace.image}} 
        style={{height:150,width:150,marginTop:20}}/>
    <Text style={{marginTop:30,fontSize:15,marginHorizontal:15}}>{
        selectedChatFace.quote
    
    }</Text>

    <View style={{marginTop:20,backgroundColor:'#F5F5F5',
    alignItems:'center',
    height:110,padding:10
,borderRadius:10}}>
        <FlatList
        data={chatFaceData}
        horizontal={true}
        renderItem={({item})=>item.id!=selectedChatFace.id&&(
            <TouchableOpacity style={{margin:15}} onPress={()=> 
            onChatFacePress(item.id)
           }>
            <Image source={{uri:item.image}} style={{width:40,height:40}} />
        </TouchableOpacity> 
        )}
        />
        <Text style={{marginTop:5,fontSize:17,color:'#B0B0B0'}}>Choose Your Fav Startup Mentor</Text>
    </View>
    <TouchableOpacity style={[{backgroundColor:selectedChatFace.primary}
        ,{marginTop:40,padding:17,width:Dimensions.get('screen').width*0.6,
         borderRadius:100,alignItems:'center'}]} 
         onPress={()=>navgitaion.navigate('chat',{selectedChatFace:selectedChatFace})}>
        <Text style={{fontSize:16,color:'#fff'}}>Let's Chat</Text>
    </TouchableOpacity>
    </View>
  )
}