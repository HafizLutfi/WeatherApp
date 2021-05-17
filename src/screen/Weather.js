import axios from 'axios';
import React, {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/Feather';
import API_Key from '../API_Key';

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      latitude: 0.0,
      longitude: 0.0,
    };
  }

  componentDidMount() {
    this.getData();
    this.Location();
  }

  Location() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log(location);
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  getData() {
    axios
      .get('https://api.openweathermap.org/data/2.5/onecall', {
        params: {
          lat: this.state.latitude,
          lon: this.state.longitude,
          appid: API_Key,
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
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.latitude);
    // console.log(this.state.longitude);
    return (
      <View style={{alignItems: 'center', flex: 1, marginTop: 10}}>
        <Icon name="cloud" style={{fontSize: 40}} />
        <Text style={{fontSize: 15}}> Bogor, Cloudy </Text>
        <TextInput
          style={{
            textAlign: 'center',
            backgroundColor: '#7fffd4',
            borderRadius: 30, //menbentuk oval
            width: '99%',
            height: 45,
            marginBottom: 20,
            marginTop: 20,
          }}
          placeholder="Masukan Nama Kota"
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            width: 60,
            height: 30,
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white', marginTop: 4}}>Cari</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Weather;
