import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableHighlight} from 'react-native';
import TextBox from '../../components/TextBox';
import _ from 'lodash';
import {getHomePageBooks} from '../../services/book-store.service';
import {S3_Bucket_Book_Img, GOOGLE_ADMOB} from '../../utility/constant';
import Loader from '../../components/Loader';
import Images from '../../components/Images';
import {
  BannerAd,
  BannerAdSize,
} from '@react-native-firebase/admob';

function Home(props) {
  const [search, setSearch] = useState('');
  const [latestBook, setLatestBook] = useState([]);
  const [featuredBook, setFeaturedBook] = useState([]);
  const [topDownloadBook, setTopDownloadBook] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchBook = () => {
    props.navigation.navigate('BookList', {search: search, cat_id: 0});
  };

  useEffect(() => {
    getHomePageList();
  }, []);

  const getHomePageList = async () => {
    setLoading(true);
    const res = await getHomePageBooks();
    if (res.status === 200) {
      let latestRes = _.map(res.result, function(o) {
        if (o.Cat_Name == 'latest') return o;
      });
      latestRes = _.without(latestRes, undefined);
      setLatestBook(latestRes);

      let topDownloadRes = _.map(res.result, function(o) {
        if (o.Cat_Name == 'downloads') return o;
      });
      topDownloadRes = _.without(topDownloadRes, undefined);
      setTopDownloadBook(topDownloadRes);

      let featuredRes = _.map(res.result, function(o) {
        if (o.Cat_Name == 'featured') return o;
      });
      featuredRes = _.without(featuredRes, undefined);
      setFeaturedBook(featuredRes);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <View style={{flex: 1}}>
        <Loader loading={loading} />
        <View style={{backgroundColor: '#4267B2', paddingTop: 10}}>
          <TextBox
            placeholder="Search Book, Authors etc."
            autoFocus={false}
            onSubmitEditing={searchBook}
            value={search}
            onChange={e => setSearch(e)}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Ubuntu-Bold',
              padding: 5,
              color: 'white',
              textAlign: 'center',
            }}>
            FREE E-BOOKS STORE
          </Text>
        </View>
        {!loading && (
          <ScrollView>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Ubuntu-Bold',
                padding: 5,
                color: '#4267B2',
                marginTop: 10,
              }}>
              Top Download Book
            </Text>
            <ScrollView horizontal={true} style={{height: 210}}>
              {topDownloadBook.map(item => (
                <TouchableHighlight
                  onPress={() =>
                    props.navigation.navigate('Book', {item: item})
                  }
                  underlayColor="white">
                  <View style={{width: 100, height: 150, margin: 10}}>
                    <Images
                      source={[
                        {uri: `${item.host_img}${item.image_url}`},
                        {uri: `${S3_Bucket_Book_Img}no-image.png`},
                      ]}
                      style={{height: '100%', width: '100%'}}
                    />
                    <Text style={{fontFamily: 'Ubuntu-Regular'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
            <View>
              <BannerAd
                unitId={GOOGLE_ADMOB.Banner}
                size={BannerAdSize.FULL_BANNER}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Ubuntu-Bold',
                  padding: 5,
                  color: '#4267B2',
                  width: '50%',
                }}>
                Latest Book
              </Text>
            </View>
            <ScrollView horizontal={true} style={{height: 210}}>
              {latestBook.map(item => (
                <TouchableHighlight
                  onPress={() =>
                    props.navigation.navigate('Book', {item: item})
                  }
                  underlayColor="white">
                  <View style={{width: 100, height: 150, margin: 10}}>
                    <Images
                      source={[
                        {uri: `${item.host_img}${item.image_url}`},
                        {uri: `${S3_Bucket_Book_Img}no-image.png`},
                      ]}
                      style={{height: '100%', width: '100%'}}
                    />
                    <Text style={{fontFamily: 'Ubuntu-Regular'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Ubuntu-Bold',
                padding: 5,
                color: '#4267B2',
                marginTop: 10,
              }}>
              Featured Book
            </Text>
            <ScrollView horizontal={true} style={{height: 210}}>
              {featuredBook.map(item => (
                <TouchableHighlight
                  onPress={() =>
                    props.navigation.navigate('Book', {item: item})
                  }
                  underlayColor="white">
                  <View style={{width: 100, height: 150, margin: 10}}>
                    <Images
                      source={[
                        {uri: `${item.host_img}${item.image_url}`},
                        {uri: `${S3_Bucket_Book_Img}no-image.png`},
                      ]}
                      style={{height: '100%', width: '100%'}}
                    />
                    <Text style={{fontFamily: 'Ubuntu-Regular'}}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </ScrollView>
        )}
      </View>
      {}
    </React.Fragment>
  );
}

export default Home;
