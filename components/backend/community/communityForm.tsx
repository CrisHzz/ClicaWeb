'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Import useUser to get user info
import { createCommunity, getAllCommunities, updateCommunity, deleteCommunity } from '@/components/backend/community/communityService';
interface Comunidades {
  id: number; // Auto-incremented ID
  name: string;
  description: string;
  community: string;
  number_of_members: number;
  serialId: string; // Clerk's serial ID for each registered user
}
const CommunityManager: React.FC = () => {
  const { user } = useUser(); // Now using useUser to get the user
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [communityType, setCommunityType] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState<number>(0);
  const [communities, setCommunities] = useState<Comunidades[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [serialId, setSerialId] = useState<string | null>(null); // State for Clerk user ID

  // Fetch Clerk user ID on component mount
  useEffect(() => {
    if (user) {
      setSerialId(user.id); // Clerk user ID (serialId)
    }
  }, [user]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  // Fetch all communities
  const fetchCommunities = async () => {
    const allCommunities = await getAllCommunities();
    setCommunities(allCommunities);
  };

  // Add or Update community
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialId) {
      alert('Serial ID (Clerk User ID) not found');
      return;
    }

    const communityData: Omit<Comunidades, 'id'> = {
      name: communityName,
      description,
      community: communityType,
      number_of_members: numberOfMembers,
      serialId
    };

    if (editId) {
      await updateCommunity(editId, communityData);
      setEditId(null);
    } else {
      await createCommunity(communityData);
    }

    // Reset form
    setCommunityName('');
    setDescription('');
    setCommunityType('');
    setNumberOfMembers(0);

    // Refresh communities list
    fetchCommunities();
  };

  // Populate form fields for editing
  const handleEdit = (community: Comunidades) => {
    setCommunityName(community.name);
    setDescription(community.description);
    setCommunityType(community.community);
    setNumberOfMembers(community.number_of_members);
    setEditId(community.id);
  };

  // Delete community
  const handleDelete = async (id: number) => {
    await deleteCommunity(id);
    fetchCommunities();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Manager</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{editId ? 'Edit Community' : 'Add Community'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Community Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Community Type</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={communityType}
            onChange={(e) => setCommunityType(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Number of Members</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={numberOfMembers}
            onChange={(e) => setNumberOfMembers(parseInt(e.target.value, 10))}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {editId ? 'Update Community' : 'Add Community'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Existing Communities</h2>
      <ul className="space-y-4">
        {communities.map((community) => (
          <li key={community.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold">{community.name}</h3>
            <p>{community.description}</p>
            <p><strong>Type:</strong> {community.community}</p>
            <p><strong>Members:</strong> {community.number_of_members}</p>
            <p><strong>Serial ID:</strong> {community.serialId}</p>

            <div className="mt-4 space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                onClick={() => handleEdit(community)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(community.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityManager;
