import "./Layout.css";
import Overview from "../../../../pages/Overview/Overview";
import MainSideBar from "../../Sidebar/MainSidebar/MainSideBar";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="layout">
      <aside className="layout__main-sidebar">
        <MainSideBar />
      </aside>
      <main className="layout__main-content">
        <Overview />
      </main>
    </div>
  );
}
