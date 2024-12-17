import FavouritesPage from '../pages/favorites-page/favorites-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import {Routes, Route} from 'react-router-dom';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import OfferPage from '../pages/offer-page/offer-page';
import { AppRoutes, AuthorisationStatus } from '../libs/const';
import PrivateRoute from '../components/private-route/private-route';
import Layout from '../layout/Layout';
import { OfferCardPrew } from '@/libs/types/types';

type AppOffersProps = {
  offers: OfferCardPrew[];
}

function App({offers}: AppOffersProps) {
  const placesToStay = offers.length;
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<Layout />} >
        <Route index element={<MainPage offers={offers} placesToStay={placesToStay} />} />
        <Route path={AppRoutes.Favourites} element={
          <PrivateRoute authorisationStatus={AuthorisationStatus.Auth}><FavouritesPage /></PrivateRoute>
        }
        />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
      </Route>
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route path={AppRoutes.Error} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
