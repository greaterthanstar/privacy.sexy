import { getEnumNames, getEnumValues } from '@/application/Common/Enum';

export enum RecommendationLevel {
    Standard = 0,
    Strict = 1,
}

// TODO: Get rid of those, use Enum
export const RecommendationLevelNames = getEnumNames(RecommendationLevel);
export const RecommendationLevels = getEnumValues(RecommendationLevel);
