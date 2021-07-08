import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Share} from 'react-native';

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      result: [],
      isLoading: false,
      offset: 1,
      isLoadBtn: false,
    });
  }

  loadMoreRecords = type => {
    this.props.navigation.navigate('BookList', {
      search: '',
      cat_id: 0,
      lang: type,
    });
  };

  share = async () => {
    try {
      Share.share({
        message: `More than 1,00,000 books available to read in this application.  \n\nhttps://play.google.com/store/apps/details?id=com.free.ebook.store`,
      })
        .then(result => console.log(result))
        .catch(errorMsg => console.log(errorMsg));
    } catch (error) {}
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: '#4267B2',
            paddingTop: 8,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Ubuntu-Bold',
              textAlign: 'center',
              fontSize: 16,
              paddingBottom: 8,
            }}>
            LANGUAGES
          </Text>
        </View>
        <View style={{padding: 10}}>
          <TouchableOpacity onPress={() => this.loadMoreRecords('English')}>
            <View
              style={{
                borderColor: '#4267B2',
                borderWidth: 1.5,
                padding: 40,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 32,
                  fontFamily: 'Ubuntu-Bold',
                  color: '#4267B2',
                }}>
                ENGLISH BOOKS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.loadMoreRecords('Hindi')}>
            <View
              style={{
                borderColor: '#4267B2',
                borderWidth: 1.5,
                padding: 40,
                borderRadius: 6,
                marginTop: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 32,
                  fontFamily: 'Ubuntu-Bold',
                  color: '#4267B2',
                }}>
                HINDI BOOKS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.loadMoreRecords('Gujarati')}>
            <View
              style={{
                borderColor: '#4267B2',
                borderWidth: 1.5,
                padding: 40,
                borderRadius: 6,
                marginTop: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 32,
                  fontFamily: 'Ubuntu-Bold',
                  color: '#4267B2',
                }}>
                GUJARATI BOOKS
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{fontFamily: 'Ubuntu-Bold', textAlign: 'center', top: 10}}>
            Marathi & Tamil books will be available very soon..
          </Text>
          <TouchableOpacity onPress={() => this.share()}>
            <View
              style={{
                borderColor: '#F17922',
                borderWidth: 2,
                padding: 15,
                borderRadius: 6,
                marginTop: 80,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontFamily: 'Ubuntu-Regular',
                  color: '#F17922',
                }}>
                Share application to your friends.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Language;
