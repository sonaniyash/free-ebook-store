import React, { useState } from 'react';
import {View, Text, Image, ScrollView, PermissionsAndroid} from 'react-native';
import Button from '../../components/Button';
import {styles} from '../../assets/style/styles';
import RNFetchBlob from 'rn-fetch-blob';
import {
  S3_Bucket_Book_Img,
  S3_Bucket_Book_PDF,
  GOOGLE_ADMOB,
} from '../../utility/constant';
import {AdMobInterstitial} from 'react-native-admob';
import {Toast} from '../../components/Toast';

function BookDetail(props) {
  const[visible, setVisible] = useState(false);
  // {props.route.params.item.name}
  const requestExternalStorageSavePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Your application Storage Permission',
        message: 'Required message',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const downloadBook = () => {
    setVisible(true);
    AdMobInterstitial.setAdUnitID(GOOGLE_ADMOB.Interstitial);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    setTimeout(() => {
      requestExternalStorageSavePermission().then(permission => {
        if (permission) {
          RNFetchBlob.config({
            addAndroidDownloads: {
              useDownloadManager: true, // this is the required parameter
              notification: true,
              title: props.route.params.item.s3_url,
              mediaScannable: true,
              fileCache: true,
              description: 'File E-Books Store.',
            },
          })
            .fetch(
              'GET',
              `${S3_Bucket_Book_PDF}${props.route.params.item.s3_url}`,
              {},
            )
            .then(res => {
              console.log('The file successfully saved to ', res.path());
            });
        }
      });
    }, 3000);
  };

  const pdfBookReader = () => {
    AdMobInterstitial.setAdUnitID(GOOGLE_ADMOB.Interstitial);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    const url = `${S3_Bucket_Book_PDF}${props.route.params.item.s3_url}`;
    props.navigation.navigate('BookPdfView', {url: url});
  };

  return (
    <View style={{flex: 1}}>
      <Toast visible={visible} message="Please wait few seconds your file is on downloading." />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#4267B2',
            height: 40,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              lineHeight: 40,
              fontSize: 16,
              fontFamily: 'Ubuntu-Bold',
              color: 'white',
              paddingLeft: 10,
            }}>
            Book Information
          </Text>
        </View>
        <View
          style={{
            height: 300,
            width: '50%',
            alignSelf: 'center',
            marginTop: 5,
          }}>
          <Image
            source={{
              uri: `${S3_Bucket_Book_Img}${props.route.params.item.image_url}`,
            }}
            style={{
              height: '100%',
              width: '100%',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 0.5,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            label="Download"
            buttonStyle={{
              ...styles.button,
              backgroundColor: '#4267B2',
              color: 'white',
            }}
            style={{marginTop: 10, width: '50%'}}
            onPress={downloadBook}
          />
          <Button
            label="Read"
            buttonStyle={{
              ...styles.button,
              backgroundColor: '#4267B2',
              color: 'white',
            }}
            style={{marginTop: 10, width: '50%'}}
            onPress={pdfBookReader}
          />
        </View>
        <View style={{margin: 10}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#4267B2'}}>
            Book Name - {props.route.params.item.name}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Category - {props.route.params.item.Cat_Name}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Authors - {props.route.params.item.authors || '#'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Pages - {props.route.params.item.pages || '#'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Languages - {props.route.params.item.languages || 'English'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Published Date - {props.route.params.item.published || '#'}
          </Text>
          <Text
            style={{fontSize: 16, fontFamily: 'Ubuntu-Bold', marginTop: 10}}>
            Description -
          </Text>
          <Text
            style={{fontSize: 14, fontFamily: 'Ubuntu-Regular', marginTop: 5}}>
            {props.route.params.item.description || '-'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default BookDetail;
