import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../../Shared/CustomTable';
import CustomToPagination from '../../../Shared/Pagination';
import { useFormik } from 'formik';
import moment from 'moment';

const Downline = () => {
    const [page, setPage] = useState(1)
    const initialValues = {
        level_id: "1",
        search: '',
        pageSize: 10,
        start_date: '',
        end_date: '',
    };

    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,

    })
    const { data } = useQuery(
        ['data-downline', fk.values.search, fk.values.start_date, fk.values.end_date, fk.values.level_id, page],
        () => apiConnectorPost(endpoint.network_downline_api, {
            search: fk.values.search,
            level_id: fk.values.level_id,
            start_date: fk.values.start_date,
            end_date: fk.values.end_date,
            pageNumber: page,
            pageSize: "10",
        }),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    const allData = data?.data?.result || [];
    // const checked = allData?.data?.filter((i) => i?.Level_id !== 0 && allData)

    const tablehead = [
        <span>S.No.</span>,
        <span>Login Id</span>,
        <span>Email</span>,
        <span>Mobile No.</span>,
        <span>User Name</span>,
        <span>Amount </span>,
        <span>Group Type</span>,
        <span>Status</span>,
        <span> Date</span>,


    ];
    const tablerow = allData?.map((row, index) => {
        return [
            <span> {index + 1}</span>,
            <span>{row.lgn_cust_id}</span>,
            <span> {row.lgn_email}</span>,
            <span>{row.lgn_mobile}</span>,
            <span>{row.jnr_name || '--'}</span>,
            <span> {row.td_wallet_amount || '--'}</span>,
            <span>{row.td_group_type}</span>,
            <span>{row.td_verification_status}</span>,
            <span>{row.td_created_at ? moment(row.td_created_at)?.format("DD-MM-YYYY") : "--"}</span>,
        ];
    });
    return (
        <div className="p-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">Downline</h2>

                <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
                    {/* <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={fk.values.start_date}
                        onChange={fk.handleChange}
                        className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={fk.values.end_date}
                        onChange={fk.handleChange}
                        className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={fk.values.search}
                        onChange={fk.handleChange}
                        placeholder="User ID"
                        className="bg-gray-700 border border-gray-600 rounded-full py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
                    /> */}
                    <select
                        name="level_id"
                        id="level_id"
                        value={fk.values.level_id}
                        onChange={fk.handleChange}
                        className="bg-gray-700 border w-full  border-gray-600  py-2 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto text-sm"
                    >
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                        <option value="4">Level 4</option>
                        <option value="5">Level 5</option>
                        <option value="6">Level 6</option>
                        <option value="7">Level 7</option>
                        <option value="8">Level 8</option>
                        <option value="9">Level 9</option>
                        <option value="10">Level 10</option>
                    </select>

                    {/* <button
                        onClick={() => {
                            setPage(1);
                            client.invalidateQueries(["get_direct"]);
                        }}
                        type="submit"
                        className="bg-gold-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
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
                    </button> */}
                </div>
            </div>


            {/* Main Table Section */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700">
                <CustomTable
                    tablehead={tablehead}
                    tablerow={tablerow}
                />
                <CustomToPagination
                    page={page}
                    setPage={setPage}
                    data={allData}
                />
            </div>
        </div>
    );
};

export default Downline;
