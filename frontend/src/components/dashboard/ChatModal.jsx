// src/components/dashboard/ChatModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import io from 'socket.io-client';
import { FiX, FiSend } from 'react-icons/fi';

const socket = io('http://localhost:5000');

const ChatModal = ({ order, onClose }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Join the specific chat room for this order
        socket.emit('join_order_room', order._id);

        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up on component unmount
        return () => {
            socket.off('receive_message');
        };
    }, [order._id]);

    useEffect(() => {
        // Auto-scroll to the bottom
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const messageData = {
                room: order._id,
                author: user.name,
                text: newMessage,
                time: new Date().toLocaleTimeString(),
            };
            socket.emit('send_message', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]); // Add my own message to the list
            setNewMessage('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-[70vh] flex flex-col">
                <header className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">Chat for Order: {order.catalogItem.name}</h2>
                    <button onClick={onClose}><FiX /></button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 flex ${msg.author === user.name ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg px-4 py-2 ${msg.author === user.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p className="font-bold text-sm">{msg.author}</p>
                                <p>{msg.text}</p>
                                <p className="text-xs opacity-70 text-right mt-1">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <footer className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-grow p-2 rounded-md border-gray-300"
                        />
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold"><FiSend /></button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default ChatModal;