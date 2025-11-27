import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsArrowLeftRight, BsSearch } from 'react-icons/bs';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
import { RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import { BsXCircleFill } from 'react-icons/bs';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Input, Select, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const Bookings = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [createForm] = Form.useForm();

  // Sample data for bookings
  const bookings = [
    {
      id: 1,
      bookingId: 'BK-0001',
      customer: 'John Doe',
      vehicle: 'Mercedes S-Class',
      pickup: '123 Main St, New York',
      dropoff: '456 Park Ave, New York',
      date: '2025-11-28',
      time: '10:00 AM',
      status: 'Confirmed',
      statusColor: 'bg-green-100 text-green-800',
      amount: '$120.00'
    },
    // Add more bookings as needed
  ];

  const statuses = [
    { id: 'all', name: 'All Bookings' },
    { id: 'confirmed', name: 'Confirmed' },
    { id: 'pending', name: 'Pending' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  const [activeStatus, setActiveStatus] = useState('all');

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalVisible(true);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    form.setFieldsValue({
      ...booking,
      date: dayjs(booking.date),
      time: dayjs(booking.time, 'h:mm A')
    });
    setIsEditModalVisible(true);
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setIsCancelModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    console.log('Updated booking:', values);
    // Here you would typically update the booking in your state/API
    setIsEditModalVisible(false);
  };

  const confirmCancel = () => {
    console.log('Canceling booking:', selectedBooking.id);
    // Here you would typically update the status to 'Cancelled' in your state/API
    setIsCancelModalVisible(false);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="bg-blue-600 px-4 md:px-5 py-3 rounded-md mb-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:opacity-90 transition"
            aria-label="Go back"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Bookings</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => {
                createForm.resetFields();
                setIsCreateModalVisible(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap"
            >
              <HiOutlineClipboardCheck className="mr-2" />
              <span>Create Booking</span>
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setActiveStatus(status.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeStatus === status.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Pickup</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Dropoff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-50">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 bg-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {booking.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                      <div className="text-sm text-gray-500">{booking.vehicle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.pickup}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.dropoff}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.statusColor}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-3">
                        <button 
                          onClick={() => handleView(booking)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          title="View Details"
                        >
                          <RiEyeLine className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(booking)}
                          className="text-gray-600 hover:text-yellow-600 transition-colors"
                          title="Edit Booking"
                        >
                          <RiEdit2Line className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleCancelClick(booking)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Cancel Booking"
                        >
                          <BsXCircleFill className="h-5 w-5" />
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
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">250</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <FiChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4, '...', 25].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    page === 1 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Booking Modal */}
      <Modal
        title="Booking Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Booking ID:</h4>
              <p>{selectedBooking.bookingId}</p>
            </div>
            <div>
              <h4 className="font-semibold">Customer:</h4>
              <p>{selectedBooking.customer}</p>
              <p className="text-gray-500">{selectedBooking.vehicle}</p>
            </div>
            <div>
              <h4 className="font-semibold">Pickup:</h4>
              <p>{selectedBooking.pickup}</p>
            </div>
            <div>
              <h4 className="font-semibold">Dropoff:</h4>
              <p>{selectedBooking.dropoff}</p>
            </div>
            <div>
              <h4 className="font-semibold">Date & Time:</h4>
              <p>{selectedBooking.date} at {selectedBooking.time}</p>
            </div>
            <div>
              <h4 className="font-semibold">Status:</h4>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedBooking.statusColor}`}>
                {selectedBooking.status}
              </span>
            </div>
            <div>
              <h4 className="font-semibold">Amount:</h4>
              <p>{selectedBooking.amount}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Booking Modal */}
      <Modal
        title="Edit Booking"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={() => form.submit()}>
            Save Changes
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={selectedBooking}
        >
          <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="vehicle" label="Vehicle" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="pickup" label="Pickup Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dropoff" label="Dropoff Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <TimePicker format="h:mm A" className="w-full" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Confirmed">Confirmed</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input prefix="$" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Cancel Booking Confirmation Modal */}
      <Modal
        title="Cancel Booking"
        open={isCancelModalVisible}
        onCancel={() => setIsCancelModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsCancelModalVisible(false)}>
            No, Keep It
          </Button>,
          <Button key="submit" type="primary" danger onClick={confirmCancel}>
            Yes, Cancel Booking
          </Button>
        ]}
      >
        <p>Are you sure you want to cancel this booking?</p>
        {selectedBooking && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
            <p><strong>Customer:</strong> {selectedBooking.customer}</p>
            <p><strong>Date:</strong> {selectedBooking.date} at {selectedBooking.time}</p>
          </div>
        )}
      </Modal>

      {/* Create Booking Modal */}
      <Modal
        title="Create New Booking"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => createForm.submit()}
          >
            Create Booking
          </Button>
        ]}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={(values) => {
            console.log('New booking:', values);
            // Here you would typically save the new booking to your state/API
            // For now, we'll just close the modal
            setIsCreateModalVisible(false);
          }}
        >
          <Form.Item 
            name="customer" 
            label="Customer Name" 
            rules={[{ required: true, message: 'Please enter customer name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item 
            name="vehicle" 
            label="Vehicle" 
            rules={[{ required: true, message: 'Please enter vehicle details' }]}
          >
            <Input placeholder="Mercedes S-Class" />
          </Form.Item>
          
          <Form.Item 
            name="pickup" 
            label="Pickup Location" 
            rules={[{ required: true, message: 'Please enter pickup location' }]}
          >
            <Input placeholder="123 Main St, New York" />
          </Form.Item>
          
          <Form.Item 
            name="dropoff" 
            label="Dropoff Location" 
            rules={[{ required: true, message: 'Please enter dropoff location' }]}
          >
            <Input placeholder="456 Park Ave, New York" />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item 
              name="date" 
              label="Date" 
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            
            <Form.Item 
              name="time" 
              label="Time" 
              rules={[{ required: true, message: 'Please select time' }]}
            >
              <TimePicker format="h:mm A" use12Hours className="w-full" />
            </Form.Item>
          </div>
          
          <Form.Item 
            name="status" 
            label="Status" 
            initialValue="Confirmed"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Confirmed">Confirmed</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            name="amount" 
            label="Amount" 
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <Input prefix="$" placeholder="0.00" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Bookings;