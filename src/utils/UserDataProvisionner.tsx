import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text } from 'react-native';
import { UserContext, User } from '../contexts/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../../App';
import { createApolloClient } from './ApolloClient';

const GET_USER = gql`
  query User {
    user {
      name
      ical
      nonce
      school {
        idschool
        name
      }
      favorites {
        idrestaurant
        url
        name
      }
    }
  }
`;

export default function UserDataProvisionner(): JSX.Element {
  const { user, setUser } = React.useContext(UserContext);

  const navigation = useNavigation<AppStackParamList>();
  const route = useRoute();

  const client = createApolloClient(route.params.token);

  console.log('route', route.params);

  if (user.name == '') {
    client.query({ query: GET_USER }).then(data => {
      if (data) {
        setUser({
          refreshToken: route.params.refreshToken,
          token: route.params.token,
          ical: data.user.ical,
          name: data.user.name,
          nonce: data.user.nonce,
          school: data.user.school,
          favorites: data.user.favorites,
          mail: route.params.mail,
          avatar: route.params.avatar,
          logged: true,
          refreshingToken: false,
        });
      }
    }).catch(err => {
      console.log(err);
      return <Text>Erreur</Text>
    });
  }

  navigation.navigate('UserSpace');

  return <></>;
}
