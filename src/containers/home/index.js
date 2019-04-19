import React,{Component} from 'react';
import {View,Platform,NativeModules,TouchableOpacity,AsyncStorage,FlatList,RefreshControl,Image} from 'react-native';
import styles from './styles';
import { Button, TextInput, LoadingModal, AppText, Header } from '../../components';
import { TEXTS, COLORS } from '../../common';
const { RNTwitterSignIn } = NativeModules;
import Snackbar from 'react-native-snackbar';

const Constants = {
  TWITTER_COMSUMER_KEY: "LztWdqnGPwXtvnhT3NBlIgI7l",
  TWITTER_CONSUMER_SECRET: "CMaiEDJbREQylnjPjGUFauumJsXc2NO5gBdPr7mB95DK0jwIZ2"
}

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          user_id: "",
          loading: false,
          tweets: [],
          refreshing: false,
        }
    }

    componentDidMount(){
      AsyncStorage.getItem('user_id')
        .then(user_id => {
          if(user_id){
            this.setState({user_id: user_id});
            this.getTweets(user_id)
          } else {
            this._twitterSignIn()
          }
        })
    }

    _twitterSignIn = () => {
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
      RNTwitterSignIn.logIn()
        .then(loginData => {
          const { authToken, authTokenSecret } = loginData
          if (authToken && authTokenSecret) {
            const user_id = loginData.userID
            AsyncStorage.setItem('user_id',user_id)
            this.setState({user_id: user_id});
            this.getTweets(user_id)
          }
        })
        .catch(error => {
          this.setState({
             loading:false,
          });
        }
      )
    }

    getTweets = (user_id) => {
      this.setState({
          loading:true
      });
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
      RNTwitterSignIn.api({
          endpoint: 'statuses/user_timeline.json',
          user_id
        })
      .then(tweets=>{
        console.log(tweets);
        this.setState({
           loading: false,
           tweets: tweets
        });
      })
      .catch(error=>{
        this.setState({
           loading:false
        });
        Snackbar.show({
          title: error.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
    }

    _onRefresh() {
         this.setState({refreshing: true});
         if(this.state.user_id != ""){
           this.getTweets(this.state.user_id)
         } else {
           this._twitterSignIn()
         }
         setTimeout(function () {
           this.setState({ refreshing: false });
         }.bind(this), 1000);
     };

    _renderItem = ({item}) => (
      <View style={styles.itemView}>
        <View style={styles.listItem}>
          <Image
            style={{width: 50, height: 50, borderRadius: 25}}
            source={{uri: Platform.OS === 'ios' ? item.retweeted_status.user.profile_image_url: item.post_profile_image_url}}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <AppText style={{color: 'black', fontWeight: 'bold', fontSize: 17, }}>{Platform.OS === 'ios' ? item.entities.user_mentions[0].name: item.name}</AppText>
            <AppText style={{color: 'gray', fontSize: 14, marginBottom: 10}}>@{Platform.OS === 'ios' ? item.entities.user_mentions[0].screen_name: item.screen_name}</AppText>
            <AppText style={[{textAlign: item.lang == "ar"? 'right': 'left'}]}>{Platform.OS === 'ios' ? item.retweeted_status.text: item.text}</AppText>
          </View>
        </View>
      </View>
    );

    _keyExtractor = (item, index) => item.id+"";

    render(){
      if(this.state.tweets.length > 0){
        AsyncStorage.setItem('userImage',Platform.OS === 'ios' ? this.state.tweets[0].user.profile_image_url: this.state.tweets[0].user_profile_image_url)
      }
        return(
          <View style={[styles.container]}>
            <Header menu={true} search={false} back={false} navigation={this.props.navigation} title={TEXTS.home} date=' '/>
            <View style={styles.listView}>
              <FlatList
                data={this.state.tweets}
                refreshControl={
                  <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                  />
                }
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                extraData={this.state.tweets}
              />
            </View>
            <LoadingModal visible={this.state.loading} />
          </View>
        );
    }
}

export default Home;
