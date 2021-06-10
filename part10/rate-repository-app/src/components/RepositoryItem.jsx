import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 10,
  },

  author: {
    flexDirection: 'row',
  },

  authorText: {
    marginLeft: 20,
    flex: 1,
  },

  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

const UserAvatar = ({ url }) => {
  const imageStyles = StyleSheet.create({
    image: {
      marginTop: 20,
      width: 50,
      height: 50,
      borderRadius: 10,
    },
  });
  return <Image source={{ uri: url }} style={imageStyles.image} />;
};

const UserInfo = ({ name, description, language }) => {
  const infoStyles = StyleSheet.create({
    info: {
      marginLeft: 20,
      flex: 1,
    },
  });
  return (
    <View style={infoStyles.info}>
      <Text
        fontWeight='bold'
        fontSize='subheading'
        style={styles.text}
        testID='fullName'
      >
        {name}
      </Text>
      <Text style={styles.text} color='textSecondary' testID='description'>
        {description}
      </Text>
      <LangTag lang={language} />
    </View>
  );
};

const LangTag = ({ lang }) => {
  const languageTagStyles = StyleSheet.create({
    container: {
      marginTop: 10,
      flexDirection: 'row',
    },
    languageTag: {
      backgroundColor: theme.colors.primary,
      padding: 6,
      borderRadius: 5,
      color: 'white',
      marginTop: 10,
    },
  });
  return (
    <View style={languageTagStyles.container}>
      <Text style={languageTagStyles.languageTag} testID='language'>
        {lang}
      </Text>
    </View>
  );
};

const DetailItem = ({ count, label, testID }) => {
  const detailItemStyles = StyleSheet.create({
    count: { display: 'flex', justifyContent: 'space-around' },
    label: { display: 'flex', justifyContent: 'space-around', marginTop: 6 },
  });

  let countCopy = count;
  if (count >= 1000) {
    countCopy = `${Number(Math.round(count / 1000 + 'e1') + 'e-1')}k`;
  }

  return (
    <View>
      <Text fontWeight='bold' style={detailItemStyles.count} testID={testID}>
        {countCopy}
      </Text>
      <Text style={detailItemStyles.label} color='textSecondary'>
        {label}
      </Text>
    </View>
  );
};

const Detail = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  const detailStyles = StyleSheet.create({
    detail: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 10,
    },
  });

  return (
    <View style={detailStyles.detail}>
      <DetailItem
        count={stargazersCount}
        label={'Stars'}
        testID='stargazersCount'
      />
      <DetailItem count={forksCount} label={'Forks'} testID='forksCount' />
      <DetailItem count={reviewCount} label={'Reviews'} testID='reviewCount' />
      <DetailItem
        count={ratingAverage}
        label={'Rating'}
        testID='ratingAverage'
      />
    </View>
  );
};

const RepositoryListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.author}>
        <UserAvatar url={item.ownerAvatarUrl} />
        <UserInfo
          name={item.fullName}
          description={item.description}
          language={item.language}
        />
      </View>
      <Detail
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryListItem;
