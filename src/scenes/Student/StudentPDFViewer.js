import React, { useState } from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import PDFView from 'react-native-view-pdf';
import Loader from '../../components/Loader';

function StudentPDFViewer(props) {
  const [loading, setLoading] = useState(true);
  return (
    <View style={{flex: 1}}>
        <Loader 
          loading={loading}
        />
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={props.route.params.url}
          resourceType='url'
          onLoad={() => setLoading(false)}
          onError={(error) => console.log('Cannot render PDF', error)}
          urlPr
        />
    </View>
  );
}

export default StudentPDFViewer;
