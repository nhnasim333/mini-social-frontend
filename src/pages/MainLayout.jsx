import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <div>This is navbar</div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;