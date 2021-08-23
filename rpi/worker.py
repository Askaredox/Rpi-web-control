from PyQt5.QtCore import QObject, pyqtSignal
import asyncio
import json

class Worker(QObject):
    url_changed = pyqtSignal(str)
    room = pyqtSignal(str)
    message = pyqtSignal(str)

    def __init__(self, window, sio):
        super().__init__()
        self.window = window
        self.sio = sio
        self.room_name = None
        self.callbacks()


    def callbacks(self):
        @self.sio.on('message')
        def message(data:str):
            resp = json.loads(data.replace("'",'"'))
            state = resp['state']
            print(f'{state} received with {data}')
            if(state == 'create-room'):
                self.room_name = resp['room']
                self.room.emit(resp['room'])
            elif(state == 'close-room'):
                pass
            elif(state == 'joined-room'):
                self.message.emit('{} joined'.format(resp['sid']))
            elif(state == 'leaved-room'):
                self.message.emit('{} left'.format(resp['sid']))
            elif(state == 'message'):
                self.message.emit('{} set page {}'.format(resp['sid'], resp['message']))
                self.url_changed.emit(resp['message'])
            # await sio.emit('response', {'response': 'my response'})

    def sio_connect(self):
        self.sio.connect('http://ec2-34-242-65-242.eu-west-1.compute.amazonaws.com:5000/')
        asyncio.run(self.get_push())
        self.sio.wait()

    async def get_push(self):
        self.sio.emit('create', {})
        while True: # Wait
            page = input('command: ')
            self.trans_command(page)

    def trans_command(self, cmd:str):
        self.sio.emit('messages', {
            'room': self.room_name, 
            'message': cmd
        })

    def run(self):
        self.sio_connect()
