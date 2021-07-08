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
// import {S3_Bucket_Book_Img, GOOGLE_ADMOB} from '../../utility/constant';
import Loader from '../../components/Loader';

function BookList(props) {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [searching, setSearching] = useState(true);
  const [search, setSearch] = useState('');
  const [cat_id, setCatID] = useState(0);
  const [lang, setLang] = useState('');
  const [isLoadBtn, setIsLoadBtn] = useState(false);

  useEffect(() => {
    getBookData();
    setOffset(1);
  }, [
    props.route.params.cat_id,
    props.route.params.search,
    props.route.params.lang,
  ]);

  const getBookData = async () => {
    let offsets = offset;
    if (
      search !== props.route.params.search ||
      cat_id !== props.route.params.cat_id ||
      lang !== props.route.params.lang
    ) {
      offsets = 1;
      setResult([]);
      setLang('');
    }
    setIsLoading(true);
    const req = {};
    req.cat_id = props.route.params.cat_id;
    req.search = props.route.params.search;
    req.language = props.route.params.lang;
    req.offset = offsets;
    setCatID(props.route.params.cat_id);
    setSearch(props.route.params.search);
    setLang(props.route.params.lang);
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
    let ImgLink = '';
    if (props.item && props.item.image_url) {
      ImgLink = `${props.item.host_img}${props.item.image_url}`;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => props.onPress(props.item)}
        key={props.item.id}>
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
            {props.item && props.item.languages.toLowerCase() !== 'hindi' && (
              <Image
                source={{uri: ImgLink}}
                style={{width: '30%', height: 150}}
              />
            )}
            <View style={{flexDirection: 'column', width: props.item.languages.toLowerCase() !== 'hindi' ? '70%': '100%', padding: 10}}>
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
      <View style={{backgroundColor: '#4267B2', paddingTop: 8}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Ubuntu-Bold',
            paddingBottom: 8,
            color: 'white',
            textAlign: 'center',
          }}>
          BOOKS
        </Text>
      </View>
      {result && result.length !== 0 && (
        <ScrollView>
          {console.log(result)}
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
    </React.Fragment>
  );
}

export default BookList;
