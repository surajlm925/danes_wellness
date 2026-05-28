'use client'

// TODO: Implement Auth check to protect this route

import React, { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  // State for personal info editing
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Suraj Sharma',
    email: 'suraj@daneswellness.com',
    phone: '+91 98765 43210',
    address: '456, Indiranagar 100 Feet Rd, Hal 2nd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560008'
  })

  // State for file uploads
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'doctor_consultation_may2026.pdf', date: '2026-05-15', status: 'Approved' },
    { id: 2, name: 'rx_slip_danes.jpg', date: '2026-04-20', status: 'Approved' }
  ])
  const [newFile, setNewFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Mock orders
  const orders = [
    {
      id: 'DW-1084',
      date: 'May 25, 2026',
      status: 'Delivered',
      total: 1850,
      items: [
        { name: 'Bliss (RX)', qty: 1, price: 950 },
        { name: 'Digest Capsules (Non-Rx)', qty: 1, price: 900 }
      ]
    },
    {
      id: 'DW-1029',
      date: 'April 10, 2026',
      status: 'Delivered',
      total: 1399,
      items: [
        { name: 'Sleep (RX)', qty: 1, price: 1399 }
      ]
    }
  ]

  const handleInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0])
    }
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    if (!newFile) return

    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setUploadedFiles(prev => [
            {
              id: Date.now(),
              name: newFile.name,
              date: new Date().toISOString().split('T')[0],
              status: 'Pending Verification'
            },
            ...prev
          ])
          setNewFile(null)
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      }
    }, 150)
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-36 pb-20 px-4 md:px-8 transition-colors duration-300">
      <div className="container-danes max-w-[1280px] mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-[var(--text)] opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] uppercase tracking-widest font-bold font-body">Back to Home</span>
          </Link>
          <div className="h-[1px] flex-1 bg-[var(--border)]" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] font-body">Account Dashboard</span>
        </div>

        {/* Dashboard Header */}
        <div className="mb-12 border-b border-[var(--border)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-[var(--heading)] uppercase tracking-widest">
              My Account
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-2 font-body uppercase tracking-wider">
              Member since April 2026 &bull; {orders.length} Orders
            </p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/shop" 
              className="px-6 py-3 border border-[var(--heading)] text-[10px] uppercase tracking-widest font-bold text-[var(--heading)] hover:bg-[var(--bg-dark)] hover:text-white dark:hover:bg-[var(--heading)] dark:hover:text-[#0d1f14] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Personal Info */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-[var(--bg-alt)] border border-[var(--border)] p-6 md:p-8 rounded-sm shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-3">
                <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider">
                  Personal Info
                </h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-bold uppercase tracking-wider text-amber hover:underline font-body"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }} className="space-y-4 font-body">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={personalInfo.name} 
                      onChange={handleInfoChange}
                      className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={personalInfo.email} 
                      onChange={handleInfoChange}
                      className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={personalInfo.phone} 
                      onChange={handleInfoChange}
                      className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">Street Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={personalInfo.address} 
                      onChange={handleInfoChange}
                      className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">City</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={personalInfo.city} 
                        onChange={handleInfoChange}
                        className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">State</label>
                      <input 
                        type="text" 
                        name="state" 
                        value={personalInfo.state} 
                        onChange={handleInfoChange}
                        className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--text-muted)] block">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      value={personalInfo.pincode} 
                      onChange={handleInfoChange}
                      className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] p-3 text-xs outline-none focus:border-[var(--heading)] transition-colors"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[var(--bg-dark)] hover:bg-[var(--primary-mid)] text-white dark:bg-[var(--heading)] dark:text-[#0d1f14] dark:hover:bg-[#c9d4c2] py-3 text-[10px] uppercase font-bold tracking-widest mt-2 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-6 font-body text-xs text-[var(--text)]">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1">Name</h4>
                    <p className="font-semibold text-sm text-[var(--heading)]">{personalInfo.name}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1">Contact</h4>
                    <p className="mb-1">{personalInfo.email}</p>
                    <p>{personalInfo.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-1">Shipping Address</h4>
                    <p className="leading-relaxed">
                      {personalInfo.address}<br />
                      {personalInfo.city}, {personalInfo.state} - {personalInfo.pincode}
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMNS: Orders and Prescriptions */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* SECTION: My Prescriptions */}
            <section className="bg-[var(--bg-alt)] border border-[var(--border)] p-6 md:p-8 rounded-sm shadow-sm transition-colors duration-300">
              <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider mb-6 border-b border-[var(--border)] pb-3">
                My Prescriptions
              </h2>
              
              {/* Prescription list */}
              <div className="space-y-4 mb-8">
                {uploadedFiles.length === 0 ? (
                  <p className="text-xs text-[var(--text-muted)] font-body py-4 italic">No prescriptions uploaded yet.</p>
                ) : (
                  uploadedFiles.map((file) => (
                    <div key={file.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[var(--border)] bg-[var(--bg)] rounded-sm font-body text-xs gap-3">
                      <div className="flex items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber shrink-0">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        <div className="min-w-0">
                          <p className="font-bold text-[var(--heading)] truncate max-w-[250px] md:max-w-[320px]">{file.name}</p>
                          <p className="text-[9px] text-[var(--text-muted)] uppercase mt-0.5">Uploaded on {file.date}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full self-start sm:self-center ${
                        file.status === 'Approved' 
                          ? 'bg-[#105232]/10 text-evergreen dark:bg-[#105232]/25 dark:text-moss' 
                          : 'bg-amber/10 text-[#C4922A] dark:bg-amber/20'
                      }`}>
                        {file.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Upload Zone Form */}
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="border border-dashed border-[var(--border)] p-6 md:p-8 rounded-sm bg-[var(--bg)] flex flex-col items-center justify-center text-center relative group hover:border-[var(--heading)] transition-colors">
                  <input 
                    type="file" 
                    id="prescription-file"
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--text-muted)] mb-4 group-hover:text-amber transition-colors">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {newFile ? (
                    <div className="space-y-1 z-10 pointer-events-none">
                      <p className="text-xs font-bold text-[var(--heading)]">{newFile.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{(newFile.size / 1024 / 1024).toFixed(2)} MB &bull; Ready to Upload</p>
                    </div>
                  ) : (
                    <div className="space-y-1 z-10 pointer-events-none font-body">
                      <p className="text-xs font-bold text-[var(--heading)]">Click to browse or drag prescription file here</p>
                      <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">PDF, PNG, or JPG (max 5MB)</p>
                    </div>
                  )}
                </div>

                {newFile && (
                  <button 
                    type="submit" 
                    disabled={isUploading}
                    className="w-full bg-[var(--bg-dark)] hover:bg-[var(--primary-mid)] text-white dark:bg-[var(--heading)] dark:text-[#0d1f14] dark:hover:bg-[#c9d4c2] py-4 text-[10px] uppercase font-bold tracking-widest font-body disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-cream" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading ({uploadProgress}%)
                      </>
                    ) : (
                      'Upload Prescription'
                    )}
                  </button>
                )}
              </form>
            </section>

            {/* SECTION: Order History */}
            <section className="bg-[var(--bg-alt)] border border-[var(--border)] p-6 md:p-8 rounded-sm shadow-sm transition-colors duration-300">
              <h2 className="font-display text-lg text-[var(--heading)] uppercase tracking-wider mb-6 border-b border-[var(--border)] pb-3">
                Order History
              </h2>

              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-[var(--border)] rounded-sm overflow-hidden bg-[var(--bg)]">
                    
                    {/* Order summary header bar */}
                    <div className="bg-[#DDE2D8] dark:bg-[var(--bg-alt)] px-4 py-3 flex flex-wrap justify-between items-center gap-2 font-body text-xs border-b border-[var(--border)]">
                      <div className="flex gap-4">
                        <div>
                          <span className="text-[9px] text-[var(--text-muted)] uppercase block">Order ID</span>
                          <span className="font-bold text-[var(--heading)]">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[var(--text-muted)] uppercase block">Date Placed</span>
                          <span>{order.date}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[var(--text-muted)] uppercase block">Total Amount</span>
                          <span className="font-bold text-[var(--heading)]">₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-[#105232]/10 text-evergreen dark:bg-[#105232]/25 dark:text-moss">
                        {order.status}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="p-4 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center font-body text-xs">
                          <div>
                            <span className="font-semibold text-[var(--heading)]">{item.name}</span>
                            <span className="text-[10px] text-[var(--text-muted)] ml-2">Qty: {item.qty}</span>
                          </div>
                          <span>₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
          </div>
          
        </div>

      </div>
    </main>
  )
}
