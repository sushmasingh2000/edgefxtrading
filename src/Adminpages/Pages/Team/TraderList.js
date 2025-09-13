import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from 'react-query';
import CustomToPagination from '../../../Shared/Pagination';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../Shared/CustomTable';
import { Switch } from '@mui/material';

const TraderList = () => {
    const [page, setPage] = useState(1)
    const client = useQueryClient();
    const initialValues = {
        income_Type: "",
        search: '',
        pageSize: 10,
        start_date: '',
        end_date: '',
    };

    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

    })
    const { data, isLoading } = useQuery(
        ['get_user_trader', fk.values.search, fk.values.start_date, fk.values.end_date, page],
        () =>
            apiConnectorPost(endpoint?.trader_list_details, {
                search: fk.values.search,
                start_date: fk.values.start_date,
                end_date: fk.values.end_date,
                pageNumber: page,
                pageSize: "10",
            }),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onError: (err) => console.error("Error fetching level data:", err),
        }
    );

    const allData = data?.data?.result || [];


    const VerificationStatusChange = async (userId, newStatus, statusType = "verification") => {
        try {
            const response = await apiConnectorPost(endpoint.change_verification, {
                u_id: userId,
                verification_status: newStatus,
                status_type: statusType,
            });

            if (response?.data?.success) {
                client.invalidateQueries(["get_user_trader"]);
                toast.success("Status updated successfully.");
            } else {
                toast.error("Failed to update status.");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            toast.error("Something went wrong.");
        }
    };


    const tablehead = [
        <span>S.No.</span>,
        <span>Name</span>,
        <span>Email</span>,
        <span>Amount</span>,
        <span>Server Name</span>,
        // <span>Account No .</span>,
        <span>Currency</span>,
        // <span>Broker Id</span>,
        <span>Broker Name</span>,
        <span>Group Type</span>,
        <span>Password</span>,
        <span>Verification Status</span>,
        <span>Verification Date</span>,
        <span> Account Status</span>,

    ];

    const tablerow = allData?.data?.map((row, index) => {
        return [
            <span> {index + 1}</span>,
            <span>{row.td_trad_name || "--"}</span>,
            <span>{row.td_trad_email || "--"}</span>,
            <span>{row.td_wallet_amount || "--"}</span>,
            <span>{row.td_server_name || "--"}</span>,
            // <span>{row.td_account_number || "--"}</span>,
            <span>{row.td_base_currency || "--"}</span>,
            // <span>{row?.td_broker_id || "--"}</span>,
            <span>{row.td_broker_name || "--"}</span>,
            <span>{row.td_group_type || "--"}</span>,
            <span>{row?.td_password || "--"}</span>,
            <span>
                <select
                    value={
                        row?.td_verification_status === "Pending"
                            ? "1"
                            : row?.td_verification_status === "Virified"
                                ? "3"
                                : row?.td_verification_status === "Reject"
                                    ? "2"
                                    : ""
                    }
                    onChange={(e) => VerificationStatusChange(row?.td_jnr_id
                        , e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    <option value="1">Pending</option>
                    <option value="3">Verified</option>
                    <option value="2">Reject</option>
                </select></span>,
            <span>{row.td_verification_date ? moment?.utc(row.td_verification_date).format("DD-MM-YYYY") : "--"}</span>,
            <span>
                <Switch
                    checked={row?.td_account_status === "Active"}
                    onChange={() =>
                        VerificationStatusChange(
                            row?.td_jnr_id,
                            row?.td_account_status === "Active" ? "2" : "1", 
                            "account_status"
                        )
                    }
                    color="primary"
                />

            </span>,

        ];
    });

    return (
        <div className="p-2">
            <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
                <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
                    <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={fk.values.start_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={fk.values.end_date}
                        onChange={fk.handleChange}
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={fk.values.search}
                        onChange={fk.handleChange}
                        placeholder="User ID"
                        className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <button
                        onClick={() => {
                            setPage(1);
                            client.invalidateQueries(["get_user_trader"]);
                        }}
                        type="submit"
                        className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
                    >
                        Search
                    </button>
                    <button
                        onClick={() => {
                            fk.handleReset();
                            setPage(1);
                        }}
                        className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />

            <CustomToPagination
                page={page}
                setPage={setPage}
                data={allData}
            />

        </div>
    );
};

export default TraderList;
