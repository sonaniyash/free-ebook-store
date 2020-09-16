import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {getSearchBooks} from '../../services/book-store.service';
import {S3_Bucket_Book_Img, GOOGLE_ADMOB} from '../../utility/constant';
import Loader from '../../components/Loader';
import {AdMobBanner} from 'react-native-admob';

function BookList(props) {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [searching, setSearching] = useState(true);
  const [search, setSearch] = useState('');
  const [cat_id, setCatID] = useState(0);
  const [isLoadBtn, setIsLoadBtn] = useState(false);

  useEffect(() => {
    getBookData();
    setOffset(1);
  }, [props.route.params.cat_id, props.route.params.search]);

  const getBookData = async () => {
    let offsets = offset;
    if (
      search !== props.route.params.search ||
      cat_id !== props.route.params.cat_id
    ) {
      offsets = 1;
      setResult([]);
    }
    setIsLoading(true);
    const req = {};
    req.cat_id = props.route.params.cat_id;
    req.search = props.route.params.search;
    req.offset = offsets;
    setCatID(props.route.params.cat_id);
    setSearch(props.route.params.search);
    const res = await getSearchBooks(req);
    if (res.status === 200 && res.result && res.result.length !== 0) {
      result.push(...res.result);
      setResult(result);
      if (res.result.length === 20) {
        setOffset(offsets + 1);
        setIsLoadBtn(true);
      } else {
        setIsLoadBtn(false);
      }
    } else {
      if (offsets === 1) {
        setResult([]);
      }
    }
    setSearching(false);
    setIsLoading(false);
  };

  const ListComponent = props => {
    return (
      <TouchableWithoutFeedback onPress={() => props.onPress(props.item)}>
        <View
          style={{
            borderWidth: 1.4,
            borderColor: '#4267B2',
            margin: 5,
            borderRadius: 4,
          }}>
          <View
            style={{
              padding: 10,
              width: '100%',
              alignContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Image
              source={{uri: `${S3_Bucket_Book_Img}${props.item.image_url}`}}
              style={{width: '30%', height: 150}}
            />
            <View style={{flexDirection: 'column', width: '70%', padding: 10}}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  alignItems: 'stretch',
                  color: '#4267B2',
                }}>
                {props.item.name}
              </Text>
              <Text style={{fontFamily: 'Ubuntu-Regular', marginTop: 5}}>
                Authors - {props.item.authors}
              </Text>
              <Text style={{fontFamily: 'Ubuntu-Regular', marginTop: 5}}>
                Description - {props.item.short_description}
              </Text>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  marginTop: 5,
                  color: 'grey',
                }}>
                Click here - Download & Read
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // const onRefresh = () => {
  //   getBookData();
  // };

  const onPress = item => {
    props.navigation.navigate('Book', {item: item});
  };

  const loadMoreRecords = () => {
    getBookData();
  };

  const loadMoreData = () => {
    return (
      <>
        {result && result.length !== 0 && isLoadBtn && (
          <TouchableOpacity onPress={loadMoreRecords}>
            <View style={{alignSelf: 'center', marginTop: 5, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Regular',
                  borderColor: 'grey',
                  borderWidth: 0.8,
                  padding: 10,
                  borderRadius: 4,
                }}>
                Load More
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <Loader loading={isLoading} />
      {result && result.length !== 0 && (
        <ScrollView>
          <FlatList
            data={result}
            style={{fontFamily: 'Ubuntu-Regular'}}
            renderItem={({item, index}) => (
              <ListComponent item={item} index={index} onPress={onPress} />
            )}
            keyExtractor={item => item}
            refreshing={isLoading}
            // onRefresh={onRefresh}
            ListFooterComponent={loadMoreData}
          />
        </ScrollView>
      )}
      {result && result.length === 0 && !searching && offset === 1 && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontFamily: 'Ubuntu-Bold', marginTop: 10}}>
            No Books Found.
          </Text>
        </View>
      )}
      {result && result.length === 0 && searching && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontFamily: 'Ubuntu-Bold', marginTop: 10}}>
            Loading...
          </Text>
        </View>
      )}
      <AdMobBanner
        adSize="smartBannerPortrait"
        adUnitID={GOOGLE_ADMOB.Banner}
        onAdFailedToLoad={error => console.error(error)}
      />
    </React.Fragment>
  );
}

export default BookList;
