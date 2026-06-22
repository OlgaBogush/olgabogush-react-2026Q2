// import './index.css';

// import { FC, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router';

// import { Main } from './pages/Main';
// import { Header } from './pages/Header';
// import { Footer } from './pages/Footer';
// import { NotFoundPage } from './pages/NotFoundPage';
// import { About } from './components/About';
// import { SingleCard } from './components/SingleCard';
// import { useAppSelector } from './store/hooks';
// import { Favourites } from './components/Favourites';
// import { ThemeContext } from './context/ThemeContext';
// import { selectFavouritesList } from './features/favourites/favouritesSlice';

// const App: FC = () => {
//   const favourites = useAppSelector(selectFavouritesList);
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkTheme((prev) => !prev);
//   };

//   return (
//     <>
//       <BrowserRouter>
//         <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
//           <div
//             className={`flex flex-col gap-6 p-6  items-center justify-center ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${favourites.length ? 'pb-48' : ''} `}
//           >
//             <Header />
//             <Routes>
//               <Route path="/" element={<Main />}>
//                 <Route path=":id" element={<SingleCard />} />
//               </Route>
//               <Route path="/about" element={<About />} />
//               <Route path="/error" element={<NotFoundPage />} />
//               <Route path="*" element={<NotFoundPage />} />
//             </Routes>
//             <Footer />
//             <Favourites favourites={favourites} />
//           </div>
//         </ThemeContext.Provider>
//       </BrowserRouter>
//     </>
//   );
// };
// export default App;
