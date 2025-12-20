import React, { useState, useEffect } from 'react'
import './QRGenerator.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const QRGenerator = ({ url }) => {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [tableNumber, setTableNumber] = useState('')
    const [tables, setTables] = useState([])
    const [loading, setLoading] = useState(false)

    // Fetch all tables
    const fetchTables = async () => {
        if (!isLoaded || !isSignedIn) {
            return;
        }

        try {
            const token = await getToken({ template: "default" });
            
            if (!token) {
                return;
            }

            const response = await axios.get(url + "/api/table/list", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setTables(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching tables:", error);
            if (error.response?.status === 403) {
                toast.error("Access denied. Admin privileges required.");
            }
        }
    }

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchTables()
        }
    }, [isLoaded, isSignedIn])

    // Generate QR code
    const handleGenerate = async (e) => {
        e.preventDefault()
        
        if (!tableNumber) {
            toast.error("Please enter a table number")
            return
        }

        if (!isLoaded || !isSignedIn) {
            toast.error("Please sign in to generate QR codes");
            return;
        }

        setLoading(true)
        try {
            const token = await getToken({ template: "default" });
            
            if (!token) {
                toast.error("Authentication failed. Please login again.");
                return;
            }

            const response = await axios.post(url + "/api/table/generate", { 
                tableNumber 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                toast.success("QR code generated successfully!")
                setTableNumber('')
                fetchTables()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error generating QR:", error);
            if (error.response?.status === 401) {
                toast.error("Unauthorized. Please login again.");
            } else if (error.response?.status === 403) {
                toast.error("Access denied. Admin privileges required.");
            } else {
                toast.error(error.response?.data?.message || "Failed to generate QR code");
            }
        }
        setLoading(false)
    }

    // Download QR code
    const downloadQR = (qrCode, tableNumber) => {
        const link = document.createElement('a')
        link.href = qrCode
        link.download = `table-${tableNumber}-qr.png`
        link.click()
    }

    // Delete table
    const deleteTable = async (tableId) => {
        if (!isLoaded || !isSignedIn) {
            toast.error("Please sign in to delete tables");
            return;
        }

        if (window.confirm("Are you sure you want to delete this table?")) {
            try {
                const token = await getToken({ template: "default" });
                
                if (!token) {
                    toast.error("Authentication failed. Please login again.");
                    return;
                }

                const response = await axios.post(url + "/api/table/delete", { 
                    tableId 
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.data.success) {
                    toast.success("Table deleted successfully")
                    fetchTables()
                }
            } catch (error) {
                console.error("Error deleting table:", error);
                if (error.response?.status === 401) {
                    toast.error("Unauthorized. Please login again.");
                } else if (error.response?.status === 403) {
                    toast.error("Access denied. Admin privileges required.");
                } else {
                    toast.error(error.response?.data?.message || "Failed to delete table");
                }
            }
        }
    }

    // Toggle table status
    const toggleTableStatus = async (tableId, currentStatus) => {
        if (!isLoaded || !isSignedIn) {
            toast.error("Please sign in to update table status");
            return;
        }

        try {
            const token = await getToken({ template: "default" });
            
            if (!token) {
                toast.error("Authentication failed. Please login again.");
                return;
            }

            const response = await axios.post(url + "/api/table/update-status", { 
                tableId,
                isActive: !currentStatus
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data.success) {
                toast.success("Table status updated")
                fetchTables()
            }
        } catch (error) {
            console.error("Error updating status:", error);
            if (error.response?.status === 401) {
                toast.error("Unauthorized. Please login again.");
            } else if (error.response?.status === 403) {
                toast.error("Access denied. Admin privileges required.");
            } else {
                toast.error(error.response?.data?.message || "Failed to update status");
            }
        }
    }

    // Print QR code
    const printQR = (qrCode, tableNumber) => {
        const printWindow = window.open('', '', 'height=600,width=800')
        printWindow.document.write('<html><head><title>Table ' + tableNumber + ' QR Code</title>')
        printWindow.document.write('<style>')
        printWindow.document.write('body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: Arial; }')
        printWindow.document.write('h1 { margin: 20px 0; }')
        printWindow.document.write('img { max-width: 400px; border: 2px solid #000; padding: 20px; }')
        printWindow.document.write('p { font-size: 18px; margin-top: 20px; }')
        printWindow.document.write('</style></head><body>')
        printWindow.document.write('<h1>Table ' + tableNumber + '</h1>')
        printWindow.document.write('<img src="' + qrCode + '" />')
        printWindow.document.write('<p>Scan to Order</p>')
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 250)
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <div className='qr-generator add'>
            <div className="qr-header">
                <h2>🔲 QR Code Generator</h2>
                <p>Generate QR codes for restaurant tables</p>
            </div>

            <form className="qr-form" onSubmit={handleGenerate}>
                <div className="form-group">
                    <label>Table Number</label>
                    <input
                        type="text"
                        placeholder="Enter table number (e.g., T1, A5, 12)"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="generate-btn" disabled={loading}>
                    {loading ? "Generating..." : "🎯 Generate QR Code"}
                </button>
            </form>

            <div className="tables-section">
                <h3>📋 Generated QR Codes ({tables.length})</h3>
                
                {tables.length === 0 ? (
                    <div className="empty-state">
                        <p>No QR codes generated yet</p>
                        <p>Create your first table QR code above</p>
                    </div>
                ) : (
                    <div className="tables-grid">
                        {tables.map((table, index) => (
                            <div key={index} className={`table-card ${!table.isActive ? 'inactive' : ''}`}>
                                <div className="table-header">
                                    <h4>Table {table.tableNumber}</h4>
                                    <span className={`status-badge ${table.isActive ? 'active' : 'inactive'}`}>
                                        {table.isActive ? '✓ Active' : '✗ Inactive'}
                                    </span>
                                </div>
                                
                                <div className="qr-preview">
                                    <img src={table.qrCode} alt={`Table ${table.tableNumber} QR`} />
                                    <p className="scan-text">Scan to Order</p>
                                </div>

                                <div className="table-actions">
                                    <button 
                                        onClick={() => downloadQR(table.qrCode, table.tableNumber)}
                                        className="action-btn download"
                                    >
                                        ⬇ Download
                                    </button>
                                    <button 
                                        onClick={() => printQR(table.qrCode, table.tableNumber)}
                                        className="action-btn print"
                                    >
                                        🖨 Print
                                    </button>
                                    <button 
                                        onClick={() => toggleTableStatus(table._id, table.isActive)}
                                        className={`action-btn toggle ${table.isActive ? 'deactivate' : 'activate'}`}
                                    >
                                        {table.isActive ? '⏸ Disable' : '▶ Enable'}
                                    </button>
                                    <button 
                                        onClick={() => deleteTable(table._id)}
                                        className="action-btn delete"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default QRGenerator