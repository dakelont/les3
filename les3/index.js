const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  
	// this.once = function(){
       // this.emit("close", `${this.title}`);
    // };
  }
  close() {
	 this.emit('close', function() { 
	 });
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk')
						.setMaxListeners(2);

let chatOnMessage = (message) => {
  console.log(message);
};

let vkClose = () => {
	console.log('Чат вконтакте закрылся :(');
};

let readyForAnswer = () => {
  console.log('Готовлюсь к ответу');
};
webinarChat
	.on('message', readyForAnswer)
	.on('message', chatOnMessage);

facebookChat.on('message', chatOnMessage);

vkChat
	.on('message', readyForAnswer)
	.on('message', chatOnMessage);
	
vkChat.once('close', vkClose)

// Закрыть вконтакте
setTimeout( ()=> {
	console.log('Закрываю вконтакте...');
	vkChat.close('Чат вконтакте закрылся :(');
	vkChat	
		.removeListener('message', readyForAnswer)
		.removeListener('message', chatOnMessage);
}, 3000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 5000 );