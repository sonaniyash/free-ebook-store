import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Loader from '../../components/Loader';
import {getStudyMaterialSubCategory} from '../../services/book-store.service';

class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sub_cat_list: [],
    };
  }

  componentDidMount() {
    this.getStudyMaterialSubCategory();
  }

  getStudyMaterialSubCategory = async () => {
    this.setState({
      loading: true,
    });
    const request = {
      cat_id:
        this.props &&
        this.props.route &&
        this.props.route.params &&
        this.props.route.params.cat_id,
    };
    await getStudyMaterialSubCategory(request)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            sub_cat_list: res.result,
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      });
  };

  searchBook = id => {
    this.props.navigation.navigate('StudyMaterialList', {
      sub_cat_id: id,
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
              COURSES / SUBJECTS BOOKS
            </Text>
          </View>
          {this.state.sub_cat_list.map(item => (
            <View style={{height: 40, padding: 10, margin: 5}}>
              <TouchableHighlight
                onPress={() => this.searchBook(item.id)}
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
                    {item.name}{` ( ${item.count} )`}
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

export default SubCategory;
