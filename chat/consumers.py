import django
django.setup()
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from userprofiles.models import Profile
from .models import Message
from hometweet.models import Notification, Post
from user.models import CustomUser
from datetime import datetime
# import pytz
from tzlocal import get_localzone
from django.db.models import Q

connected_users = []
mutual_friends = set()
total_mutual_friends = set()

# class ChatConsumer(WebsocketConsumer):
#     def connect(self):
#         self.room_group_name = 'test'

#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         print("your mother")
#         self.accept()   


#     def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']

#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 'type':'consumer_message',
#                 'message':message
#             }
#         )



class OnlineConsumer(WebsocketConsumer):
    connected_clients = {}
    def connect(self):
        self.personal_mutual_friend = set()
        self.room_name = 'onlineusers'
        self.group= None
        self.group2 = None
        onlineUser = self.scope["user"].username
        self.room_group_name = f'chat_{self.room_name}'
        self.room_group_name2 = f'onlineuser_{onlineUser}'

        self.connected_clients[self.scope["user"].username] = self.channel_name

        user = self.scope["user"]
        total_mutual_friends.add(user.username)
        profile= Profile.objects.get(user=user)
        friends=profile.friends.all()
        if friends.exists():
            self.personal_mutual_friend.clear()
            for i in friends:
                self.personal_mutual_friend.add(i.username)
        else:
            self.personal_mutual_friend.clear()
        
        if user.is_authenticated:
            details={
                    "user":user.email,
                    "username":user.username,
                    # "id":user.id,
                    "pics":user.prof_pics.url,
                }
            if details not in connected_users:
                connected_users.append(details) 

        self.accept()

        self.send(text_data=json.dumps({
            "type":"online",
            "message":connected_users,
            "friends":list(self.personal_mutual_friend)
        }))

        name=self.scope["user"].username
        person = CustomUser.objects.get(username= name)
        for x in self.personal_mutual_friend:
            # print(self.connected_clients)
            # print(total_mutual_friends)
            # print(self.personal_mutual_friend)
            # print("self.personal_mutual_frind")
            if x in self.connected_clients:
                print(x)
                self.group2 = self.connected_clients[x]
                async_to_sync(self.channel_layer.send)(           
                    self.group2,
                    {
                        "type":"send_online",
                        "name":person.username,
                        "pics":person.prof_pics.url,
                        "online": list(total_mutual_friends)
                    }               
                )
           
        
        
    def disconnect(self, close_code):
        
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name,
        )
        
    def receive(self, text_data=None, bytes_data=None):
        # user_timezone = get_localzone()
        # date= datetime.now(user_timezone)
        # # formatted_date= datetime.strptime(date, "%Y-%m-%d %H:%M")
        # formatted_date_str= date.strftime("%a at %H:%M")
        text_data_json = json.loads(text_data)
        postId= None
        sender= None
        message= text_data_json["message"]
        receiver_username = text_data_json.get('receiver')
        sender= text_data_json["sender"]
        # print(text_data_json)
        senderreceiver= CustomUser.objects.get(username= receiver_username)

        try:
            if text_data_json["type"] == "likepost":
                postId= text_data_json["postId"]
                post= Post.objects.get(id= postId)
                senderUser= CustomUser.objects.get(username= sender)
                if self.scope["user"].username != receiver_username:
                    notification = Notification.objects.create(content=json.dumps(message), postId=post, sender=senderUser, seen= False, receiver=senderreceiver)
                    notification.save()
        
        except:
            senderUser= CustomUser.objects.get(id= sender)
            notification = Notification.objects.create(content=json.dumps(message), sender=senderUser, seen= False, receiver=senderreceiver)
            notification.save()

        print("text_data_json")
        print(text_data_json)
        if receiver_username:           
            if receiver_username in self.connected_clients:
                print(self.connected_clients)
                print(text_data_json["type"] == "loggedout")
                print(text_data_json["type"] == "likepost")
                print(text_data_json["type"] == "friendrequest")
                receiver_channel_name = self.connected_clients[receiver_username]
                self.group= receiver_channel_name
                if self.scope["user"].username == receiver_username: 
                    if text_data_json["type"] == "loggedout":
                        print("loggedout")
                        user= CustomUser.objects.get(username= sender)           
                        disconnectUsername = user.username
                        
                        if disconnectUsername in self.connected_clients:
                            del self.connected_clients[disconnectUsername]
                        else:
                            pass
                        total_mutual_friends.discard(disconnectUsername)
                        
                        for i in self.personal_mutual_friend:
                            if i in self.connected_clients:
                                self.group2 = self.connected_clients[i]
                                async_to_sync(self.channel_layer.send)(           
                                    self.group2,
                                    {
                                        "type":"send_logout",
                                        "sender":disconnectUsername,
                                        "friends":list(self.personal_mutual_friend)
                                    }               
                                )
                


                            # async_to_sync(self.channel_layer.send)(           
                            # self.group,
                            # {
                            #     'type': 'send_add_message',
                            #     'message': message,
                            #     "postId": postId,
                            #     "status":"post"
                            # }
                            # )
                    
                else:
                    if text_data_json["type"] == "likepost":             
                        async_to_sync(self.channel_layer.send)(           
                        self.group,
                        {
                            'type': 'send_like_message',
                            'message': message,
                            "sender": sender,
                            "status":"like"
                        }
                    )
                    
                    elif text_data_json["type"] == "friendrequest":
                        async_to_sync(self.channel_layer.send)(           
                            self.group,
                            {
                                'type': 'send_add_message',
                                'message': message,
                                "postId": postId,
                                "status":"post"
                            }
                        )
            else:
                userAccount= CustomUser.objects.get(username=receiver_username)                
                userAccount.notifications+=1
                userAccount.save(update_fields=["notifications"])
                print("word")
       
     
    def send_like_message(self, event):
        self.send(text_data=json.dumps(event))
        print("like")


    def send_add_message(self, event):
        self.send(text_data=json.dumps(event))

    def send_logout(self, event):
        self.send(text_data=json.dumps(event))
        print("send_logout")

    def send_online(self, event):
        self.send(text_data=json.dumps(event))
        print("send_online")



