import React from 'react';
import {View, Text, ScrollView} from 'react-native';

function Info(props) {
  return (
    <ScrollView>
      <View
        style={{backgroundColor: '#4267B2', paddingTop: 10, paddingBottom: 10}}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Ubuntu-Regular',
            textAlign: 'center',
            fontSize: 18,
          }}>
          !nformation
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontFamily: 'Ubuntu-Regular', fontSize: 15}}>
          If you want to need any kind of book pdf then mail to
          sonaniyash008@gmail.com
        </Text>
        <Text
          style={{fontFamily: 'Ubuntu-Regular', fontSize: 15, marginTop: 8}}>
          Very soon Free PDF book application provide more than 100000+ books.
        </Text>
        <Text style={{fontFamily: 'Ubuntu-Bold', fontSize: 15, marginTop: 15}}>
          How many category books available in application ?
        </Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Biography`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Childs & Youth( Cartoon, Comic, Learning )`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Environment`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Fiction & Literature`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Politics & Laws`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Lifestyle`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Science & Research( Physics, Math, Chemistry, Biology, Astronomy & Space, Archaeology )`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Personal Growth( Relationship, Psychology, Self Improvement, Motivation )`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Religion`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Health & Fitness( Medical, Fitness & Diet, Food & Nutrition)`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Business & Career( Marketing, Finance, Career, Time Management, Leadership, Economic )`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Art( Photography, Painting & Drawing, Craft & Hobbies, Architecture, Graphic Design, Music, Fashion & Beauty )`}</Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Regular',
            fontSize: 14,
            marginTop: 4,
          }}>{`\u2022 Academic & Education( Engineering, Medical Field, Geography )`}</Text>
      </View>
    </ScrollView>
  );
}

export default Info;
