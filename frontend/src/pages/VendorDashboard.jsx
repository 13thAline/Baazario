import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FiUsers, FiArchive, FiBox, FiPlus, FiBell, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ChatModal from '../components/dashboard/ChatModal';

// Modal for creating a new group
const CreateGroupModal = ({ onClose, token, onGroupCreated }) => {
    const [name, setName] = useState('');
    const [emails, setEmails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inviteeEmails = emails.split(',').map(email => email.trim()).filter(email => email);
        try {
            const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/groups`, { name, inviteeEmails }, config);
            alert('Group created successfully!');
            onGroupCreated();
            onClose();
        } catch (err) {
            alert('Failed to create group');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create a New Vendor Group</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Group Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Invite Vendors (comma-separated emails)</label>
                        <textarea value={emails} onChange={(e) => setEmails(e.target.value)} rows="3" placeholder="vendor1@example.com, vendor2@example.com" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modal for starting a new group order
const StartOrderModal = ({ item, myGroups, token, onClose, onOrderCreated }) => {
    const [selectedGroup, setSelectedGroup] = useState(myGroups[0]?._id || '');
    const [maxQuantity, setMaxQuantity] = useState(10);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedGroup) {
            alert("You must select a group to start an order.");
            return;
        }
        try {
            const config = { headers: { 'Content-Type': 'application/json', 'x-auth-token': token } };
            const body = { groupId: selectedGroup, catalogItemId: item._id, maxQuantityPerMember: maxQuantity };
            const orderRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/group-orders/group/${group._id}`, config);
            alert('Group order started!');
            onOrderCreated();
            onClose();
        } catch (err) {
            alert('Failed to start order. Are you the group leader?');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Start Group Order for {item.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Your Group</label>
                        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm">
                            {myGroups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Max Quantity per Member</label>
                        <input type="number" value={maxQuantity} onChange={(e) => setMaxQuantity(e.target.value)} required min="1" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold">Start Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Main dashboard component
const VendorDashboard = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState({ catalog: [], invites: [], groups: [], orders: {} });
    const [modal, setModal] = useState({ createGroup: false, startOrder: null, chat: null });
    
    const fetchData = async () => {
        if (token) {
            const config = { headers: { 'x-auth-token': token } };
            try {
                const [catalogRes, invitesRes, groupsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/catalog/all`, config),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/groups/invitations`, config),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/groups/my-groups`, config)
                ]);

                let ordersData = {};
                for (const group of groupsRes.data) {
                    const orderRes = await axios.get(`http://localhost:5000/api/group-orders/group/${group._id}`, config);
                    ordersData[group._id] = orderRes.data;
                }
                
                setData({ catalog: catalogRes.data, invites: invitesRes.data, groups: groupsRes.data, orders: ordersData });
            } catch (err) { console.error("Could not fetch dashboard data", err); }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            // Check if the token exists before making any requests
            if (token) {
                // This config object with the headers is crucial
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                
                try {
                    const [catalogRes, invitesRes, groupsRes] = await Promise.all([
                        axios.get(`${import.meta.env.VITE_API_URL}/api/catalog/all`, config),
                        axios.get(`${import.meta.env.VITE_API_URL}/api/groups/invitations`, config),
                        axios.get(`${import.meta.env.VITE_API_URL}/api/groups/my-groups`, config)
                    ]);

                    let ordersData = {};
                    for (const group of groupsRes.data) {
                        // Make sure the config is passed here too
                        const orderRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/group-orders/group/${group._id}`, config);
                        ordersData[group._id] = orderRes.data;
                    }
                    
                    setData({ catalog: catalogRes.data, invites: invitesRes.data, groups: groupsRes.data, orders: ordersData });
                } catch (err) { 
                    console.error("Could not fetch dashboard data. Is the auth token valid?", err); 
                }
            }
        };
        fetchData();
    }, [token]);

    const handleAcceptInvite = async (inviteId) => {
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/groups/invitations/${inviteId}/accept`, {}, config);
            alert('Invitation accepted!');
            fetchData();
        } catch (err) { alert('Failed to accept invitation'); }
    };

    const handleCommit = async (orderId, quantity) => {
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/group-orders/${orderId}/commit`, { quantity }, config);
            alert('Commitment saved!');
            fetchData();
        } catch (err) { alert(err.response?.data?.msg || 'Failed to save commitment'); }
    };

    const leaderGroups = data.groups.filter(g => g.leader._id === user?.id);

    const stats = [
        { title: 'Vendor Groups', value: data.groups.length, description: 'Active groups', icon: <FiUsers size={20} /> },
        { title: 'Suppliers', value: '0', description: 'Available suppliers', icon: <FiArchive size={20} /> },
        { title: 'Orders', value: '0', description: 'Coming in Phase 2', icon: <FiBox size={20} /> },
    ];
    
    return (
        <div className="space-y-8">
            {modal.createGroup && <CreateGroupModal token={token} onClose={() => setModal({...modal, createGroup: false})} onGroupCreated={fetchData} />}
            {modal.startOrder && <StartOrderModal item={modal.startOrder} myGroups={leaderGroups} token={token} onClose={() => setModal({...modal, startOrder: null})} onOrderCreated={fetchData} />}
            {modal.chat && <ChatModal order={modal.chat} onClose={() => setModal({...modal, chat: null})} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Vendor Groups</h3>
                        <p className="text-sm text-gray-500">Join or create groups to place collective orders</p>
                    </div>
                    <button onClick={() => setModal({...modal, createGroup: true})} className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black">
                        <FiPlus />
                        <span>Create Group</span>
                    </button>
                </div>
            </div>

            {data.invites.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                     <h3 className="text-lg font-semibold text-gray-800 flex items-center"><FiBell className="mr-2"/>Group Invitations</h3>
                     <div className="mt-4 space-y-3">
                        {data.invites.map(invite => (
                            <div key={invite._id} className="p-3 bg-gray-100 rounded-md flex items-center justify-between flex-wrap gap-2">
                                <p className="text-sm">You have been invited to join <strong>{invite.group.name}</strong> by <strong>{invite.sender.name}</strong>.</p>
                                <button onClick={() => handleAcceptInvite(invite._id)} className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-green-600">Accept</button>
                            </div>
                        ))}
                     </div>
                </div>
            )}
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">My Vendor Groups</h3>
                <div className="mt-4 border-t border-gray-200 pt-4">
                    {data.groups.length === 0 ? (
                        <p className="text-sm text-gray-500">You have not joined any groups yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {data.groups.map(group => (
                                <div key={group._id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{group.name}</h4>
                                            <p className="text-xs text-gray-500">Leader: {group.leader.name}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-right">Members:</h5>
                                            <ul className="text-sm text-gray-600 text-right">
                                                {group.members.map(member => <li key={member._id}>{member.name}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4 border-t pt-4">
                                        <h5 className="text-sm font-semibold mb-2">Active Group Orders:</h5>
                                        {data.orders[group._id]?.length > 0 ? data.orders[group._id].map(order => (
                                            <div key={order._id} className="p-3 mt-2 bg-white rounded-md border">
                                                <div className="flex items-center space-x-4">
                                                    <img src={`http://localhost:5000${order.catalogItem.imageUrl}`} alt={order.catalogItem.name} className="w-16 h-16 rounded-md object-cover"/>
                                                    <div>
                                                        <p className="font-semibold">{order.catalogItem.name} ({order.catalogItem.quantity})</p>
                                                        <p className="text-xs text-gray-500">Max per member: {order.maxQuantityPerMember}</p>
                                                    </div>
                                                </div>
                                                <form onSubmit={(e) => { e.preventDefault(); handleCommit(order._id, e.target.quantity.value); }} className="flex items-center space-x-2 mt-2">
                                                    <input type="number" name="quantity" placeholder="Your Qty" max={order.maxQuantityPerMember} required className="p-1.5 w-24 border-gray-300 rounded-md text-sm" />
                                                    <button type="submit" className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">Commit</button>
                                                </form>
                                                <details className="mt-2 text-xs">
                                                    <summary className="cursor-pointer font-semibold">See Commitments ({order.commitments.length})</summary>
                                                    <ul className="text-gray-500 mt-1 pl-4">
                                                        {order.commitments.map(c => <li key={c.member._id}>{c.member.name}: {c.quantity}</li>)}
                                                    </ul>
                                                </details>
                                                {user?.id === order.leader && (
                                                    <button onClick={() => setModal({...modal, chat: order})} className="mt-2 w-full text-xs bg-purple-600 text-white py-1.5 rounded-md hover:bg-purple-700 flex items-center justify-center space-x-2">
                                                        <FiMessageSquare size={12}/>
                                                        <span>Chat with Supplier</span>
                                                    </button>
                                                )}
                                            </div>
                                        )) : <p className="text-xs text-gray-500">No active orders for this group.</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Marketplace</h3>
                    <p className="text-sm text-gray-500">Browse items available from all suppliers</p>
                </div>
                <div className="mt-6 border-t border-gray-200">
                    {data.catalog.length === 0 ? (
                        <div className="text-center py-16"><p className="text-gray-500">No items available in the marketplace yet.</p></div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
                            {data.catalog.map(item => (
                                <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
                                    <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} className="w-full h-32 object-cover" />
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-600">{item.quantity}</p>
                                        <p className="text-xs text-gray-500 mt-2">Sold by: {item.supplier.name}</p>
                                        {leaderGroups.length > 0 && 
                                            <button onClick={() => setModal({...modal, startOrder: item})} className="mt-3 w-full text-xs bg-gray-800 text-white py-2 rounded-md hover:bg-black transition-colors flex items-center justify-center space-x-2">
                                                <FiShoppingCart />
                                                <span>Start Group Order</span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;