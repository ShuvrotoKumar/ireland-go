import React, { useState } from 'react';
import { FiPlus, FiChevronLeft, FiChevronRight, FiTrash2, FiEdit, FiX } from 'react-icons/fi';
import { BsPerson, BsSuitcase } from 'react-icons/bs';
import { Input, Button, Select, Upload } from 'antd';
import './vehicles.css';

const { TextArea } = Input;

const Vehicles = () => {
  // State for modals
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    category: '',
    people: '',
    luggage: '',
    price: '',
    description: ''
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

  const handleAddNew = () => {
    setIsAddModalVisible(true);
  };

  const handleSaveNew = () => {
    // In a real app, you would save to an API here
    console.log('New vehicle data:', formData);
    setIsAddModalVisible(false);
    // Reset form
    setFormData({
      name: '',
      plate: '',
      category: '',
      people: '',
      luggage: '',
      price: '',
      description: ''
    });
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      plate: vehicle.plate,
      category: vehicle.category,
      people: vehicle.capacity.people,
      luggage: vehicle.capacity.luggage,
      price: vehicle.price.replace('€', '').replace('/ Per Trip', '').trim(),
      description: vehicle.description || ''
    });
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // In a real app, you would update the vehicle in the API here
    console.log('Updated vehicle data:', formData);
    setIsEditModalVisible(false);
    setEditingVehicle(null);
    // Reset form
    setFormData({
      name: '',
      plate: '',
      category: '',
      people: '',
      luggage: '',
      price: '',
      description: ''
    });
  };

  const handleDelete = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    // In a real app, you would delete the vehicle from the API here
    console.log('Deleting vehicle:', editingVehicle);
    setIsDeleteModalVisible(false);
    setEditingVehicle(null);
  };

  // Sample data for vehicles
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      image: '/mar.jpg',
      name: 'Mercedes S-Class',
      plate: 'ABC-1234',
      category: 'Luxury Sedan',
      capacity: { people: 4, luggage: 3 },
      price: '€120.00/ Per Trip',
      description: 'Luxury sedan with premium features'
    },
    // Add more vehicles as needed
  ]);

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Vehicles Management</h1>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle, index) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16 bg-gray-200 rounded-md overflow-hidden">
                          <img className="h-full w-full object-cover" src={vehicle.image} alt={vehicle.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                          <div className="text-sm text-gray-500">Plate: {vehicle.plate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {vehicle.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <BsPerson className="text-gray-500" />
                          <span className="text-sm">{vehicle.capacity.people}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BsSuitcase className="text-gray-500" />
                          <span className="text-sm">{vehicle.capacity.luggage}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleDelete(vehicle)}
                          className="text-red-600 hover:text-white hover:bg-red-600 p-1 rounded transition-colors"
                        >
                          <FiTrash2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleEdit(vehicle)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit size={18} />
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                  <span className="font-medium">250</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  {[1, 2, 3, 4, '...', 30, 60, 120].map((page, index) => (
                    <button
                      key={index}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === 1
                          ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
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

      {/* Add Vehicle Modal */}
      {isAddModalVisible && (
        <div className="modal-overlay">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add New Vehicle</h2>
                <button 
                  onClick={() => setIsAddModalVisible(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Mercedes S-Class"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                    <Input
                      name="plate"
                      value={formData.plate}
                      onChange={handleInputChange}
                      placeholder="e.g., ABC-1234"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select
                      value={formData.category}
                      onChange={(value) => handleSelectChange('category', value)}
                      className="w-full"
                      placeholder="Select category"
                    >
                      <Select.Option value="Luxury Sedan">Luxury Sedan</Select.Option>
                      <Select.Option value="SUV">SUV</Select.Option>
                      <Select.Option value="Van">Van</Select.Option>
                      <Select.Option value="Economy">Economy</Select.Option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (Per Trip)</label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 120.00"
                      prefix="€"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Capacity</label>
                    <Input
                      name="people"
                      type="number"
                      value={formData.people}
                      onChange={handleInputChange}
                      placeholder="e.g., 4"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Luggage Capacity</label>
                    <Input
                      name="luggage"
                      type="number"
                      value={formData.luggage}
                      onChange={handleInputChange}
                      placeholder="e.g., 3"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter vehicle description and features..."
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Images</label>
                  <Upload.Dragger
                    name="file"
                    multiple={true}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    className="w-full"
                  >
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Upload vehicle images (up to 5 images)</p>
                  </Upload.Dragger>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  onClick={() => setIsAddModalVisible(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="primary"
                  onClick={handleSaveNew}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Add Vehicle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {isEditModalVisible && (
        <div className="modal-overlay">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Edit Vehicle</h2>
                <button 
                  onClick={() => setIsEditModalVisible(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Mercedes S-Class"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                    <Input
                      name="plate"
                      value={formData.plate}
                      onChange={handleInputChange}
                      placeholder="e.g., ABC-1234"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select
                      value={formData.category}
                      onChange={(value) => handleSelectChange('category', value)}
                      className="w-full"
                      placeholder="Select category"
                    >
                      <Select.Option value="Luxury Sedan">Luxury Sedan</Select.Option>
                      <Select.Option value="SUV">SUV</Select.Option>
                      <Select.Option value="Van">Van</Select.Option>
                      <Select.Option value="Economy">Economy</Select.Option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (Per Trip)</label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 120.00"
                      prefix="€"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Capacity</label>
                    <Input
                      name="people"
                      type="number"
                      value={formData.people}
                      onChange={handleInputChange}
                      placeholder="e.g., 4"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Luggage Capacity</label>
                    <Input
                      name="luggage"
                      type="number"
                      value={formData.luggage}
                      onChange={handleInputChange}
                      placeholder="e.g., 3"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter vehicle description and features..."
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  onClick={() => setIsEditModalVisible(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="primary"
                  onClick={handleSaveEdit}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="modal-overlay">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Delete Vehicle</h2>
                <button 
                  onClick={() => setIsDeleteModalVisible(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold">{editingVehicle?.name}</span>? 
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button 
                  onClick={() => setIsDeleteModalVisible(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmDelete}
                  className="!bg-red-600 hover:!bg-red-700 !text-white px-4 py-2 rounded-lg border-none"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vehicles;