import React from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import moment from "moment";

const InvestorProfile = () => {
  const { data, isLoading } = useQuery(
    ["inve_data"],
    () => apiConnectorGet(endpoint?.trader_profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    }
  );

  const trader = data?.data?.result?.[0];

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!trader) return <div className="text-white">No data found.</div>;

  return (
    <div className="bg-gray-900 rounded-xl text-gray-100 p-6 mt-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Invester Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-2 text-lg font-semibold text-white">Personal Info</div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Name:</span>
              <span>{trader?.td_trad_name || "--"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Email:</span>
              <span>{trader?.td_trad_email || "--"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Mobile:</span>
              <span>{trader?.lgn_mobile || "--"}</span>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-2 text-lg font-semibold text-white">Account Info</div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Account ID:</span>
              <span>{trader?.td_account_id || "--"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Wallet Amount:</span>
              <span>{trader?.td_wallet_amount || "--"} {trader?.td_base_currency}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Broker Name:</span>
              <span>{trader?.td_broker_name || "--"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Server:</span>
              <span>{trader?.td_server_name || "--"}</span>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-2 text-lg font-semibold text-white">Verification & Status</div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Verification Status:</span>
              <span className={`${trader?.td_verification_status === "Approved" ? "text-green-400" : "text-yellow-400"}`}>
                {trader?.td_verification_status || "--"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-700">
              <span>Account Status:</span>
              <span className={`${trader?.td_account_status === "Active" ? "text-green-400" : "text-red-400"}`}>
                {trader?.td_account_status || "--"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Joiner Date:</span>
              <span>{moment(trader?.td_created_at).format("DD-MM-YYYY")}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