class TryConsumer(WebsocketConsumer):
    state= False
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = None
        self.room_name2 = None
        self.room_group_name = None
        self.room_group_name2 = None
        self.receiver= None
        self.room = None
        self.state = False

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']        
        self.room_group_name = f'chat_{self.room_name}'
        uniqueId=None
        general = self.scope['url_route']['kwargs']
        

        if "receiver" in general:
            self.state = True
            self.receiver = self.scope['url_route']['kwargs']["receiver"]
            self.receiver=f'chat_{self.receiver}'
            gorup_name = self.receiver + self.room_name
            try:
                reversed_string = gorup_name[::-1]
                uniqueId = Message.objects.get(Q(uniqueId__icontains=gorup_name) | Q(uniqueId__icontains=reversed_string))
                self.room_group_name2=uniqueId.uniqueId
            except Message.DoesNotExist:
                uniqueId = gorup_name
                self.room_group_name2 = uniqueId 
        
        user=self.scope['user']
    
        if user.is_authenticated:    
            self.accept()
            self.scope['session']['websocket_connected']=True
            self.scope['session'].save()
        else:
            self.close()

        message=None
        previousMessage = Message.objects.filter(uniqueId__icontains=str(user.username))
        if previousMessage.exists():
            for i in previousMessage:
                result=json.loads(i.content)
                message=result.copy()
        
        self.send(text_data=json.dumps({
            "type":"initialmessage",
            "message":message,
            "user":user.username,
            "online": list(total_mutual_friends) 
        }))

        # join the room group1       
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )
       
       
        if self.state==True:
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name2,
                self.channel_name,
            )
    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name,
        )
        if self.state:
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name2,
                self.channel_name,
            )
       

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        userfrontend = text_data_json['user']
        receiver = text_data_json['receiver']
        user = self.scope["user"]
        receiverProfile = text_data_json['receiver']
        modelUser= CustomUser.objects.get(username=receiverProfile)
        receiverProfile2= Profile.objects.get(user=modelUser.id)
        userProfile= Profile.objects.get(user=user.id)
        user_timezone = get_localzone()
        date= datetime.now(user_timezone)
        formatted_date_str= date.strftime("%a at %H:%M")

        print(text_data_json)
        content={userfrontend:message, "time":formatted_date_str}
        c = []  # Initialize the list here

        # print(text_data_json)
       
        if text_data_json['type'] == "instantmessage":
            print(text_data_json)
            previousMessagefiltered = Message.objects.filter(uniqueId__icontains=str(userfrontend)+str(receiver))
            previousMessage = Message.objects.filter(uniqueId__icontains=str(receiver)+str(userfrontend))
            if previousMessagefiltered.exists():
                for i in previousMessagefiltered:
                    result=json.loads(i.content)
                    result.append(content)
                    i.content = json.dumps(result)  # Convert the updated list back to JSON
                    i.save()
            elif previousMessage.exists():
                for i in previousMessage:
                    result=json.loads(i.content)
                    result.append(content)
                    i.content = json.dumps(result)  # Convert the updated list back to JSON
                    i.save()
            else:
                print("new message")
                c.append(content)
                messages = Message.objects.create(content=json.dumps(c), uniqueId=str(userfrontend) + str(receiverProfile), receiver=receiverProfile2, sender=userProfile, seen=False)
                messages.save()

        if receiver not in total_mutual_friends:
            # try:
            print("russia")
            if text_data_json["type"] == "instantmessage":
                if text_data_json["time"]:
                    time= text_data_json["time"]
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name2,
                    {
                        'type': 'same_message',
                        'message': message,
                        "receiver":receiver,
                        "sender":user.username, 
                        "online": list(total_mutual_friends),
                        "time": time
                    }
                )

                messagenotif= CustomUser.objects.get(username = receiver)
                messagenotif.message_notif+=1
                messagenotif.save(update_fields=["message_notif"])
                
        else:
            if text_data_json['type']=="instantmessage":
                if text_data_json["time"]:
                    time= text_data_json["time"]

                async_to_sync(self.channel_layer.group_send)(
                    self.receiver,
                    {
                        'type': 'chat_message',
                        'message': message,
                        "receiver":receiver,
                        "sender":user.username,
                        "online": list(total_mutual_friends),
                        "time": time
                    }
                )

                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name2,
                    {
                        'type': 'same_message',
                        'message': message,
                        "receiver":receiver,
                        "sender":user.username, 
                        "online": list(total_mutual_friends),
                        "time": time
                    }
                )
            else:
                print(text_data_json)
                if text_data_json['type']=="typing":
                    async_to_sync(self.channel_layer.group_send)(
                        self.receiver,
                        {
                            'type': 'typing',
                            'message': message,
                            "receiver":receiver,
                            "sender":user.username
                        }
                    )
                elif text_data_json['type']=="canceltyping":
                    async_to_sync(self.channel_layer.group_send)(
                        self.receiver,
                        {
                            'type': 'canceltyping',
                            'message': message,
                            "receiver":receiver,
                            "sender":user.username
                        }
                    )
            
        

            
        # self.send_to_group(
        #     self.receiver,
        #     'chat_message',
        #     message,
        #     receiver,
        #     user.username
        # )
        
        # self.send_to_group(
        #     self.room_group_name2,
        #     'same_message',
        #     message,
        #     receiver,
        #     user.username
        # )

    def chat_message(self, event):
        self.send(text_data=json.dumps(event))
        print("chat")

    def typing(self, event):
        self.send(text_data=json.dumps(event))
        print("typing")

    def canceltyping(self, event):
        self.send(text_data=json.dumps(event))
        print("canceltyping")

    def same_message(self, event):
        self.send(text_data=json.dumps(event))
        print("same")

        