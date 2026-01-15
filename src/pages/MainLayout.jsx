import { Outlet } from 'react-router-dom';
import CommentsPage from './CommentsPage';

const MainLayout = () => {
    return (
        <div>
            <CommentsPage />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;