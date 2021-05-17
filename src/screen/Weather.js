import axios from 'axios';
import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/Feather';

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      latitude: 0.0,
      longitude: 0.0,
      city: '',
      appid: 'e1acc455560fc83cf03bd4f0d0bec768',
    };
  }

  componentDidMount() {
    this.Location();
    this.getSearchData();
  }

  Location = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(response => {
        // console.log('Lokasi' + JSON.stringify(response));
        this.setState({
          latitude: response.latitude,
          longitude: response.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  getData = () => {
    axios
      .get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
          lat: this.state.latitude,
          lon: this.state.longitude,
          appid: this.state.appid,
        },
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data,
          icon:
            'http://openweathermap.org/img/w/' +
            response.data.daily[0].weather[0].icon +
            '.png',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSearchData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: this.state.city,
          appid: this.state.appid,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    // console.log(this.state.city);
    return (
      <View style={{alignItems: 'center', flex: 1, marginTop: 10}}>
        <Icon name="cloud" style={{fontSize: 40}} />
        <Text style={{fontSize: 15}}> Bogor, Cloudy </Text>
        <TextInput
          style={{
            textAlign: 'center',
            backgroundColor: '#7fffd4',
            borderRadius: 30,
            width: '99%',
            height: 45,
            marginBottom: 20,
            marginTop: 20,
          }}
          placeholder="Masukan Nama Kota"
          onChangeText={data => this.setState({city: data})}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            width: 60,
            height: 30,
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => this.getSearchData()}>
          <Text style={{color: 'white', marginTop: 4}}>Cari</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Weather;
