import { CardType } from '../../libs/const';
import { OfferCardPrew } from '../../libs/types/types';
import OfferCard from '../offer-card-main/offer-card';
import clsx from 'clsx';

type OfferListProps = {
  offers: OfferCardPrew[];
  onListItemHover: (listItemID: string | null) => void;
  offerCardType: CardType;
}

function OfferList({offers, onListItemHover, offerCardType}: OfferListProps) {

  return (
    <div className={clsx(`${offerCardType}__places-list places__list`, offerCardType === CardType.CitiesCard && 'tabs__content')}>
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onListItemHover={onListItemHover} offerCardType={offerCardType} />)}
    </div>
  );
}

export default OfferList;
