module.exports = function(io, rooms){
	// accept connection
	var chatrooms = io.of('/roomlist').on('connection', function(socket){
		console.log('Connection Established on the server');
		socket.emit('roomupdate', JSON.stringify(rooms));
		//Listen the data from JS
		socket.on('newroom', function(data){
			rooms.push(data);
			socket.broadcast.emit('roomupdate', JSON.stringify(rooms));
			socket.emit('roomupdate', JSON.stringify(rooms))
		})
	})


	var messages = io.of('/messages').on('connection', function(socket){
		console.log('connection to the chatroom established !!');

		socket.on('joinroom', function(data){
			socket.username = data.user;
			socket.userPic = data.userPic;
			socket.join(data.room);
			updateUserList(data.room, true);
		})

		socket.on('newMessage', function(data){
			socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));
		})

		function updateUserList(room, updateAll){
			console.log('came in updateUserList function !!');
			var getUsers = io.of('/messages').client(room);
			var userlist = [];
			for (var i in getUsers){
				userlist.push({user:getUsers[i].username, userPic:getUsers[i].userPic})
			}

			socket.to(room).emit('updateUserList', JSON.stringify(userlist));
			if(updateAll){
				console.log('updateAll checking ++++++++++++++ '+JSON.stringify(userlist))
				socket.broadcast.to(room).emit('updateUserList', JSON.stringify(userlist));
			}	
		}
		socket.on('updateList', function(data){
			updateUserList(data.room);
		})
	})	
}