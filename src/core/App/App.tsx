import { Routes, Route, Navigate } from "react-router-dom"

import { Main, Anime, Favorites } from "../../screens";

export const App = () => {
    
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/anime/:id" element={<Anime />} />
                <Route path="/favorite/" element={<Favorites />}/>
                <Route path="*" element={<Navigate to="/" replace/>} />
            </Routes>
        </div>
    );
};
