import { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaCheck,
  FaCoins,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaNetworkWired,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUserAlt,
  FaUserCog,
  FaUserFriends,
  FaWallet,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/favicon.png";
import { apiConnectorGet } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (title, hasSubItems, path) => {
    if (hasSubItems) {
      setActiveMenu(title);
      setActiveSubMenu((prev) => (prev === title ? "" : title));
    } else {
      setActiveMenu(title);
      setActiveSubMenu("");
      setShowSidebar(false);
      if (path) navigate(path);
    }
  };

  const handleSubItemClick = (menuTitle, subItem) => {
    setActiveMenu(`${menuTitle} > ${subItem.title}`);
    setShowSidebar(false);
    if (subItem.path) navigate(subItem.path);
  };

  const menuItems = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { title: "Profile Settings", icon: <FaUserCog />, path: "/profile" },
    {
      title: "Associate Reg",
      icon: <FaCheck />,
      path: "/associate_registration",
    },
    {
      title: "Trade Account Details",
      icon: <FaCheck />,
      path: "/trading_registration",
    },
    { title: "Invester History", icon: <FaUserAlt />, path: "/investor" },

    {
      title: "Income",
      icon: <FaCoins />,
      subItems: [
        { title: "Level Income", path: "/income/level" },
        { title: "Salary Income", path: "/income/direct" },
        { title: "Reward Income", path: "/income/roi" },
      ],
    },

    // { title: "Activation", icon: <FaCheck />, path: "/activation" },
    {
      title: "Network",
      icon: <FaNetworkWired />,
      subItems: [
        { title: "Direct Team", path: "/referral" },
        { title: "Downline", path: "/downline" },
        { title: "Network Tree", path: "/team" },
      ],
    },

    // { title: "Wallet", icon: <FaWallet />, path: "/wallet" },
    //  {
    //     title: "Fund",
    //     icon: <FaMoneyBillWave />,
    //     subItems: [
    //         { title: "Fund Request", path: "/fund" },
    //         { title: "Transfer", path: "/fund-tranfer" }
    //     ],
    // },

    { title: "Invester Amount", icon: <FaWallet />, path: "/fund-tranfer" },
    { title: "Withdrawal", icon: <FaExchangeAlt />, path: "/withdrawal" },
    {
      title: "Withdrawal History ",
      icon: <FaUserAlt />,
      path: "/payout_details",
    },
    {
      title: "Business Plan",
      icon: <FaUserAlt />,
      path: "/edgefx_uk_-4.pdf", // PDF path from public folder
      external: true,
      download: false, // true if you want to auto-download
    },
    {
      title: "Support",
      icon: <FaNetworkWired />,
      subItems: [
        // { title: "Ticket", path: "/add_ticket" },
        { title: "Ticket", path: "/chat_ticket" },
        // { title: "Inbox", path: "/add_ticket" },
      ],
    },

    // { title: "Support", icon: <FaHeadset />, path: "/dashboard" },
    {
      title: "Logout",
      icon: <FaSignOutAlt />,
      onClick: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  const { data: profile } = useQuery(
    ["get_profile"],
    () => apiConnectorGet(endpoint?.member_profile_detail),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const user_profile = profile?.data?.result || 0;

  return (
    <>
      {/* Mobile Top Header */}
      <div className="block lg:hidden">
        <div className=" bg-[#0d1a2d] text-white px-4 py-3 flex justify-between items-center shadow">
          <button className="text-2xl" onClick={() => setShowSidebar(true)}>
            ☰
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-2 font-medium">
            <FaUserFriends />
            <span>{user_profile?.Associate_Name}</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-[#0d1a2d] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
          <div className="flex items-center space-x-2 text-xl font-bold">
            <span className="bg-gold-color text-black px-2 py-1 font-bold">
              Buy
            </span>
            <span>Buy Bot</span>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Desktop Sidebar Header */}
        <div className="hidden lg:flex text-xl font-bold p-4 border-b border-gray-700 items-center justify-center space-x-2">
          <img src={logo} alt="" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 space-y-1 text-sm overflow-y-auto example">
          {menuItems.map((item, i) => {
            const isMenuActive =
              activeMenu === item.title ||
              activeMenu.startsWith(`${item.title} >`);
            const isSubOpen = activeSubMenu === item.title;

            return (
              <div key={i} className="border-b border-gray-700 pb-1 mb-1">
                {item.external ? (
                  // For external links like PDF
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={item.download}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition font-medium ${
                      isMenuActive
                        ? "bg-gold-color text-black"
                        : "hover:bg-gray-800 text-white"
                    }`}
                  >
                    <div className="flex gap-2 items-center space-x-2 pl-3">
                      <span
                        className={`text-lg ${
                          isMenuActive ? "text-black" : "text-color"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                    </div>
                  </a>
                ) : (
                  // For internal links
                  <div
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        handleMenuClick(item.title, !!item.subItems, item.path);
                      }
                    }}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition font-medium ${
                      isMenuActive
                        ? "bg-gold-color text-black"
                        : "hover:bg-gray-800 text-white"
                    }`}
                  >
                    <div className="flex gap-2 items-center space-x-2 pl-3">
                      <span
                        className={`text-lg ${
                          isMenuActive ? "text-black" : "text-color"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    {item.subItems &&
                      (isSubOpen ? <FaAngleDown /> : <FaAngleRight />)}
                  </div>
                )}

                {/* Submenu */}
                {item.subItems && isSubOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((sub, index) => {
                      const isSubActive =
                        activeMenu === `${item.title} > ${sub.title}`;
                      return (
                        <div
                          key={index}
                          onClick={() => handleSubItemClick(item.title, sub)}
                          className={`px-3 py-1 rounded cursor-pointer transition ${
                            isSubActive
                              ? "bg-gold-color text-white"
                              : "hover:bg-gray-700 text-white"
                          }`}
                        >
                          {sub.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
