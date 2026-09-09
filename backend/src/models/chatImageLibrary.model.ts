import { Schema, model } from 'mongoose';
const image = new Schema({ name: {type:String,required:true}, dataUrl: {type:String,required:true} });
export const ChatImageLibrary = model('ChatImageLibrary', new Schema({
  guildId: {type:String,required:true,unique:true}, images: {type:[image],default:[]}
}, {timestamps:true}));
