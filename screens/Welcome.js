import {Platform, StyleSheet, Text, View, Share, TouchableOpacity, Image, StatusBar, TouchableHighlight} from 'react-native';

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const advert2 = firebase.admob().rewarded('ca-app-pub-7564761287983180/2945642632')
const advert = firebase.admob().interstitial('ca-app-pub-7564761287983180/1824132655')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Welcome extends Component {

  componentDidMount = () => {
    AdSettings.addTestDevice(AdSettings.currentDeviceHash);
    advert.loadAd(request.build());
    advert2.loadAd(request.build())
  
    advert2.on('onAdLoaded', () => {
       console.log('Advert2 ready to show.')
    })
    
    advert2.show()
  
  advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
  });
  
  setTimeout(() => {
  if (advert.isLoaded()) {
    console.log('working')
    advert.show();
  } else {
    console.log('error occured')
  }
  }, 1000);
   
  }
  static navigationOptions = {
    title: "Welcome"
  }

  share = () => {
    Share.share({
      message: 'Checkout Forever Living Products - https://play.google.com/store/apps/details?id=com.foreverproducts',
      url: 'https://play.google.com/store/apps/details?id=com.foreverproducts',
      title: 'Start Your Own Business'
    }, {
      // Android only:
      dialogTitle: 'Share the app',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }
  goToProducts = () => {
  //     InterstitialAdManager.showAd("665254733991193_665318663984800")
  // .then(didClick => {
  //   console.log('working')
  // })
  // .catch(error => {
  //   console.log(error, 'rror')
  // });
  
    this.props.navigation.navigate('ScreenOne' )
  }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>Home</Text>
                    <TouchableOpacity style={styles.toolbarButton} onPress={() => this.share()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/share.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                {/* <BannerView
            placementId={"665254733991193_665876810595652"}
            type="large"
            onPress={() => console.log('click')}
            onError={err => console.log('myyyyerror', err)}
          /> */}
 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Welcome Mesage</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Hello , Here is an application that can help you in knowing about forever living products, their c.c points and business plan. So, To get started, click on the button below</Text>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={() => this.goToProducts()}>
            <Text style={styles.fullWidthButtonText}>Let's get started</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you have any query related to forever living products, you can call me +919646407363</Text>
                    </View>

                </View>
                <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:20}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-7564761287983180/8389541008"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
  </View>
            </View>
            
    );
  }
};
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#e74c3c',
        paddingTop:20,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20                //Step 3
    },
    mainContainer:{
      flex:1                  //Step 1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1                //Step 2
  },
  messageBox:{
    alignItems : 'center'
  },
  messageBoxBodyText:{
    margin:10,
    fontSize:18
  },
  messageBoxBodyText2:{
    margin:10,
    fontSize:18,
    fontWeight : 'bold'
  },
  topText:{
    fontSize:25,
    marginTop : 10,
    fontWeight : 'bold'
  },
  topText2:{
    fontSize:20,
    marginTop : 10,
    marginLeft:10
  },
  inputsContainer: {
    flex: 1,
    alignItems : 'center'
  },
  fullWidthButton: {
    backgroundColor: '#e74c3c',
    height:50,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white'
  },
  footer:{
    position:'absolute',
    bottom : 10,
    width : '100%'
  }
  });