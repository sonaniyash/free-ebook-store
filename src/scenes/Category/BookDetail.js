import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, PermissionsAndroid} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Button from '../../components/Button';
import {styles} from '../../assets/style/styles';
import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from 'react-native-fetch-blob'
import {
  S3_Bucket_Book_Img,
  S3_Bucket_Book_PDF,
  GOOGLE_ADMOB,
} from '../../utility/constant';
import {
  InterstitialAd,
  BannerAd,
  BannerAdSize,
} from '@react-native-firebase/admob';
import {Toast} from '../../components/Toast';
import Images from '../../components/Images';

const inter = InterstitialAd.createForAdRequest(GOOGLE_ADMOB.Interstitial, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['book', 'fashion', 'clothing'],
});

const interDownload = InterstitialAd.createForAdRequest(
  GOOGLE_ADMOB.Interstitial,
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['book', 'fashion', 'clothing'],
  },
);

function BookDetail(props) {
  const [visible, setVisible] = useState(false);
  const [imgLink, setImgLink] = useState(false);

  useEffect(() => {
    let ImgLink = '';
    if (props.route.params.item && props.route.params.item.image_url) {
      ImgLink = `${props.route.params.item.host_img}${
        props.route.params.item.image_url
      }`;
      setImgLink(ImgLink);
    }
    inter.load();
    interDownload.load();
  }, []);

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

  const downloadBook = async () => {
    setVisible(true);
    await analytics().logEvent('download', {
      book: props.route.params.item,
      language: props.route.params.item.languages.toLowerCase(),
    });
    interDownload.load();
    interDownload
      .show()
      .then(() => {})
      .catch(() => {});

    setTimeout(() => {
      requestExternalStorageSavePermission().then(permission => {
        let download_Path = '';
        if (
          props.route &&
          props.route.params &&
          props.route.params.item &&
          props.route.params.item.languages
        ) {
          download_Path = `${props.route.params.item.host}${
            props.route.params.item.s3_url
          }`;
        }
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
            .fetch('GET', download_Path, {})
            .then(res => {
              console.log('The file successfully saved to ', res.path());
            });
        }
      });
    }, 3000);
  };

  const pdfBookReader = async () => {
    let download_Path = '';
    if (
      props.route &&
      props.route.params &&
      props.route.params.item &&
      props.route.params.item.languages
    ) {
      await analytics().logEvent('read', {
        book: props.route.params.item,
        language: props.route.params.item.languages.toLowerCase(),
      });
      download_Path = `${props.route.params.item.host}${
        props.route.params.item.s3_url
      }`;
    }
    inter.load();
    inter
      .show()
      .then(() => {})
      .catch(() => {});
    setVisible(true);
    props.navigation.navigate('BookPdfView', {url: download_Path});
  };

  return (
    <View style={{flex: 1}}>
      <Toast
        visible={visible}
        message="Please wait few seconds your file is on loading."
      />
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
          <Images
            source={[
              {
                uri: imgLink,
              },
              {uri: `${S3_Bucket_Book_Img}no-image.png`},
            ]}
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
            style={{
              fontSize: 16,
              fontFamily: 'Ubuntu-Bold',
              color: '#4267B2',
              marginBottom: 10,
            }}>
            Book Name - {props.route.params.item.name}
          </Text>
          <BannerAd
            unitId={GOOGLE_ADMOB.Banner}
            size={BannerAdSize.FULL_BANNER}
          />
          <Text
            style={{fontSize: 16, fontFamily: 'Ubuntu-Regular', marginTop: 5}}>
            Category - {props.route.params.item.Cat_Name}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Authors - {props.route.params.item.authors || 'N/A'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Pages - {props.route.params.item.pages || 'N/A'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Languages - {props.route.params.item.languages || 'English'}
          </Text>
          <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Regular'}}>
            Published Date - {props.route.params.item.published || 'N/A'}
          </Text>
          <Text
            style={{fontSize: 16, fontFamily: 'Ubuntu-Regular', marginTop: 10}}>
            Description - {props.route.params.item.description || 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default BookDetail;
