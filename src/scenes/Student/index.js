import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Loader from '../../components/Loader';
import {getStudyMaterialCategory} from '../../services/book-store.service';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cat_list: [],
    };
  }

  componentDidMount() {
    this.getStudyMaterialCategory();
  }

  getStudyMaterialCategory = async () => {
    this.setState({
      loading: true,
    });
    const res = await getStudyMaterialCategory();
    if (res.status === 200) {
      this.setState({
        loading: false,
        cat_list: res.result,
      });
    }
  };

  searchSubCategory = id => {
    this.props.navigation.navigate('Subcategory', {
      cat_id: id,
    });
  };

  render() {
    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <Loader loading={this.state.loading} />
          <View style={{backgroundColor: '#4267B2', paddingTop: 8}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Ubuntu-Bold',
                paddingBottom: 8,
                color: 'white',
                textAlign: 'center',
              }}>
              STUDENT STUDY MATERIAL
            </Text>
          </View>
          {this.state.cat_list.map(item => (
            <View style={{height: 40, padding: 10, margin: 5}}>
              <TouchableHighlight
                onPress={() => this.searchSubCategory(item.id)}
                underlayColor="white">
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#4267B2',
                    borderStyle: 'solid',
                    padding: 10,
                    borderRadius: 10,
                  }}>
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
      </React.Fragment>
    );
  }
}

export default Student;
