export interface StarRatingProps {
    totalStars?: number;
    initialRating?: number;
    onRate?: (rating: number) => void;
  }