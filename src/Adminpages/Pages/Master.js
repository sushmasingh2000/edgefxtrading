import React, { useEffect, useState } from 'react';
import { apiConnectorGet, apiConnectorPost } from '../../utils/APIConnector';
import { endpoint } from '../../utils/APIRoutes';
import toast from 'react-hot-toast';
import { Switch } from '@mui/material';
import { useQuery } from 'react-query';

const Master = () => {
    const [status1, setStatus1] = useState(null); // Will hold "Active" or "Inactive"

    // Fetch master config data (GET)
    const { data, isLoading, refetch } = useQuery(
        ['master_data'],
        () => apiConnectorGet(endpoint.master_data),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

    // Extract the result
    const result = data?.data?.result?.[0]; // Assuming first config is Payout

    // Set initial status when API data is loaded
    useEffect(() => {
        if (result?.config_status) {
            setStatus1(result.config_status); // "Active" or "Inactive"
        }
    }, [result]);

    // Toggle status handler
    const changestatus = async () => {
        const newStatus = status1 === 'Active' ? 'Inactive' : 'Active';

        try {
            const response = await apiConnectorPost(endpoint.change_general_status, {
                u_id: result?.config_id, // assuming u_id = config_id
                status_type: 'payout',
                new_status: newStatus,
            });

            if (response?.data?.success) {
                toast.success('Payout status updated successfully.');
                setStatus1(newStatus);
            } else {
                toast.error('Failed to update payout status.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className="p-4">

            <table className="w-full table-auto text-center border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="border px-4 py-2">S.No.</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">{result?.config_id}</td>
                        <td className="border px-4 py-2">{result?.config_title}</td>
                        <td className="border px-4 py-2">
                            {status1 !== null && (
                                <Switch
                                    checked={status1 === 'Active'}
                                    onChange={changestatus}
                                    color="primary"
                                />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Master;
