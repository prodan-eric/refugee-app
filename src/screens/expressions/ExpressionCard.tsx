import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

import { FavoriteExpression } from './useFavoriteExpressions';
import { appStyles, textStyles } from '../../appStyles';
import { Language, TopicKey } from '../../types';

const ExpressionCard = ({
  language,
  expressionKey,
  nativeValue,
  foreignValue,
  isFavorite,
  toggleFavorite,
  playAudio,
  isPlaying,
  topic,
}: {
  language: Language;
  foreignValue: string;
  nativeValue: string;
  expressionKey: string;
  isFavorite: boolean;
  toggleFavorite: (
    language: Language,
    key: string,
    expression: FavoriteExpression,
  ) => void;
  isPlaying: boolean;
  playAudio: (expressionKey: string) => Promise<void>;
  topic: TopicKey;
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <Card
      key={expressionKey}
      style={{
        ...styles.card,
        backgroundColor: isPlaying
          ? appStyles.cardSelectedBackground
          : appStyles.cardBackground,
      }}
      elevation={0}
    >
      <Card.Content>
        <View style={styles.cardContent}>
          <View style={styles.cardRow}>
            <Text
              style={{ ...textStyles.titleMedium, ...styles.cardText }}
              variant="titleMedium"
            >
              {foreignValue}
            </Text>
            <View style={{ ...styles.iconWrapper, height: 28, width: 24 }}>
              <IconButton
                size={24}
                iconColor={
                  isPlaying ? appStyles.activeVolumeIcon : appStyles.muted
                }
                onPress={() => {
                  setTimeout(() => {
                    playAudio(expressionKey);
                  }, 100);
                }}
                icon="volume-high"
              />
            </View>
          </View>
          <View style={styles.cardRow}>
            <Text
              style={{
                ...styles.cardText,
                ...textStyles.bodyMedium,
                color: appStyles.muted,
              }}
              variant="titleMedium"
            >
              {nativeValue}
            </Text>
            <View
              style={{
                ...styles.iconWrapper,
                height: 24,
                width: 24,
              }}
            >
              <IconButton
                iconColor={
                  favorite ? appStyles.activeStarIcon : appStyles.mutedIcon
                }
                size={24}
                onPress={() => {
                  if (topic !== 'favorites') {
                    setTimeout(() => {
                      setFavorite((prev) => !prev);
                    }, 100);
                  }
                  toggleFavorite(language, expressionKey, {
                    nativeValue,
                    foreignValue,
                  });
                }}
                icon="star"
              />
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const MemoizedExpressionCard = memo(ExpressionCard, (prev, next) => {
  return prev.isPlaying === next.isPlaying;
});

const styles = StyleSheet.create({
  cardContent: {
    gap: 12,
    display: 'flex',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    shadowOpacity: 0,
  },
  cardText: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    verticalAlign: 'middle',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { ExpressionCard, MemoizedExpressionCard };