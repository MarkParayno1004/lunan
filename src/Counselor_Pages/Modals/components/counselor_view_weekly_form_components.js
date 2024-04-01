import * as React from "react";

export default function CounselorViewWeeklyForm() {
  const [activeTab, setActiveTab] = React.useState("Submitted");
  function getTabContent(activeTab) {
    if (activeTab === "Submitted") {
      return <>Submitted</>;
    } else if (activeTab === "Verified") {
      return <>verified</>;
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <div>
      <h4 className="pb-2">View Weekly Forms</h4>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-styled-tab"
        >
          <li className="me-2">
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "Submitted" ? "bg-orange-200" : ""
              }`}
              id="profile-styled-tab"
              onClick={() => handleTabClick("Submitted")}
              type="button"
              role="tab"
              aria-controls="Submitted"
              aria-selected={activeTab === "Submitted"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Submitted Weekly Forms
            </button>
          </li>
          <li className="me-2">
            <button
              className={`tab-button inline-block p-3 border-b-2 rounded-t-lg ${
                activeTab === "Verified" ? "bg-orange-200" : ""
              }`}
              id="dashboard-styled-tab"
              onClick={() => handleTabClick("Verified")}
              type="button"
              role="tab"
              aria-controls="Verified"
              aria-selected={activeTab === "Verified"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline-block mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
              <span>Verified Weekly Forms</span>
            </button>
          </li>
        </ul>
      </div>
      <div>{getTabContent(activeTab)}</div>
    </div>
  );
}
