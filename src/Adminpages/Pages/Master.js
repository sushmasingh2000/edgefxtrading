import React, { useEffect, useState } from 'react';
import { apiConnectorGet, apiConnectorPost } from '../../utils/APIConnector';
import { endpoint } from '../../utils/APIRoutes';
import toast from 'react-hot-toast';
import { Switch, Button, TextField } from '@mui/material';
import { useQuery } from 'react-query';

const Master = () => {
    const [configData, setConfigData] = useState([]);

    const { data } = useQuery(
        ['master_data'],
        () => apiConnectorGet(endpoint.master_data),
        {
            onSuccess: (res) => {
                const fetchedData = res?.data?.result || [];
                setConfigData(fetchedData);
            },
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

    const handleStatusChange = async (index, type = 'payout') => {
        const config = configData[index];
        const currentStatus = config.config_status;
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        try {
            const response = await apiConnectorPost(endpoint.change_general_status, {
                u_id: config.config_id,
                status_type: type,
                new_status: newStatus,
            });

            if (response?.data?.success) {
                toast.success(`${config.config_title} status updated to ${newStatus}`);
                const updatedData = [...configData];
                updatedData[index].config_status = newStatus;
                setConfigData(updatedData);
            } else {
                toast.error(response?.data?.message || 'Failed to update status.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong.');
        }
    };

    const handleValueUpdate = async (index) => {
        const config = configData[index];
        let status_type = '';

        if (config.config_title === 'LEVEL_PERCENTAGE') {
            status_type = 'level_percentage';
        } else if (config.config_title === 'TOTAL_PROFIT') {
            status_type = 'total_profit';
        }

        try {
            const response = await apiConnectorPost(endpoint.change_general_status, {
                u_id: config.config_id,
                status_type,
                value: config.config_value,
            });

            if (response?.data?.success) {
                toast.success(`${config.config_title.replace('_', ' ')} updated successfully.`);
            } else {
                toast.error(response?.data?.message || 'Failed to update value.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong.');
        }
    };


    const handleInputChange = (index, value) => {
        const updatedData = [...configData];
        updatedData[index].config_value = value;
        setConfigData(updatedData);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Master Configurations</h2>
            <table className="w-full table-auto text-center border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-black">
                        <th className="border px-4 py-2">S.No.</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Status / Value</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {configData.map((config, index) => {
                        const title = config.config_title;

                        return (
                            <tr key={config.config_id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    {
                                        title === 'LEVEL_PERCENTAGE' ? "Level Percentage" :
                                            title === 'LEVEL_CLOSING' ? "Level Closing" :
                                                title === 'WITHDRAWAL' ? "Payout" :
                                                    title === 'TOTAL_PROFIT' ? "Total Profit" :
                                                        title
                                    }
                                </td>

                                <td className="border px-4 py-2">
                                    {title === 'LEVEL_PERCENTAGE' || title === 'TOTAL_PROFIT' ? (
                                        <TextField
                                            type="number"
                                            value={config.config_value || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            size="small"
                                            style={{ width: 100 }}
                                        />
                                    ) : (
                                        config.config_status
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {title === 'LEVEL_PERCENTAGE' || title === 'TOTAL_PROFIT' ? (
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleValueUpdate(index)}
                                        >
                                            Update
                                        </Button>
                                    ) : (
                                        <Switch
                                            checked={config.config_status === 'Active'}
                                            onChange={() =>
                                                handleStatusChange(
                                                    index,
                                                    title === 'LEVEL_CLOSING' ? 'level_closing' : 'payout'
                                                )
                                            }
                                            color="primary"
                                        />
                                    )}
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Master;
