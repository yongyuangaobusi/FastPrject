/*  
 * @Description: webSocket组件
 * @Author:      shixiutong
 * @CreateDate:  2017-2-7
 * Depends:
 */

;(function(win){
	var NWebSocket,          //顶级名称空间
	
	NWebSocket = win.NWebSocket;
	
	if(NWebSocket) {
		console.info("NWebSocket has already existed!");
	}

	Command = {
        HANDSHAKE: 2,
        BIND: 5,
        UNBIND: 6,
        ERROR: 10,
        OK: 11,
        KICK: 13,
        PUSH: 15,
        ACK: 23,
        UNKNOWN: -1
	};
	
	// 默认选项
	defaultOptions = {
			url:'ws://10.48.35.209:8082/',
			deviceId:'deviceId-1001',
			osName:'web ' + navigator.userAgent,
			osVersion:'1.0',
			clientVersion:'1.0',
			service:''
	};
	
	win.NWebSocket = function(options){
		var nWebSocketObj = {
			//ws:null,
			session:{}, 
			ID_SEQ:1,
			formRules:{},
			url:'',
			userId:'',
			tags:'',
			deviceId:'',
			osName:'',
			osVersion:'',
			clientVersion:'',
			service:'',
			onmessage:null,//返回结果回调
			handshake:null,//返回结果回调
			_init : function() {
				this.url = options.url || defaultOptions.url;
				this.deviceId = options.deviceId || defaultOptions.deviceId;
				this.osName = options.osName || defaultOptions.osName;
				this.osVersion = options.osVersion || defaultOptions.osVersion;
				this.clientVersion = options.clientVersion || defaultOptions.clientVersion;
				this.userId = options.userId;
				this.tags = options.tags;
				this.service = options.service;
	        	this.onmessage = options.onmessage;
	        	this.handshake = options.handshake;
				this.connection();
			},
			connection:function(){
				var _this=this;
				
				console.info("尝试连接WebSocket服务器, url=" + _this.url);
	        	_this.ws = new WebSocket(this.url);
	        	
//		        if(!_this.ws){
//			        console.info("尝试连接WebSocket服务器, url=" + this.url);
//		        	_this.ws = new WebSocket(this.url);
//		        }
				
		        _this.ws.onmessage =function(event){
					_this.dispatch(JSON.parse(event.data))
				};
				
				_this.ws.onopen = function(){
					console.info("正在连接WebSocket");
					_this._send(_this.packet(Command.HANDSHAKE, {
					        deviceId: _this.deviceId,
					        osName: _this.osName,
					        osVersion: _this.osVersion,
					        clientVersion: _this.clientVersion
					    })
					);
				};
				
				_this.ws.onclose = function(){
					console.info("正在关闭WebSocket连接!");
					session = {};
					ID_SEQ = 1;
					ws = null;
				};
				
				_this.ws.onerror = function(){
					console.info("WebSocket连接异常");
					_this.doClose("WebSocket连接异常");
				};
			},
			doClose:function(message){
				 if (_this.ws) _this.ws.close();
		         console.info("手动关闭WebSocket连接, 原因=" + message);
			},
			_send:function(message){
				 if (!this.ws) {
		            return;
		        }
		        if (this.ws.readyState == WebSocket.OPEN) {
		            console.info("发送消息:"+JSON.stringify(message));
		            this.ws.send(JSON.stringify(message));
		        } else {
		        	console.info("无法连接"+this.service+".");
		        }
			},
			packet:function(cmd, body, sessionId){
				return {
		            cmd: cmd,
		            flags: 16,
		            sessionId: sessionId || this.ID_SEQ++,
		            body: body
		        }
			},
			dispatch:function(packet){
				var _this=this;
				switch (packet.cmd) {
			         case Command.HANDSHAKE: {
			             console.info(">>> 握手 ok.");
			             _this.session.handshakeOk = true;
			             if (_this.userId) {
			            	 _this.bindUser(_this.service, _this.userId, _this.tags);
			             }
			             break;
			         }
			         case Command.OK: {
			        	 if (packet.body.cmd == Command.BIND) {
			                 console.info(">>> 绑定用户成功");
			             }else if (packet.body.cmd == Command.UNBIND) {
			                 console.info(">>> 解除用户成功");
			             }
			             break;
			         }
			         case Command.ERROR: {
			             if (packet.body.cmd == Command.BIND) {
			                 console.info(">>> 绑定用户失败");
			             }
			             break;
			         }
			         case Command.KICK: {
			        	 console.info(">>> 用户被踢");
			             if (session.userId == packet.body.userId && config.deviceId == packet.body.deviceId) {
			                 doClose("用户被踢");
			             }
			             break;
			         }
			         case Command.PUSH: {
			             //console.info(">>> 接收到推送消息, 内容=" + packet.body.content);
			             var sessionId;
			             if ((packet.flags & 8) != 0) {
			                 ack(packet.sessionId);
			             } else {
			                 sessionId = packet.sessionId
			                 //callBack.onmessage(packet.body.content);
			                 //回调方法，显示当前图片信息
							 this.onmessage(packet.body.content);
			             }
			             break;
			         }
			     }
			},
			bindUser:function(service, userId, tags){
				tags = service+"|"+tags;
	            userId = tags+"|"+userId;
				if (userId && userId != this.session.userId) {
					if(this.session.userId){
						this._send(this.packet(Command.UNBIND, {userId: this.session.userId, tags: this.session.tags}));	
					}
		            this.session.userId = userId;
		            this.session.tags = tags;
		            this._send(this.packet(Command.BIND, {userId: userId, tags: tags}));
		        }
			},
			ack:function(sessionId){
				this._send(packet(command.ACK, null, sessionId));
			}
		};
		nWebSocketObj._init();
		return nWebSocketObj;
	};
//	window.NWebSocket({});
//	if(!window.NWebSocket){
//		window.NWebSocket=NWebSocketT({});
//	}
})(window);
