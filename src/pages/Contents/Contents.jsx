import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { Input, Button, Modal, Select } from 'antd';

const { TextArea } = Input;

const Contents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    status: 'Draft',
    content: ''
  });

  // Sample data for contents
  const [contents, setContents] = useState([
    { 
      id: 1, 
      title: 'About Us', 
      type: 'Page', 
      lastUpdated: '2025-11-25',
      status: 'Published',
      content: 'This is the about us page.'
    },
    { 
      id: 2, 
      title: 'Terms & Conditions', 
      type: 'Page', 
      lastUpdated: '2025-11-20',
      status: 'Published',
      content: 'These are the terms and conditions.'
    },
    { 
      id: 3, 
      title: 'Privacy Policy', 
      type: 'Page', 
      lastUpdated: '2025-11-18',
      status: 'Draft',
      content: 'This is the privacy policy.'
    },
  ]);

  // Filter contents based on search term and active filter
  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'published' && content.status === 'Published') ||
                         (activeFilter === 'drafts' && content.status === 'Draft');
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      type: content.type,
      status: content.status,
      content: content.content || ''
    });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // In a real app, you would update the content in the API here
    if (editingContent) {
      const updatedContents = contents.map(item => 
        item.id === editingContent.id ? { ...item, ...formData } : item
      );
      setContents(updatedContents);
    } else {
      // Add new content
      const newContent = {
        id: contents.length + 1,
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setContents([...contents, newContent]);
    }
    setIsEditModalVisible(false);
    setEditingContent(null);
    // Reset form
    setFormData({
      title: '',
      type: '',
      status: 'Draft',
      content: ''
    });
  };

  const handleDelete = (content) => {
    setEditingContent(content);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // In a real app, you would delete the content from the API here
    const updatedContents = contents.filter(item => item.id !== editingContent.id);
    setContents(updatedContents);
    setIsDeleteModalVisible(false);
    setEditingContent(null);
  };

  const handleAddNew = () => {
    setEditingContent(null);
    setFormData({
      title: '',
      type: '',
      status: 'Draft',
      content: ''
    });
    setIsEditModalVisible(true);
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Contents</h1>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All Pages
            </button>
            <button
              onClick={() => setActiveFilter('published')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'published' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveFilter('drafts')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeFilter === 'drafts' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Drafts
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search contents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FiPlus className="mr-2" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* Contents Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContents.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50 transition-colors w-10 h-10 flex items-center justify-center"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item)}
                          className="text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-colors w-10 h-10 flex items-center justify-center"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredContents.length}</span> of{' '}
                  <span className="font-medium">{filteredContents.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600 z-10">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <Modal
        title={editingContent ? 'Edit Content' : 'Add New Content'}
        open={isEditModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingContent(null);
        }}
        width={700}
        footer={[
          <Button key="back" onClick={() => {
            setIsEditModalVisible(false);
            setEditingContent(null);
          }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveEdit}>
            {editingContent ? 'Update' : 'Save'}
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <Select
                value={formData.type}
                onChange={(value) => handleSelectChange('type', value)}
                className="w-full"
                placeholder="Select Type"
              >
                <Select.Option value="Page">Page</Select.Option>
                <Select.Option value="Post">Post</Select.Option>
                <Select.Option value="FAQ">FAQ</Select.Option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select
                value={formData.status}
                onChange={(value) => handleSelectChange('status', value)}
                className="w-full"
              >
                <Select.Option value="Draft">Draft</Select.Option>
                <Select.Option value="Published">Published</Select.Option>
                <Select.Option value="Archived">Archived</Select.Option>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <TextArea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              placeholder="Enter content here..."
              className="w-full"
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setEditingContent(null);
        }}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{editingContent?.title}"? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default Contents;