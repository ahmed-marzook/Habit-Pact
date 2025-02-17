import "./DashboardLayout.css";
import MainSideBar from "../../Sidebar/MainSidebar/MainSideBar";
import { Outlet } from "react-router-dom";

type Props = {};

export default function DashboardLayout({}: Props) {
  return (
    <div className="layout">
      <aside className="layout__main-sidebar">
        <MainSideBar />
      </aside>
      <main className="layout__main-content">
        <Outlet />
      </main>
    </div>
  );
}
