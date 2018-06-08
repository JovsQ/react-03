/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Greeting extends Component {
  render() {
    return (
      <Text style={styles.bigblue}>Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    setInterval(() => {
      this.setState(previousState => {
        return {
          isShowingText: !previousState.isShowingText
        };
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    )
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    )
  }
}

type Props = {};
export default class App extends Component<Props> {

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: '100%', backgroundColor: 'powderblue'}}>
          <Greeting name='Rexxar' style={styles.bigblue} />
          <ScrollMePlease />
        </View>
        <View style={{flex: 2, width: '100%', backgroundColor: 'skyblue'}}>
          <Blink text='Jaina' />
          <PizzaTranslator />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FlatListBasics style={{flex: 1}}/>
            <SectionListBasics style={{flex: 1}}/>
            <FetchExample style={{flex: 1}}/>
          </View>
          
        </View>
        <View style={{flex: 3, width: '100%', backgroundColor: 'steelblue'}}>
          <ScrollView style={{flex: 1, width: '100%'}}>
            <Image source={pic} style={styles.picture} />
            <Touchables title="OK!"/>
          </ScrollView>
        </View>
      </View>
    );
  }
}

class Touchables extends Component {
  _onPressButton() {
    Alert.alert('You taped the button!')
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

  render() {
    return (
      <View style={customButtonStyle.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
          <View style={customButtonStyle.button}>
            <Text style={customButtonStyle.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={customButtonStyle.button}>
            <Text style={customButtonStyle.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={customButtonStyle.button}>
            <Text style={customButtonStyle.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
            onPress={this._onPressButton}
            >
          <View style={customButtonStyle.button}>
            <Text style={customButtonStyle.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={customButtonStyle.button}>
            <Text style={customButtonStyle.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class ScrollMePlease extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={{fontSize:96}}>Scroll me plz</Text>
        <Text style={{fontSize:96}}>If you like</Text>
        <Text style={{fontSize:96}}>Scrolling down</Text>
        <Text style={{fontSize:96}}>What's the best</Text>
        <Text style={{fontSize:96}}>Framework around?</Text>
        <Text style={{fontSize:80}}>React Native</Text>
      </ScrollView>
    );
  }
}

class FlatListBasics extends Component {
  render() {
    return (
      <View style={customFlatListStyle.container}>
        <FlatList 
        data={[
          {key: 'Devin'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={customFlatListStyle.item}>{item.key}</Text>}
        />
      </View>
    )
  }
}

class SectionListBasics extends Component {
  render() {
    return (
      <View style={sectionListStyle.container}>
        <SectionList 
        sections={[
          {title: 'D', data: ['Devin']},
          {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']}
        ]}
        renderItem={({item}) => <Text style={sectionListStyle.item}>{item}</Text>}
        renderSectionHeader={({section}) => <Text style={sectionListStyle.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

class FetchExample extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList 
        data={this.state.dataSource}
        renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
        keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const sectionListStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
})

const customFlatListStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const customButtonStyle = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picture: {
    width: 193,
    height: 110
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
