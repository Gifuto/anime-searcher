import { Routes, Route, Navigate } from "react-router-dom"

import { Main, Anime, Favorites } from "../../screens";

export const App = () => {
    
    return (
        <div>
            <Routes>
                <Route path="/anime-searcher/" element={<Main />} />
                <Route path="/anime-searcher/anime/:id" element={<Anime />} />
                <Route path="/anime-searcher/favorite/" element={<Favorites />}/>
                <Route path="*" element={<Navigate to="/anime-searcher/" replace/>} />
            </Routes>
        </div>
    );
};
