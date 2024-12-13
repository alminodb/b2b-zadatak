import React from "react"
import 'devextreme/dist/css/dx.light.css';
import MainView from "./views/MainView";
import SidebarView from "./views/SidebarView";

const App: React.FC = () => {
    return (
        <div className="flex">
            <MainView />
            <SidebarView />
        </div>
    )
}

export default App
