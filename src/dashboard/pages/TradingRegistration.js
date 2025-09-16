import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import moment from "moment";


const TradingRegistration = () => {
  const [loding, setLoading] = useState(false);
  const client = useQueryClient();

  const { data, isLoading: trade_loading } = useQuery(
    ["trading_data"],
    () => apiConnectorGet(endpoint?.trader_profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false
    }
  );
  const trader_data = data?.data?.result?.[0] || [];

  const initialValue = {
    trad_name: trader_data?.td_trad_name || "",
    trad_email: trader_data?.td_trad_email || "",
    account_id: trader_data?.td_account_id || "",
    account_number: trader_data?.td_account_number || "",
    u_password: trader_data?.td_password || "",
    wallet_amount: trader_data?.td_wallet_amount || "",
    broker_id: trader_data?.td_broker_id || "",
    broker_name: trader_data?.td_broker_name || "",
    regulatory_region: "",
    server_name: trader_data?.td_server_name || "",
    account_type: "",
    base_currency:
      trader_data?.td_base_currency === "USD"
        ? "1"
        : trader_data?.td_base_currency === "USC"
          ? "2"
          : "",
    group_type:
      trader_data?.td_group_type === "Cent Group"
        ? "1"
        : trader_data?.td_group_type === "USD Group"
          ? "2"
          : trader_data?.td_group_type === "PAMM Group"
            ? "3" : "-",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,

    onSubmit: () => {
      const reqbody = {
        trad_name: fk.values.trad_name,
        trad_email: fk.values.trad_email,
        account_id: fk.values.account_id,
        account_number: "1",
        account_type: "1",
        u_password: fk.values.u_password,
        wallet_amount: fk.values.wallet_amount,
        base_currency: fk.values.base_currency,
        broker_id: "1",
        broker_name: fk.values.broker_name,
        server_name:fk.values.server_name,
        regulatory_region: "",
        group_type: fk.values.group_type,
      };
      RegistrationFn(reqbody);
    },
  });
  const RegistrationFn = async (reqbody) => {
    setLoading(true);
    try {
      const response = await apiConnectorPost(endpoint?.trader_registration_api, reqbody);
      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.success) {
        fk.handleReset();
        client.refetchQueries("trading_data")
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loding || trade_loading} />
      <div className=" flex items-center justify-center px-4 py-5">
        <div className="w-full  bg-gray-900  shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-10 text-center text-white">Invester Reg</h2>

          <form className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            {[
              { id: "trad_name", label: "Invester Name" },
              { id: "trad_email", label: "Invester Email" },
              { id: "account_id", label: "Account ID (MT4 / MT5)" },
              { id: "wallet_amount", label: "Wallet Amount", type: "number" },
              { id: "broker_name", label: "Broker Name" },
              { id: "server_name", label: "Server Name" },
            ].map(({ id, label, type = "text" }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  placeholder={label}
                  value={fk.values[id]}
                  onChange={fk.handleChange}
                  className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            ))}

            {/* Currency Select */}
            <div>
              <label htmlFor="base_currency" className="block text-sm font-medium text-white mb-1">
                Currency
              </label>
              <select
                id="base_currency"
                name="base_currency"
                value={fk.values.base_currency}
                onChange={fk.handleChange}
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="">Select Currency</option>
                <option value="1">USD</option>
                <option value="2">USC</option>
              </select>
            </div>

            {/* Group Type Select */}
            <div>
              <label htmlFor="group_type" className="block text-sm font-medium text-white mb-1">
                Group Type
              </label>
              <select
                id="group_type"
                name="group_type"
                value={fk.values.group_type}
                onChange={fk.handleChange}
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="">Select Group Type</option>
                <option value="1">CENT</option>
                <option value="2">USD</option>
                <option value="3">PAMM</option>
              </select>
            </div>

            {/* Password Field - Keep it Last */}
            <div>
              <label htmlFor="u_password" className="block text-sm font-medium text-white mb-1">
                User Password
              </label>
              <input
                type="password"
                id="u_password"
                name="u_password"
                placeholder="User Password"
                value={fk.values.u_password}
                onChange={fk.handleChange}
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </form>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" p-2 px-10 lg:mt-10 mt-5 bg-gold-color text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              onClick={fk.handleSubmit} >
              {loding ? "Processing..." : trader_data?.td_trad_name ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
        <div className="bg-gray-900 rounded text-gray-100 p-6 mt-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">Invester History</h2>
      
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
      
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="mb-2 text-lg font-semibold text-white">Personal Info</div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Name:</span>
                    <span>{trader_data?.td_trad_name || "--"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Email:</span>
                    <span>{trader_data?.td_trad_email || "--"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Mobile:</span>
                    <span>{trader_data?.lgn_mobile || "--"}</span>
                  </div>
                </div>
      
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="mb-2 text-lg font-semibold text-white">Account Info</div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Account ID:</span>
                    <span>{trader_data?.td_account_id || "--"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Wallet Amount:</span>
                    <span>{trader_data?.td_wallet_amount || "--"} {trader_data?.td_base_currency}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Broker Name:</span>
                    <span>{trader_data?.td_broker_name || "--"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Server:</span>
                    <span>{trader_data?.td_server_name || "--"}</span>
                  </div>
                </div>
      
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="mb-2 text-lg font-semibold text-white">Verification & Status</div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Verification Status:</span>
                    <span className={`${trader_data?.td_verification_status === "Approved" ? "text-green-400" : "text-yellow-400"}`}>
                      {trader_data?.td_verification_status || "--"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-700">
                    <span>Account Status:</span>
                    <span className={`${trader_data?.td_account_status === "Active" ? "text-green-400" : "text-red-400"}`}>
                      {trader_data?.td_account_status || "--"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Joiner Date:</span>
                    <span>{moment(trader_data?.td_created_at).format("DD-MM-YYYY")}</span>
                  </div>
                </div>
      
              </div>
            </div>
          </div>
    </>
  );
};

export default TradingRegistration;
