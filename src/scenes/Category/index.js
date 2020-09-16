import React from 'react';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {getCategoryList} from '../../services/book-store.service';
import Loader from '../../components/Loader';
import {
  AdMobBanner,
} from 'react-native-admob';
import { GOOGLE_ADMOB } from '../../utility/constant';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cat_list: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  searchBook = id => {
    this.props.navigation.navigate('BookList', {search: '', cat_id: id});
  };

  getCategory = async () => {
    this.setState({
      loading: true,
    });
    const res = await getCategoryList();
    if (res.status === 200) {
      this.setState({
        loading: false,
        cat_list: res.result,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View
            style={{
              // flexDirection: 'row',
              // flexWrap: 'wrap',
              marginTop: 5,
              marginBottom: 15,
            }}>
            {this.state.cat_list.map(item => (
              <View style={{height: 40, padding: 10, margin: 5}}>
                <TouchableHighlight
                  onPress={() => this.searchBook(item.id)}
                  underlayColor="white">
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#4267B2',
                      borderStyle: 'dotted',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    {/* <Image
                      source={{uri: `${S3_Bucket_Category}${item.icon}`}}
                      style={{width: '100%', height: '90%'}}
                    /> */}
                    <Text
                      style={{
                        fontFamily: 'Ubuntu-Bold',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        fontSize: 16,
                        color: '#4267B2',
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </ScrollView>
        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID={GOOGLE_ADMOB.Banner}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    );
  }
}

export default Category;
